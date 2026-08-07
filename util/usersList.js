const bcrypt = require("bcrypt");

const saltRounds = 10;

const userList = [
  {
    name: "Mariano Azuela",
    username: "marAz",
    password: "jsdjnegs",
  },
  {
    name: "William Shakespeare",
    username: "willShak",
    password: "9784hau293",
  },
  {
    name: "Robert Kappa",
    username: "robKap",
    password: "28jsghas0",
  },
  {
    name: "Akira Kurosawa",
    username: "akirKu",
    password: "2947sjvaop",
  },
  {
    name: "Emiliano Zapata",
    username: "emiZap",
    password: "ñ,xcbn623",
  },
  {
    name: "Gibran Khalil Gibran",
    username: "gibKhagi",
    password: "kam36c.l@",
  },
];

async function prepareUsers() {
  const usersWithHashPasswords = await Promise.all(
    userList.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      return {
        ...user,
        passwordHash: hashedPassword,
      };
    }),
  );

  return usersWithHashPasswords;
}

console.log(prepareUsers());

module.exports = prepareUsers();
