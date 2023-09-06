import passport from "passport";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import UserDao from "../daos/mongodb/user.dao.js";
import { PRIVATE_KEY } from "../config.js";

const userDao = new UserDao();

const verifyToken = async (jwt_payload, done) => {
  const user = await userDao.getById(jwt_payload.userId);
  if (!user) return done(null, false);
  return done(null, user);
};

const cookieExtractor = (req) => req.cookies.token;

const strategyOptionsCookies = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: PRIVATE_KEY,
};

passport.use("current", new jwtStrategy(strategyOptionsCookies, verifyToken));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userDao.getById(id);
  return done(null, user);
});
