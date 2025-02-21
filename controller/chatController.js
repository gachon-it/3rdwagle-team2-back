const ChatRoom = require('../models/ChatRoom');
const ChatMessage = require('../models/ChatMessage');
const authenticateToken = require('../middlewares/authenticateToken');

// ✅ 채팅방 생성
const createChatRoom = async (req, res) => {
    const { groupBuyId } = req.body;

    if (!groupBuyId) {
        return res.status(400).json({ error: "groupBuyId is required" });
    }

    try {
        const chatRoom = await ChatRoom.create({ groupBuyId });
        res.status(201).json({ message: "Chat room created successfully", chatRoom });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// ✅ 채팅방 목록 조회
const getChatRooms = async (req, res) => {
    try {
        const chatRooms = await ChatRoom.findAll();
        res.status(200).json(chatRooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// ✅ 메시지 전송
const sendMessage = async (req, res) => {
    const { chatId, message } = req.body;
    const userId = req.user.userId; // 토큰에서 추출

    if (!chatId || !message) {
        return res.status(400).json({ error: "chatId and message are required" });
    }

    try {
        const chatMessage = await ChatMessage.create({ chatId, userId, message });
        res.status(201).json({ message: "Message sent", chatMessage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// ✅ 특정 채팅방 메시지 조회
const getChatMessages = async (req, res) => {
    const { chatId } = req.params;

    try {
        const messages = await ChatMessage.findAll({ where: { chatId } });
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { createChatRoom, getChatRooms, sendMessage, getChatMessages };
