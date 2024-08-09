import Express from "express";
import Morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

export default (app: Express.Application) => {
  app.set("trust proxy", 1);

  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://localhost:3000/auth",
        "http://localhost:5005/auth",
        "https://your-domain.com",
      ], // Add your frontend domain here
      credentials: true,
    })
  );

  app.use(Morgan("dev"));
  app.use(Express.json());
  app.use(Express.urlencoded({ extended: true }));
  app.use(cookieParser());
};
