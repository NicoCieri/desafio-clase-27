import express from "express";
import handlebars from "express-handlebars";
import morgan from "morgan";
import passport from "passport";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.js";
import { __dirname } from "./utils.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import viewsRouter from "./routes/views.routes.js";
import userRouter from "./routes/user.routes.js";
import sessionRouter from "./routes/session.routes.js";
import "./passport/jwt-strategy.js";
import "./daos/mongodb/connection.js";

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorHandler);
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(passport.initialize());

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/users", userRouter);
app.use("/", viewsRouter);

app.listen(PORT, () => {
  console.log(`Server ok en puerto ${PORT}`);
});
