import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import router from './MVC/routes/router.js';

import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

const uploadsPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
}

app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/api", router);  // <-- router should be used before listening
app.use("/uploads", express.static(uploadsPath));


const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

mongoose
    .connect(MONGOURL)
    .then(() => {
        console.log('MongoDB connected!');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello from Express!');
});
