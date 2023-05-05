import invoice from "./routes/invoice";
import { Router } from "express";

export default () => {
  const app = Router();

  invoice(app);

  return app;
};
