const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ChatRoom = sequelize.define('ChatRoom', {
    chatId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    groupBuyId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ownerId: {  // 생성자 정보 추가
        type: DataTypes.STRING(40),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'ChatRoom',
    timestamps: false
});

module.exports = ChatRoom;
