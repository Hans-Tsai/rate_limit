const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const router = require('./routes/router');

const app = express();
app.use(express.json());
// 將 API request 夾帶的 JSON 資料"解析"成 Javascript 的物件 (object) 形式
app.use(express.json());
// 將 API request 夾帶的 `cookie` 中的 `cookie header` 資料"解析"成 Javascript 的物件 (object) 形式。同時會產生 req.cookies 的屬性值，並綁定到 `request` 物件上
app.use(cookieParser());

/** 建立 Local MongoDB 連線設定 */
const dbURI = 'mongodb://localhost/rate_limit';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.get('/', router);
