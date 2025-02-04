import express, { Request, Response } from "express";

import cors from "cors";
import { productRouters } from "./modules/product/product.rotues";

const app = express();

// persers

app.use(express.json());
app.use(cors());

// application routes

app.use("/api/products", productRouters);

app.get("/", (req: Request, res: Response) => {
  res.send("book store application is running");
});

export default app;
