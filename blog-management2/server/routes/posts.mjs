import express from "express";
import { ObjectId } from "mongodb";

import { getDatabase } from "../db/conn.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const db = getDatabase();

        const posts = await db
            .collection("posts")
            .find()
            .toArray();

        res.json(posts);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch posts"
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const db = getDatabase();

        const post = await db
            .collection("posts")
            .findOne({
                _id: new ObjectId(req.params.id)
            });

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.json(post);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch post"
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const db = getDatabase();

        const { title, content, author } = req.body;

        const newPost = {
            title,
            content,
            author,
            createdAt: new Date()
        };

        const result = await db
            .collection("posts")
            .insertOne(newPost);

        res.status(201).json({
            message: "Post created successfully",
            postId: result.insertedId
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create post"
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const db = getDatabase();

        const { title, content, author } = req.body;

        const result = await db
            .collection("posts")
            .updateOne(
                {
                    _id: new ObjectId(req.params.id)
                },
                {
                    $set: {
                        title,
                        content,
                        author,
                        updatedAt: new Date()
                    }
                }
            );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.json({
            message: "Post updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update post"
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const db = getDatabase();

        const result = await db
            .collection("posts")
            .deleteOne({
                _id: new ObjectId(req.params.id)
            });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.json({
            message: "Post deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Post deleted successfully"
        });
    }
});

export default router;