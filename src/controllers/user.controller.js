import UserService from "../services/user.services.js";
import { createResponse } from "../utils.js";
import Controller from "./class.controller.js";

const userService = new UserService();
export default class UserController extends Controller {
  constructor() {
    super(userService);
  }

  register = async (req, res, next) => {
    try {
      const newUser = await userService.register(req.body);

      if (!newUser)
        createResponse(res, 400, { error: "User or password already exists" });
      else createResponse(res, 200, newUser);
    } catch (error) {
      next(error.message);
    }
  };

  login = async (req, res, next) => {
    try {
      const token = await userService.login(req.body);

      res.cookie("token", token, { httpOnly: true });
      createResponse(res, 200, { token });
    } catch (error) {
      next(error.message);
    }
  };

  registerFront = async (req, res, next) => {
    try {
      const newUser = await userService.register(req.body);

      if (!newUser) res.redirect("/error-register");
      else res.redirect("/login?registerSuccessful=true");
    } catch (error) {
      next(error.message);
    }
  };

  loginFront = async (req, res, next) => {
    try {
      const token = await userService.login(req.body);

      if (!token) return res.redirect("/error-login");

      res.cookie("token", token, { httpOnly: true });
      res.redirect("/products?loginSuccessful=true");
    } catch (error) {
      next(error.message);
    }
  };

  logout = (req, res) => {
    res.clearCookie("token");
  };

  logoutFront = (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
  };
}
