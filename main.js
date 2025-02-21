require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const db = require('./models');
const cors = require('cors'); // ✅ CORS 추가

const userRouter = require('./router/userRouter');
const chatOrderRouter = require('./router/chatOrderRouter');    //공동배달채팅
const chatRouter = require('./router/chatRouter');    // 공동구매 채팅
const groupBuyRouter = require('./router/groupBuyRouter');    // 공동구매 채팅

const app = express();
app.use(cors());

app.use(express.json());

// 서버 기본 라우트
app.get('/', (req, res) => {
    res.send("🎉 공동구매 플랫폼 서버 실행 중!");
});
// ✅ 특정 origin(클라이언트)만 허용하고 싶다면 이렇게 설정
app.use(cors({
    origin: 'http://localhost:3001', // React 클라이언트 주소
    credentials: true, // 쿠키 허용 시 필요
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // 허용할 HTTP 메서드
}));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});

app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/chatOrder', chatOrderRouter);     //공동배달 API
app.use('/chat', chatRouter);     // 공동구매 API
app.use('/groupBuy', groupBuyRouter);
