const axios = require("axios");
const http = require("http");
const fs = require("fs");
const { Json } = require("sequelize/lib/utils");

axios.defaults.httpAgent = new http.Agent({ keepAlive: false });

const baseUrl = "http://localhost:3001/api";

const logToFile = (data) => {
  let stream = fs.createWriteStream("./log_app.txt", { flags: "a" });

  stream.write(data + "\n");
  stream.close();
};

const resetDatabase = async () => {
  await axios.post(`${baseUrl}/reset`);
};

const createUser = async (username, name, password) => {
  const response = await axios.post(`${baseUrl}/users`, {
    username,
    name,
    password,
  });

  logToFile("create user " + JSON.stringify(response.data));
  return response.data;
};

const login = async (username, password) => {
  const response = await axios.post(`${baseUrl}/login`, {
    username,
    password,
  });
  logToFile("login " + JSON.stringify(response.data));
  return response.data.token;
};

const resetAndSeed = async () => {
  console.log("1. Start database reset...");
  await resetDatabase();

  console.log("2. Creating user 1...");
  const user1 = await createUser(
    "test1@example.com",
    "Test User 1",
    "password123",
  );

  console.log("3. Creating user 2...");
  const user2 = await createUser(
    "test2@example.com",
    "Test User 2",
    "password456",
  );

  console.log("4. Logging user 1...");
  const token1 = await login("test1@example.com", "password123");
  console.log("5. Logging user 2...");
  const token2 = await login("test2@example.com", "password456");

  console.log("6. Reset and seed complete!");
  return {
    users: [user1, user2],
    tokens: [token1, token2],
  };
};

module.exports = {
  baseUrl,
  resetAndSeed,
  createUser,
  login,
  logToFile,
};
