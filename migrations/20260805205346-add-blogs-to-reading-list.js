const { DataTypes, Sequelize } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("readinglist", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      read: {
        type: DataTypes.BOOLEAN,
      },
    });
    await queryInterface.createTable("user_readinglist", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
      },
      reading_list_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "readinglist", key: "id" },
      },
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("readinglist");
    await queryInterface.dropTable("user_readinglist");
  },
};
