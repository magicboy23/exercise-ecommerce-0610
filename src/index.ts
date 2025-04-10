import express from "express";
import { errorMiddleware } from "./middlewares/error.middleware";
import cors from "cors";
import sampleRouter from "./routes/sample.router";
import { PORT } from "./config/env";
import authRouter from "./routes/auth.router";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/samples", sampleRouter);
app.use("/auth", authRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on PORT : ${PORT}`);
});
