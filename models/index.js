const Sequelize = require('sequelize');
const sequelize = require('../config/database'); // ✅ Sequelize 인스턴스 가져오기

const User = require('./User');
const GroupBuy = require('./GroupBuy');
const GroupBuyParticipants = require('./GroupBuyParticipants');

const db = {}; // 데이터베이스 객체 생성
db.sequelize = sequelize;  // ✅ Sequelize 인스턴스를 db에 추가
db.Sequelize = Sequelize;  // Sequelize 클래스도 추가

// 모델을 db 객체에 추가
db.User = User;
db.GroupBuy = GroupBuy;
db.GroupBuyParticipants = GroupBuyParticipants;

// ✅ 모델 초기화 (필수!)
User.init(sequelize);
GroupBuy.init(sequelize);
GroupBuyParticipants.init(sequelize);

// ✅ 모델 간 관계 설정
User.associate(db);
GroupBuy.associate(db);
GroupBuyParticipants.associate(db);

module.exports = db;
