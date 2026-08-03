require("dotenv").config();
const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  port: 5432,
  dialectOptions: {
    ssl: false,
  },
});

const main = async () => {
  try {
    await sequelize.authenticate();
    const blogs = await sequelize.query("SELECT * FROM blogs", {
      type: QueryTypes.SELECT,
    });

    console.table(blogs);

    sequelize.close();
  } catch (error) {
    console.error("unable to connect to the database:", error);
  }
};

main();
