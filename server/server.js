import express from "express";
import route from "./routes/route.js";
import session from "express-session";
import dotenv from "dotenv";
import cors from 'cors';
dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true 
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
  name: "sid", // important (stable cookie name)
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,          // true ONLY if HTTPS
    httpOnly: true,
    sameSite: "lax",        // 🔑 REQUIRED
    maxAge: 24 * 60 * 60 * 1000
  }
}));


app.use("/", route);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
