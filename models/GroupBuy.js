const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
class GroupBuy extends Model {
    static init(sequelize) {
       return super.init(
          {
             groupBuyId: {
                 type: DataTypes.INTEGER,
                 primaryKey: true,
                 autoIncrement: true
             },
             title: {
                 type: DataTypes.STRING(40),
                 allowNull: false
             },
             content: {
                 type: DataTypes.STRING(255),
                 allowNull: false
             },
             max_people: {
                 type: DataTypes.INTEGER,
                 allowNull: false
             },
             price_per_person: {
                 type: DataTypes.DECIMAL(10, 2),
                 allowNull: false
             },
             status: {
                 type: DataTypes.TINYINT(1),
                 defaultValue: 1,
             },
             created_at: {
                 type: DataTypes.DATE,
                 defaultValue: DataTypes.NOW
             },
             location: {
                 type: DataTypes.STRING(40),
                 allowNull: true
             },
             userId: {
                 type: DataTypes.STRING(40),
                 allowNull: false,
             },
             image_url: { // ✅ 이미지 경로 추가
                 type: DataTypes.STRING(255),
                 allowNull: true,
             }
          },
          {
             sequelize,
             modelName: 'GroupBuy',
             tableName: 'GroupBuy',
             timestamps: false,
             charset: 'utf8',
             collate: 'utf8_general_ci',
          }
       );
    }
 

   static associate(db) {
      db.GroupBuy.belongsTo(db.User, {
         foreignKey: 'userId',
         targetKey: 'userId',
         as: 'User'
      });

      db.GroupBuy.hasMany(db.GroupBuyParticipants, {
         foreignKey: 'groupBuyId',
         as: 'GroupBuyParticipants'
      });
   }
}

module.exports = GroupBuy;

