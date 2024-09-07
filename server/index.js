import express from 'express'
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from './db/connetDB.js';
import authRouter from './routes/authRoutes.js';

dotenv.config()

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies

app.use('/api/auth', authRouter)

const PORT = process.env.PORT

app.listen(PORT, () => {
    connectDB()
    console.log("Server started on port:", +PORT)
})