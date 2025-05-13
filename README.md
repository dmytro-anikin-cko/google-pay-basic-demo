# 💳 Google Pay + Checkout.com Demo

A simple full-stack demo that integrates **Google Pay** with **Checkout.com** using:

- 🖥️ Plain HTML/JavaScript frontend
- 🔧 Node.js + Express backend
- 🪄 Tokenization via Checkout.com `/tokens`
- 🔐 Secure payments via Checkout.com `/payments` (server-side only)

---

## 🗂 Project Structure

```bash
google-pay-basic-demo/
├── public/ # Frontend code
│ ├── index.html # Google Pay button UI
│ └── script.js # Google Pay API - took the template from Google Pay docs [here](https://developers.google.com/pay/api/web/guides/tutorial) + Checkout tokenization
│
├── server.js # Express backend
├── .env # Secret API key (not committed)
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repo and install dependencies

```bash
npm install
```

### 2. Set your Checkout.com secret key
Create a .env file in the root folder:

```sh
CKO_SECRET_KEY=sk_sbox_your_secret_key_here
```

> 🔐 Never commit your .env file.

### 3. Start the server
```bash
npm start
```
- The site will be live at: http://localhost:3000
- Google Pay button is rendered from public/index.html

---

## ✅ How It Works
1. Google Pay returns an encrypted token
2. The frontend sends it to Checkout.com's /tokens endpoint (using the public key)
3. The returned Checkout token is sent to the backend
4. The backend calls /payments using your secret key

---

## 🔒 Security Notes
 - All secret-key operations are only done server-side
 - Your .env file is ignored via .gitignore
 - CORS is not an issue since frontend and backend are served from the same domain

---

## 📚 Resources
- [Google Pay API docs](https://developers.google.com/pay/api/web/guides/tutorial)
- [Checkout.com Google Pay guide](https://www.checkout.com/docs/payments/add-payment-methods/google-pay)

---

## 🛠 Requirements
Node.js ≥ 18 (to use the native "fetch"). Otherwise, use [node-fetch](https://www.npmjs.com/package/node-fetch):
```js
const fetch = require("node-fetch");
```
