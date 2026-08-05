const { Sequelize } = require("sequelize");
const {
  DATABASE_URL,
  SECRET,
  PORT,
  TEST_DATABASE_URL,
  TESTING,
} = require("./config");

const { Umzug, SequelizeStorage } = require("umzug");

const sequelize = new Sequelize(
  TESTING === "true" ? TEST_DATABASE_URL : DATABASE_URL,
  {
    dialect: "postgres",
    port: 5432,
    dialectOptions: {
      ssl: false,
    },
  },
);

const runMigrations = async () => {
  const migrator = new Umzug({
    migrations: {
      glob: "migrations/*.js",
    },
    storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
    context: sequelize.getQueryInterface(),
    logger: console,
  });

  const migrations = await migrator.up();
  console.log("Migrations up to date", {
    files: migrations.map((mig) => mig.name),
  });
};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log("connected to the database");
  } catch (err) {
    console.log("failed to connect to the database: ", err);
    return process.exit(1);
  }

  return null;
};

module.exports = { connectToDatabase, sequelize };
