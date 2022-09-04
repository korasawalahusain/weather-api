import { WeatherRouter } from "./routes";
import cors from "cors";
import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 4000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use(WeatherRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
