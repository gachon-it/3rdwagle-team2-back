const express = require('express');
const { register, login, logout, profile } = require('../controller/userController');
const authenticateToken = require('../middlewares/authenticateToken'); // ✅

const router = express.Router();

router.post('/register', register); // 회원가입
router.post('/login', login); // 로그인
router.post('/logout', logout); // 로그아웃
router.get('/profile', authenticateToken, profile); // 프로필 조회 (인증 필요)

module.exports = router;
