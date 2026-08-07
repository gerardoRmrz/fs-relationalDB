const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../util/db.js");

class UserReadingList extends Model {}

UserReadingList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    readingListId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "reading_list", key: "id" },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    modelName: "user_readinglist",
  },
);

module.exports = UserReadingList;
