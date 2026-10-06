<h1 align="center">
富邦證券 API JavaScript 使用環境建立指南
</h1>
<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
![Version](https://img.shields.io/badge/version-1.0.0-green?style=for-the-badge)

📈 **富邦證券交易 API** | 💻 **Node.js SDK** | 🔐 **憑證登入**

</div>

---

> [!IMPORTANT]
> **🔒 外部依賴僅使用富邦官方 SDK**
>
> 本專案唯一的直接依賴是富邦證券官方發佈的 `fubon-neo`，且**不從 npm registry 安裝**，而是使用你自己從[富邦官網](https://www.fbs.com.tw/TradeAPI/docs/download/download-sdk#javascript)下載、放在本機 `lib/` 的 `.tgz` 檔。你可以自行驗證：
>
> | 檢查項目 | 位置 |
> | --- | --- |
> | 唯一的直接依賴，指向本機官方 tgz | [`package.json` 第 13–15 行](package.json#L13-L15) |
> | 程式碼唯一的 `import` | [`index.js` 第 1 行](index.js#L1) |
> | lockfile 鎖定來源為本機檔案（非 registry）與 integrity hash | [`pnpm-lock.yaml` 第 11–13、25–26 行](pnpm-lock.yaml#L11-L26) |
> | 憑證、密碼、SDK 檔案不會被 commit | [`.gitignore` 第 2、5、6 行](.gitignore#L2-L6) |
>
> `pnpm-lock.yaml` 中其餘套件（`ws`、`isomorphic-fetch`、`query-string` 等）是官方 SDK 本身宣告的間接依賴，見 [`pnpm-lock.yaml` 第 89–94 行](pnpm-lock.yaml#L89-L94)，非本專案額外引入。
>
> 整個範例程式只有 [`index.js`](index.js) 12 行，帳密只透過環境變數傳給官方 SDK，不會送往任何第三方。

## 📋 簡介

設定環境有夠麻煩，所以本指南將帶領您完成富邦證券 API 的 JavaScript 使用環境設定，盡可能包含細節，並提供一個簡單的範例程式碼來展示如何使用該 API 。

📚 **官方文件**：https://www.fbs.com.tw/TradeAPI/docs/trading/library/nodejs/login

> 本專案為個人整理的非官方說明，與富邦證券無任何關係。

## 🧰 環境需求

| 項目 | 需求 | 備註 |
| --- | --- | --- |
| Node.js | ≥ 20.6（建議 24，見 [`.tool-versions`](.tool-versions)） | `--env-file` 參數需要 20.6 以上 |
| 套件管理 | pnpm（專案附 `pnpm-lock.yaml`）或 npm | |
| fubon-neo SDK | 已驗證 `2.2.5` | 其他版本請自行測試 |
| Windows 電腦 | 僅申請憑證時需要 | 系統語言需為繁體中文 |
| 富邦證券帳戶 | 需已開戶 | |

## 📁 專案結構

```text
.
├── cert/            # 放置 .pfx 憑證（已被 .gitignore 排除）
├── lib/             # 放置官方 fubon-neo-x.x.x.tgz（已被 .gitignore 排除）
├── .env.example     # 環境變數範本，複製成 .env 使用
├── index.js         # 登入範例
└── package.json
```

## 🚀 前置作業

### 1. 複製專案

Git clone 此專案至本地端，專案已經把必要的檔案結構建立好，並有 `.gitignore` 避免意外上傳機密檔案到 git 。

```bash
git clone git@github.com:flyingdog1310/fubon-trading-api-js.git
```

### 2. 取得憑證檔案

🔐 取得憑證檔案 (pfx)，您需要一台 Windows 電腦，且預設語言必須設定為繁體中文，否則會遇到 locale 錯誤。

📍 **申請網址**：https://www.fbs.com.tw/Certificate/Management/

### 3. 放置憑證

把取得的 `xxx.pfx` 檔案放置於專案的 `cert` 資料夾中。

### 4. 申請 API 權限

📝 線上申請 API 使用權限

📍 **申請網址**：https://wtv.fbs.com.tw/ContractWeb/Login/Index

### 5. 下載 SDK

⬇️ 網路下載 JS SDK 套件

📍 **下載位置**：https://www.fbs.com.tw/TradeAPI/docs/download/download-sdk#javascript

### 6. 解壓縮 SDK

解壓縮 `fubon-neo-<x.x.x>.nodejs.zip` => 取得 `fubon-neo-<x.x.x>.tgz` 檔案，並將其放置於專案的 `lib` 資料夾中。

### 7. 更新套件路徑

更新 `package.json` 內的 fubon-neo 路徑指向 `lib` 資料夾中的 `.tgz` 檔案。

```json
"dependencies": {
  "fubon-neo": "./lib/fubon-neo-<x.x.x>.tgz"
}
```

### 8. 確認 Node.js 環境

✅ 確定自己安裝了 Node.js 20.6 以上版本，你可以在終端機裡輸入 `node -v` 來確認。若使用 [asdf](https://asdf-vm.com/) / [mise](https://mise.jdx.dev/)，專案內的 `.tool-versions` 會自動切換版本。

### 9. 安裝相依套件

在終端機安裝相依套件，專案附有 `pnpm-lock.yaml`，建議使用 pnpm。

```bash
pnpm install
# 或
npm install
```

> 💡 若 SDK 版本與 lockfile 記錄的不同，安裝時 lockfile 會跟著更新，屬正常現象。

### 10. 設定環境變數

⚙️ 環境變數設定範例請參考 `.env.example` 檔案內容，將其複製為 `.env` 並填入您的資訊。

```env
IDENTIFIER = "您的身分證號(A123456789)";
PASSWORD = "您的登入密碼(******)";
CERT_PATH = "您的憑證路徑位置(./cert/cert.pfx)";
CERT_PASSWORD = "您的憑證密碼(******)";
```

> ⚠️ **注意**：如果您申請憑證時沒有設定 CERT_PASSWORD，可以不需要填入，並記得移除 index.js 中相關參數。

### 11. 執行範例

🎯 執行以下指令來啟動範例程式：

```bash
npm run dev
# 或
node --env-file=.env index.js
```

會讀取你的 env 設定並使用 index.js 嘗試登入。

## 🧪 測試結果

### 12. 第一次測試您會拿到
```json
{
  "isSuccess": false,
  "message": "無簽署完成API使用風險暨聲明書帳號，請與營業員聯絡；若正進行簽署流程並測試連線中，此訊息表連線測試成功，使用權限將應於次日開通"
}
```

🎉 **恭喜你，隔天就可以開始使用 API 了！**

## ❓ 常見問題

**Q：申請憑證時出現 locale 相關錯誤？**
Windows 的系統語言（含「非 Unicode 程式的語言」）需設定為繁體中文（台灣），修改後重新開機再試一次。

**Q：申請憑證時沒有設定憑證密碼？**
`.env` 的 `CERT_PASSWORD` 留空即可，並移除 [`index.js` 第 10 行](index.js#L10) 的 `CERT_PASSWORD` 參數。

**Q：`npm run dev` 出現 `bad option: --env-file`？**
Node.js 版本太舊，請升級至 20.6 以上。

**Q：找不到 `fubon-neo` 模組？**
確認 `lib/` 內的 `.tgz` 檔名與 `package.json` 中的路徑完全一致，修改後重新執行安裝。

## 🔐 安全提醒

- `.env`、`*.pfx`、`*.tgz` 已列入 `.gitignore`，**請勿**用 `git add -f` 強制加入。
- 官方 SDK 只從[富邦官網](https://www.fbs.com.tw/TradeAPI/docs/download/download-sdk#javascript)下載，不要使用他人轉傳的檔案。
- 若懷疑憑證或密碼外洩，請立即至富邦憑證管理頁面註銷並重新申請。

---

## 📝 License

MIT © [edliu](mailto:liudahsing84@gmail.com)

## ⚠️ 免責聲明

本專案為個人整理的非官方說明文件，與富邦證券無任何關係，僅供學習和參考使用，請遵守富邦證券的使用條款和相關法規。`fubon-neo` SDK 之著作權屬富邦證券所有，本專案不包含亦不散布該 SDK。使用本專案進行實際交易時，請自行承擔風險。
