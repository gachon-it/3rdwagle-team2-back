const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    userId: {
        type: DataTypes.STRING(40),
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true
    },
    created_at: {  // ✅ DB의 created_at과 동일하게 설정
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    dormitory: {
        type: DataTypes.STRING(40),
        allowNull: true
    }
}, {
    tableName: 'User',
    timestamps: false  // ✅ createdAt, updatedAt 자동 생성 방지
});

module.exports = User;
