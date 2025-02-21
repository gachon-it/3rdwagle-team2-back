const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ChatMessageOrder = sequelize.define("ChatMessageOrder", {
    messageOrderId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    chatOrderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: { 
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    sent_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'ChatMessageOrder', // 👈 테이블 이름을 명확하게 지정
    freezeTableName: true, // 👈 테이블 이름이 자동 변경되지 않도록 설정
    timestamps: false
});

module.exports = ChatMessageOrder;
