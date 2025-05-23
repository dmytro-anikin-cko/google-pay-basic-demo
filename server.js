const express = require("express");
const path = require("path");
// const fetch = require("node-fetch"); // no need for this, since in Node 18.20.5 I already have the global fetch API built in!
require("dotenv").config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, "public"))); // Serve index.html & script.js
app.use(express.json());

// API route
app.post("/api/process-payment", async (req, res) => {
  const { token } = req.body;

  try {
    const paymentReq = {
      source: {
        type: "token",
        token: token,
      },
      "3ds": {
        enabled: true,
      },
      processing_channel_id: "pc_w2njpb6jbjjujgcz5dgzxdn5mm",
      currency: "EUR",
      amount: 400,
      reference: "GPAY-TEST",
      success_url: "https://checkout.checkout.test.success",
      failure_url: "https://checkout.checkout.test.failure",
    };

    const ckoRes = await fetch("https://api.sandbox.checkout.com/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CKO_SECRET_KEY}`,
      },
      body: JSON.stringify(paymentReq),
    });

    const result = await ckoRes.json();

    // Check if 3DS is required (status = Pending and _links.redirect exists)
    if (ckoRes.status === 202 && result._links?.redirect?.href) {
      return res.status(202).json({
        redirect_url: result._links.redirect.href,
        payment_id: result.id,
        status: result.status,
      });
    }

    // Otherwise, return the payment response as-is (200 Authorized, etc.)
    return res.status(200).json(result);
  } catch (err) {
    console.error("Payment error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
