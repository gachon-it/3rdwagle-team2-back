const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {
   static init(sequelize) {
      return super.init(
         {
            userId: {
               type: DataTypes.STRING(40),
               allowNull: false,
               unique: true,
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
            created_at: {
               type: DataTypes.DATE,
               defaultValue: DataTypes.NOW
            },
            dormitory: {
               type: DataTypes.STRING(40),
               allowNull: true
            }
         },
         {
            sequelize,
            modelName: 'User',
            tableName: 'User',
            timestamps: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
         }
      );
   }

   static associate(db) {
      db.User.hasMany(db.GroupBuy, {
         foreignKey: 'userId',
         sourceKey: 'userId',
         as: 'GroupBuys'
      });

      db.User.hasMany(db.GroupBuyParticipants, {
         foreignKey: 'userId',
         sourceKey: 'userId',
         as: 'GroupBuyParticipants'
      });
   }
}

module.exports = User;
