const express = require("express");
const app = express();

const errorHandler = require("./middlewares/errors");

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

const resetRouter = require("./controllers/reset");
const blogsRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const authorsRouter = require("./controllers/authors");
const readinglistRouter = require("./controllers/readinglist");
const logoutRouter = require("./controllers/logout");

app.use(express.json());

app.use("/api/reset", resetRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/readinglists", readinglistRouter);
app.use("/api/logout", logoutRouter);

app.get("/", async (req, res) => {
  res.status(200).end();
});

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

app.use(errorHandler);

start();
