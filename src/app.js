
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import path from "path"
import MongoStore from "connect-mongo"
import "./passport"
import { localsMiddleware } from "./middlewares";
import userRouter from "./routers/userRouter"; // router 를 default로 export하지않았기떄문에 이렇게 한다.
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import apiRouter from "./routers/apiRouter";
import imageRouter from "./routers/imageRouter";
import postingRouter from "./routers/postingRouter";

const app = express(); // init 에 전달할 app 
const CookieStore = MongoStore(session);

app.use(helmet());
app.set("view engine","pug"); // express 뷰엔진 세팅
app.set("views",path.join(__dirname,"views"))
app.use("/static", express.static(path.join(__dirname,"static")))
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(morgan("dev"))
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store : new CookieStore({mongooseConnection: mongoose.connection})
    //서버가 재시작되어도 쿠키를 가지고있음. 로그인세션을 유지할수있음.
}));

app.use(passport.initialize());
app.use(passport.session());




app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.posting, postingRouter);
app.use(routes.image,imageRouter);
app.use(routes.users, userRouter);
app.use(routes.api, apiRouter);



export default app; // appjs 를 init.js에서 이용할거임