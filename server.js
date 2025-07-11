const express = require("express");
const line = require("@line/bot-sdk");
const axios = require("axios");

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
};

const client = new line.Client(config);
const app = express();

app.post("/webhook", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent)).then(result => res.json(result));
});

function handleEvent(event) {
  if (event.type === "message" && event.message.type === "text" && event.message.text === "我愛襪襪") {
    // 👇 改成你ESP32的IP，例如 http://192.168.1.100/servo
    axios.get("http://你的ESP32的IP/servo");

    return client.replyMessage(event.replyToken, {
      type: "text",
      text: "襪襪收到啦 🧦"
    });
  }
  return Promise.resolve(null);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`LINE Bot 已啟動，port: ${port}`);
});
