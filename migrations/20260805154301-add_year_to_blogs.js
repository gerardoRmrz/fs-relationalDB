const { DataTypes, Sequelize } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("blogs", "year", {
      type: DataTypes.INTEGER,
      allowNull: false,
    });

    await queryInterface.addConstraint("blogs", {
      fields: ["year"],
      type: "check",
      where: {
        year: {
          [Sequelize.Op.and]: [
            { [Sequelize.Op.gte]: 1991 },
            Sequelize.literal(`"year" <= EXTRACT(YEAR FROM CURRENT_DATE)`),
          ],
        },
      },
      name: "check_year_range_dynamic",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("blogs", "check_year_range_dynamic");
    await queryInterface.removeColumn("blogs", "year");
  },
};
