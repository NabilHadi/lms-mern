import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";

const port = env.PORT || 5000;
const db_uri = env.MONGO_CONNECTION_STRING;

mongoose
  .connect(db_uri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log("Server listening on port " + port);
    });
  })
  .catch((err) => {
    console.error(err);
  });
