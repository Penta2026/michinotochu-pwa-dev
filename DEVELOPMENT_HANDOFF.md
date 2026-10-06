# 道の途中。 GitHub開発・本番リリース運用 引継ぎ

作成日: 2026-10-07

## 基本方針

開発版を直接更新 → ぺんたが実機確認 → OK後に本番へ反映。

ぺんたが毎回ZIPを手作業で差し替える運用には戻さない。GitHubへ接続できる場合はメイ側が直接更新する。

## リポジトリ

### 本番
- Repository: `penta2026/michinotochu-pwa`
- URL: https://penta2026.github.io/michinotochu-pwa/
- 用途: 一般利用者向け安定版
- ぺんたが「OK」「本番に反映して」と明示するまで原則変更しない。

### 開発・デバッグ
- Repository: `penta2026/michinotochu-pwa-dev`
- URL: https://penta2026.github.io/michinotochu-pwa-dev/
- 用途: 新機能、修正、UI変更、DB更新、PWA変更等の確認
- 通常の開発作業は基本こちらのみ更新する。

## 2026-10-07確認済み状態

- 本番: PWA Ver 1.5.15 / DB Ver 2.8.20
- dev: PWA Ver 1.5.16-dev1 / DB Ver 2.8.20
- dev公開、DEV表示、本番との分離をぺんた実機で確認済み。

## dev / 本番 分離

同じ `https://penta2026.github.io` 配下なのでlocalStorageとCache Storageは同一オリジン。必ず名前を分ける。

### 本番
- localStorage: `michino_db_version`
- DB Cache: `michino-db`
- Shell Cache: `michino-shell-...`

### dev
- localStorage: `michino_dev_db_version`
- DB Cache: `michino-dev-db`
- Shell Cache: `michino-dev-shell-...`

dev側では本番用キー・キャッシュ名へ戻さない。devの古いShell Cache削除対象も `michino-dev-shell-` のみ。

## dev版の識別

- 画面に「🧪 DEV / 開発確認版」
- manifestアプリ名「道の途中。DEV」
- バージョン例: `1.5.16-dev1` → `1.5.16-dev2`

## 開発フロー

1. ぺんたから変更内容を受ける。
2. `penta2026/michinotochu-pwa-dev` の最新mainを読む。
3. 古いZIPや過去チャットよりGitHub上の最新実ファイルを優先する。
4. devだけ直接更新する。本番には触らない。
5. 必要に応じdevバージョンを上げる。
6. dev公開URLでぺんたが実機確認。
7. 「OK」「確認できた」「本番に反映して」等の明示了承後に本番へ反映。

## 本番反映時に戻すもの

- 「🧪 DEV / 開発確認版」を削除
- 「道の途中。DEV」→「道の途中。」
- dev用localStorageキー → 本番用
- `michino-dev-db` → `michino-db`
- `michino-dev-shell-*` → `michino-shell-*`
- dev版番号 → 正式版番号

例: `1.5.16-dev3` → `1.5.16`

## 本番反映後の確認

- 本番URLが新バージョン
- DEV表示が残っていない
- dev URLは引き続き開発版
- 本番/devのキャッシュ・DB管理が混ざっていない
- 主要画面が開く
- PWAインストール状態に異常がない
- DBバージョン/データ数が想定通り

## 重要ルール

1. ぺんたがOKする前に本番へ入れない。
2. 通常作業はdevを直接更新。
3. 手作業ZIP差し替えを標準運用にしない。
4. 古い添付ZIPよりGitHub最新mainを優先。
5. 変更前に対象ファイルの最新内容を取得して編集。
6. 本番反映時はdev専用表示・キー・キャッシュ名を除去。
7. PWA / Service Worker変更時はキャッシュ更新忘れに注意。
8. 大きな変更は必ずdevで実機確認。

## チャット移動後の再開

ぺんたが
- 「道の途中。の続き。いつものdev運用で」
- 「dev更新して」
- 「これを道の途中。に実装して」

などと言った場合は、

`michinotochu-pwa-dev`取得 → dev直接実装 → ぺんた確認 → OK後に本番反映

で進める。

## 基本思想

本番は「使える場所」。
devは「壊してもいい場所」。

新しいことはまずdevで試し、ぺんた自身がスマホ実機で納得してから本番へ持っていく。
