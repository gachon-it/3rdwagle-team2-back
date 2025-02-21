const { sequelize, GroupBuy, User } = require('../models');

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

module.exports = { getGroupBuyDetail };
