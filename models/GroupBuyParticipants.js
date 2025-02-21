const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class GroupBuyParticipants extends Model {
   static init(sequelize) {
      return super.init(
         {
            participantId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            groupBuyId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            userId: {
                type: DataTypes.STRING(40),  // ✅ `User.userId`와 동일하게 `STRING(40)`
                allowNull: false
            },
            status: {
                type: DataTypes.TINYINT(1),
                allowNull: false
            }
         },
         {
            sequelize,
            modelName: 'GroupBuyParticipants',
            tableName: 'GroupBuyParticipants',
            timestamps: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
         }
      );
   }

   static associate(db) {
      db.GroupBuyParticipants.belongsTo(db.GroupBuy, {
         foreignKey: 'groupBuyId',
         targetKey: 'groupBuyId',
         as: 'GroupBuy'
      });

      db.GroupBuyParticipants.belongsTo(db.User, {
         foreignKey: 'userId',
         targetKey: 'userId',
         as: 'User'
      });
   }
}

module.exports = GroupBuyParticipants;
