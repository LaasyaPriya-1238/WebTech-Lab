import "./loadEnvironment.mjs";

import express from "express";
import cors from "cors";

import { connectToDatabase } from "./db/conn.mjs";
import postRoutes from "./routes/posts.mjs";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Blog API is running");
});

app.use("/api/posts", postRoutes);

connectToDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Server could not start:", error);
    });