const blogsList = require("../util/blogsList");

// to run the seeders npx sequelize-cli db:seed:all

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("blogs", blogsList, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("blogs", null, {});
  },
};
