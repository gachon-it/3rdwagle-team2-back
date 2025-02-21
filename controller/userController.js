const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middlewares/authenticateToken'); // ✅ 미들웨어 사용

// ✅ 회원가입 (비밀번호 해시화 없이 저장)
const register = async (req, res) => {
    const { userId, password, userName, email, dormitory } = req.body;
    
    if (!userId || !password || !userName || !email) {
        return res.status(400).json({ message: "All required fields must be provided." });
    }

    try {
        await User.create({
            userId,
            password, // 평문 저장
            userName,
            email,
            dormitory
        });

        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: error.message, message: "Internal Server Error" });
    }
};

const login = async (req, res) => {
    try {
        const { userId, password } = req.body;
        if (!userId || !password) {
            return res.status(400).json({ error: '아이디와 비밀번호를 입력하세요.' });
        }

        const user = await User.findOne({ where: { userId } });
        if (!user) {
            return res.status(401).json({ error: '존재하지 않는 사용자입니다.' });
        }

        if (password !== user.password) {
            return res.status(401).json({ error: '비밀번호가 일치하지 않습니다.' });
        }
        // ✅ JWT 토큰 발급
        const token = await jwt.sign(
            { userId: user.userId, userName: user.userName },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: '로그인 성공',
            token,
            user: {
                userId: user.userId,
                userName: user.userName,
                email: user.email,
                dormitory: user.dormitory,
                createdAt: user.created_at
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '서버 오류' });
    }
};

// ✅ 로그아웃
const logout = async (req, res) => {
    res.status(200).json({ message: "Logout successful. Please remove token on client side." });
};

// ✅ 프로필 조회 (authenticateToken 적용)
const profile = async (req, res) => {
    const userId = req.user.userId; // ✅ authenticateToken에서 user 정보 추출

    try {
        const user = await User.findOne({ where: { userId } });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({
            message: "User profile retrieved successfully.",
            userId: user.userId,
            userName: user.userName,
            email: user.email,
            dormitory: user.dormitory,
            createdAt: user.createdAt
        });
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: error.message, message: "Internal Server Error" });
    }
};

module.exports = { register, login, logout, profile };
