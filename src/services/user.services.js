import "dotenv/config";
import jwt from "jsonwebtoken";
import UserDao from "../daos/mongodb/user.dao.js";
import Services from "./class.services.js";
import { PRIVATE_KEY } from "../config.js";

const userDao = new UserDao();

export default class UserService extends Services {
  constructor() {
    super(userDao);
  }

  #generateToken(user) {
    const payload = {
      userId: user.id,
    };
    return jwt.sign(payload, PRIVATE_KEY, { expiresIn: "10m" });
  }

  async register(user) {
    try {
      return await userDao.register(user);
    } catch (error) {
      console.log(error);
    }
  }

  async login(user) {
    try {
      const userExist = await userDao.login(user);
      return userExist ? this.#generateToken(userExist) : false;
    } catch (error) {
      console.log(error);
    }
  }
}
