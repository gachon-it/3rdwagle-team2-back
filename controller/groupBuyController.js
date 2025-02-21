const { sequelize, GroupBuy, GroupBuyParticipants, User } = require('../models');

const getGroupBuyDetail = async (req, res) => {
    try {
        const { groupBuyId } = req.params;

        console.log(`🔍 요청된 groupBuyId: ${groupBuyId}`); // ✅ 요청된 groupBuyId 출력

        // 🔥 GroupBuy 테이블의 데이터만 조회 (GroupBuyParticipants 제거)
        const groupBuyDetail = await GroupBuy.findOne({
            where: { groupBuyId },
            include: [
                {
                    model: User,
                    as: 'User',  // ✅ GroupBuy 생성자의 정보
                    attributes: ['userId', 'userName', 'email']
                }
            ]
        });

        console.log("🔍 groupBuyDetail 데이터 확인:", JSON.stringify(groupBuyDetail, null, 2)); // ✅ 조회된 데이터 출력

        if (!groupBuyDetail) {
            console.log("❌ groupBuyId에 해당하는 공동구매 없음");
            return res.status(404).json({ message: '해당 공동구매를 찾을 수 없습니다.' });
        }

        // ✅ MySQL의 `SELECT * FROM GroupBuy;` 결과와 동일하게 반환
        const response = {
            groupBuyId: groupBuyDetail.groupBuyId,
            title: groupBuyDetail.title,
            content: groupBuyDetail.content,
            max_people: groupBuyDetail.max_people,
            price_per_person: groupBuyDetail.price_per_person,
            status: groupBuyDetail.status === 1 ? '모집 중' : '종료',
            created_at: groupBuyDetail.created_at,
            location: groupBuyDetail.location,
            userId: groupBuyDetail.User?.userId || null,  // ✅ User 정보가 없을 경우 null 반환
            userName: groupBuyDetail.User?.userName || null
        };

        console.log("🔍 최종 반환 데이터:", JSON.stringify(response, null, 2)); // ✅ 최종 응답 데이터 출력

        return res.status(200).json(response);
    } catch (error) {
        console.error('❌ Error fetching group buy detail:', error);
        return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
};
// ✅ 공구 생성 (로그인 필요)
const createGroupBuy = async (req, res) => {
    try {
        const { userId, title, content, max_people, price_per_person, location } = req.body;

        // 🔥 요청한 사용자 ID와 토큰에서 추출한 ID가 같은지 검증
        if (req.user.userId !== userId) {
            return res.status(403).json({ message: '본인의 계정으로만 공구를 생성할 수 있습니다.' });
        }

        // 유저가 존재하는지 확인
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }

        // 새 공구 생성
        const newGroupBuy = await GroupBuy.create({
            userId,
            title,
            content,
            max_people,
            price_per_person,
            location
        });

        return res.status(201).json({ message: '공구가 성공적으로 생성되었습니다.', groupBuy: newGroupBuy });
    } catch (error) {
        console.error('❌ Error creating group buy:', error);
        return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
};

// ✅ 공구 삭제 (로그인 필요, 본인이 생성한 공구만 삭제 가능)
const deleteGroupBuy = async (req, res) => {
    try {
        const { groupBuyId } = req.params;
        const loggedInUserId = req.user.userId; // 🔥 토큰에서 추출한 유저 ID 사용

        // 공구 조회
        const groupBuy = await GroupBuy.findByPk(groupBuyId);
        if (!groupBuy) {
            return res.status(404).json({ message: '해당 공구를 찾을 수 없습니다.' });
        }

        // 본인이 생성한 공구인지 확인
        if (groupBuy.userId !== loggedInUserId) {
            return res.status(403).json({ message: '본인이 생성한 공구만 삭제할 수 있습니다.' });
        }

        // 공구 삭제
        await groupBuy.destroy();

        return res.status(200).json({ message: '공구가 성공적으로 삭제되었습니다.' });
    } catch (error) {
        console.error('❌ Error deleting group buy:', error);
        return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
};

module.exports = {
    getGroupBuyDetail,
    createGroupBuy,
    deleteGroupBuy,
    joinGroupBuy,
    cancelGroupBuy
};