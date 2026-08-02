require("dotenv").config();
const { Sequelize } = require("sequelize");

console.log("*************** ", process.env.DATABASE_URL);

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
    console.log("Connection has been established successfully.");
    sequelize.close();
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
};

main();
