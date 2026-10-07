// Cloudflare Worker: Riders Cafe API
// Keep this source private. Public clients receive only filtered results.

const ALLOWED_ORIGINS = new Set([
  "https://penta2026.github.io"
]);

const MAX_RESULTS = 50;
const MAX_RADIUS_KM = 150;

function json(body, status=200, origin=""){
  const headers = {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "public, max-age=300"
  };
  if (ALLOWED_ORIGINS.has(origin)) {
    headers["access-control-allow-origin"] = origin;
    headers["vary"] = "Origin";
  }
  return new Response(JSON.stringify(body), {status, headers});
}

function haversineKm(aLat,aLng,bLat,bLng){
  const R=6371;
  const dLat=(bLat-aLat)*Math.PI/180;
  const dLng=(bLng-aLng)*Math.PI/180;
  const s=Math.sin(dLat/2)**2+
    Math.cos(aLat*Math.PI/180)*Math.cos(bLat*Math.PI/180)*Math.sin(dLng/2)**2;
  return 2*R*Math.asin(Math.sqrt(s));
}

function publicCafe(x){
  return {
    id:x.id,
    kind:"ライダーズカフェ",
    prefecture:x.prefecture,
    municipality:x.municipality,
    name:x.name,
    nameJa:x.nameJa || null,
    address:x.address,
    lat:x.lat,
    lng:x.lng,
    navMode:x.navMode || "name",
    navQuery:x.navQuery || x.name,
    foodTypes:x.foodTypes || [],
    signatureMenu:x.signatureMenu || [],
    budget:x.budget || null,
    businessHours:x.businessHours || {},
    regularHolidays:x.regularHolidays || [],
    irregularHoliday:!!x.irregularHoliday,
    holidayNotice:x.holidayNotice || null,
    parking:x.parking || null,
    riderFacilities:x.riderFacilities || null,
    phone:x.phone || null,
    website:x.website || null,
    instagram:x.instagram || null,
    facebook:x.facebook || null,
    summary:x.summary || null,
    lastChecked:x.lastChecked || null
  };
}

// Initial private master.
// Replace with KV/D1 once shop count grows.
// Only publish records with publish === true.
const CAFE_MASTER = [];

export default {
  async fetch(request, env) {
    const origin=request.headers.get("Origin") || "";
    const url=new URL(request.url);

    if (request.method==="OPTIONS") {
      if (!ALLOWED_ORIGINS.has(origin)) return new Response(null,{status:403});
      return new Response(null,{
        status:204,
        headers:{
          "access-control-allow-origin":origin,
          "access-control-allow-methods":"GET, OPTIONS",
          "access-control-allow-headers":"content-type",
          "access-control-max-age":"86400"
        }
      });
    }

    if (request.method!=="GET") return json({error:"method_not_allowed"},405,origin);
    if (url.pathname!=="/api/riders-cafes" && url.pathname!=="/api/riders-cafes/") {
      return json({error:"not_found"},404,origin);
    }

    const active=CAFE_MASTER.filter(x=>x && x.publish===true && x.testOnly!==true);
    const id=url.searchParams.get("id");
    if (id) {
      const hit=active.find(x=>x.id===id);
      return hit ? json({count:1,items:[publicCafe(hit)]},200,origin)
                 : json({count:0,items:[]},200,origin);
    }

    let list=active;
    const prefecture=url.searchParams.get("prefecture");
    if (prefecture) list=list.filter(x=>x.prefecture===prefecture);

    const lat=Number(url.searchParams.get("lat"));
    const lng=Number(url.searchParams.get("lng"));
    const rawRadius=Number(url.searchParams.get("radiusKm"));
    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      const radius=Number.isFinite(rawRadius)
        ? Math.max(0.1,Math.min(MAX_RADIUS_KM,rawRadius))
        : 50;
      list=list
        .map(x=>({...x,_distanceKm:haversineKm(lat,lng,x.lat,x.lng)}))
        .filter(x=>x._distanceKm<=radius)
        .sort((a,b)=>a._distanceKm-b._distanceKm);
    }

    list=list.slice(0,MAX_RESULTS);
    return json({
      count:list.length,
      items:list.map(x=>({
        ...publicCafe(x),
        ...(Number.isFinite(x._distanceKm)?{distanceKm:+x._distanceKm.toFixed(2)}:{})
      }))
    },200,origin);
  }
};
