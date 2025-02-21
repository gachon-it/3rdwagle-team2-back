require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser'); 
const db = require('./config/database');

const userRouter = require('./router/userRouter');
const chatOrderRouter = require('./router/chatOrderRouter');    //공동배달채팅

const app = express();
app.use(express.json());

// 서버 기본 라우트
app.get('/', (req, res) => {
    res.send("🎉 공동구매 플랫폼 서버 실행 중!");
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});

app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/chatOrder', chatOrderRouter);     //공동배달 API