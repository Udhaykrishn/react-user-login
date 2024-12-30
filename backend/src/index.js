import express from "express";
import ConnectDB from "#config/db.config.js";
import ENV from "#env/const.env.js";

import UserRouter from "#router/user.routers.js";
import AdminRouter from "#router/admin.routes.js"

const app = express(); 

app.use(express.json());

const bootstrap = async () => {
  try {
    await ConnectDB.connect();

    app.use("/user", UserRouter);
    app.use("/admin",AdminRouter)

    const PORT = ENV.PORT;

    app.listen(PORT, () => console.log("server is started ", PORT));
  } catch (error) {
    console.error(
      `Failed to start server due to database connection error: ${error.message}`
    );
  }
};

bootstrap();
