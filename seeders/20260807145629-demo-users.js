const bcrypt = require("bcrypt");

const saltRounds = 10;

const userList = [
  {
    name: "Mariano Azuela",
    username: "marAz",
    password: "jsdjnegs",
    created_at: "2026-02-01",
    updated_at: "2026-02-01",
  },
  {
    name: "William Shakespeare",
    username: "willShak",
    password: "9784hau293",
    created_at: "2026-02-01",
    updated_at: "2026-02-01",
  },
  {
    name: "Robert Kappa",
    username: "robKap",
    password: "28jsghas0",
    created_at: "2026-02-01",
    updated_at: "2026-02-01",
  },
  {
    name: "Akira Kurosawa",
    username: "akirKu",
    password: "2947sjvaop",
    created_at: "2026-02-01",
    updated_at: "2026-02-01",
  },
  {
    name: "Emiliano Zapata",
    username: "emiZap",
    password: "ñ,xcbn623",
    created_at: "2026-02-01",
    updated_at: "2026-02-01",
  },
  {
    name: "Gibran Khalil Gibran",
    username: "gibKhagi",
    password: "kam36c.l@",
    created_at: "2026-02-01",
    updated_at: "2026-02-01",
  },
];

// to run the seeders npx sequelize-cli db:seed:all

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersWithHashPasswords = await Promise.all(
      userList.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        const { password, ...noPassword } = user;
        return {
          ...noPassword,
          password_hash: hashedPassword,
        };
      }),
    );

    await queryInterface.bulkInsert("users", usersWithHashPasswords, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
