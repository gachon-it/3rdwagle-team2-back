const ChatRoomOrder = require('../models/ChatRoomOrder');
const ChatMessageOrder = require('../models/ChatMessageOrder');
const authenticateToken = require('../middlewares/authenticateToken');

// ✅ 채팅방 생성
const createChatRoom = async (req, res) => {
    const { groupOrderId } = req.body;

    if (!groupOrderId) {
        return res.status(400).json({ error: "groupOrderId is required" });
    }

    try {
        const chatRoom = await ChatRoomOrder.create({ groupOrderId });
        res.status(201).json({ message: "Chat room created successfully", chatRoom });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// ✅ 채팅방 목록 조회
const getChatRooms = async (req, res) => {
    try {
        const chatRooms = await ChatRoomOrder.findAll();
        res.status(200).json(chatRooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// ✅ 메시지 전송
const sendMessage = async (req, res) => {
    const { chatOrderId, message } = req.body;
    const userId = req.user.userId; // 토큰에서 추출

    if (!chatOrderId || !message) {
        return res.status(400).json({ error: "chatId and message are required" });
    }

    try {
        const chatMessage = await ChatMessageOrder.create({ chatOrderId, userId, message });
        res.status(201).json({ message: "Message sent", chatMessage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// ✅ 특정 채팅방 메시지 조회
const getChatMessages = async (req, res) => {
    const { chatOrderId } = req.params;

    try {
        const messages = await ChatMessageOrder.findAll({ where: { chatOrderId } });
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { createChatRoom, getChatRooms, sendMessage, getChatMessages };
