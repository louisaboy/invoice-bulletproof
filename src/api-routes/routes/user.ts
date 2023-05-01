import { Router, Request, Response } from "express";
import middlewares from "../middlewares";

const route = Router();

export default (app: Router) => {
  app.use("/users", route);

  route.get(
    "/me",
    // middlewares.isAuth,
    // middlewares.attachCurrentUser,
    // (req: Request, res: Response) => {
    //   res.send("I'm Here");
    //   return res.status(200).json({ user: req.currentUser });
    // }
    (req, res) => {
      console.log("Hello I'm here");
      res.send("Sending Again here");
    }
  );
};
