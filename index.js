import cors from "cors";
import "dotenv/config";
import express from "express";

import todoRoute from "./routes/todo.route.js";
import userRoute from "./routes/user.route.js";

export const app = express();

app.use(express.json());
app.use(cors());
app.use("/todos", todoRoute);
app.use("/users", userRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
