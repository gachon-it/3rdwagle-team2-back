//공동배달

const express = require('express');
const { createChatRoom, getChatRooms, sendMessage, getChatMessages } = require('../controller/chatOrderController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

router.post('/create', authenticateToken, createChatRoom); // ✅ 채팅방 생성
router.get('/rooms', authenticateToken, getChatRooms); // ✅ 채팅방 목록 조회
router.post('/message', authenticateToken, sendMessage); // ✅ 메시지 전송
router.get('/messages/:chatId', authenticateToken, getChatMessages); // ✅ 채팅방 메시지 조회

module.exports = router;
