const { Model, DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../util/db.js");

class Session extends Model {}

Session.init(
  {
    userId: DataTypes.INTEGER,
    token: DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "Session",
    tableName: "_sessions_",
  },
);

module.exports = Session;
