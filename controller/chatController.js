const ChatRoom = require('../models/ChatRoom');
const ChatMessage = require('../models/ChatMessage');
const authenticateToken = require('../middlewares/authenticateToken');

// ✅ 채팅방 생성
const createChatRoom = async (req, res) => {
    const { groupBuyId } = req.body;
    const ownerId = req.user.userId; // 현재 로그인한 유저

    if (!groupBuyId) {
        return res.status(400).json({ error: "groupBuyId is required" });
    }

    try {
        const chatRoom = await ChatRoom.create({ groupBuyId, ownerId });
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
    const userId = req.user.userId;

    if (!chatId || !message) {
        return res.status(400).json({ error: "chatId and message are required" });
    }

    try {
        // 채팅방 조회
        const chatRoom = await ChatRoom.findOne({ where: { chatId } });

        // 채팅방 생성자가 아닌 경우 메시지 입력 불가
        if (!chatRoom || chatRoom.ownerId !== userId) {
            return res.status(403).json({ error: "Only the chat room creator can send messages" });
        }

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

async function fetchMessages(chatId) {
    try {
        const response = await fetch(`/chat/messages/${chatId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (!response.ok) throw new Error("Failed to fetch messages");
        
        const messages = await response.json();
        renderMessages(messages); // 메시지를 화면에 렌더링하는 함수
    } catch (error) {
        console.error("Error fetching messages:", error);
    }
}

// // 3초마다 새로운 메시지를 불러옴
// setInterval(() => {
//     const chatId = getCurrentChatId(); // 현재 보고 있는 채팅방 ID 가져오는 함수
//     if (chatId) {
//         fetchMessages(chatId);
//     }
// }, 3000);

setInterval(async () => {
    const chatId = "2"; // 예제: 특정 chatId를 하드코딩 (나중에 동적으로 변경 가능)

    if (chatId) {
        try {
            const response = await fetch(`http://localhost:3000/chat/messages/${chatId}`, {
                headers: {
                    'Authorization': `Bearer YOUR_ACCESS_TOKEN`
                }
            });

            if (!response.ok) throw new Error("Failed to fetch messages");

            const messages = await response.json();
            console.log("📩 새 메시지:", messages);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    }
}, 3000);


module.exports = { createChatRoom, getChatRooms, sendMessage, getChatMessages };
