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

## 📋 簡介

設定環境有夠麻煩，所以本指南將帶領您完成富邦證券 API 的 JavaScript 使用環境設定，盡可能包含細節，並提供一個簡單的範例程式碼來展示如何使用該 API 。

📚 **官方文件**：https://www.fbs.com.tw/TradeAPI/docs/trading/library/nodejs/login

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

✅ 確定自己安裝了可以執行 Node.js 的環境，你可以在終端機裡輸入 `node -v` 來確認。

### 9. 安裝相依套件

在終端機執行 `npm install` 安裝相依套件。

```bash
npm install
```

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

---

## 📝 License

MIT © [edliu](mailto:liudahsing84@gmail.com)

## ⚠️ 免責聲明

本專案僅供學習和參考使用，請遵守富邦證券的使用條款和相關法規。使用本專案進行實際交易時，請自行承擔風險。
