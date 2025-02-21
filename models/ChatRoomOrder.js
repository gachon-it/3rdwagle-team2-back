const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ChatRoomOrder = sequelize.define('ChatRoomOrder', {
    chatOrderId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    groupOrderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'ChatRoomOrder',
    timestamps: false
});

module.exports = ChatRoomOrder;
