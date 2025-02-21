const express = require('express');
const {
    getAllGroupBuys,
    getGroupBuyDetail,
    joinGroupBuy,
    cancelGroupBuy,
    createGroupBuy,
    deleteGroupBuy,
    searchGroupBuys
} = require('../controller/groupBuyController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

// ✅ 공구글 전체 조회 (모든 사용자 가능)
router.get('/', getAllGroupBuys);

// ✅ 공동구매 검색 (query 파라미터 사용)
router.get('/search', searchGroupBuys);

// ✅ 공구 상세 조회
router.get('/:groupBuyId', getGroupBuyDetail);

// ✅ 공구 생성 (로그인 필요)
router.post('/create', authenticateToken, createGroupBuy);

// ✅ 공구 삭제 (로그인 필요, 본인이 생성한 공구만 삭제 가능)
router.delete('/delete/:groupBuyId', authenticateToken, deleteGroupBuy);

// ✅ 공구 참여 (로그인 필요)
router.post('/join/:groupBuyId', authenticateToken, joinGroupBuy);

// ✅ 공구 참여 취소 (로그인 필요)
router.post('/cancel/:groupBuyId', authenticateToken, cancelGroupBuy);

module.exports = router;
