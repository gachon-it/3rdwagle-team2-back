const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ChatMessage = sequelize.define("ChatMessage", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    chatId: {
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
    tableName: 'ChatMessage',
    freezeTableName: true,
    timestamps: false
});

module.exports = ChatMessage;
