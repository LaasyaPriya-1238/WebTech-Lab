import { useState } from "react";

function Create({ onPostCreated }) {

    const [title, setTitle] = useState("");

    const [content, setContent] =
        useState("");

    const [author, setAuthor] =
        useState("");

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:5000/api/posts",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        title,
                        content,
                        author
                    })
                }
            );

            const data =
                await response.json();

            if (response.ok) {

                alert(
                    "Post created successfully"
                );

                setTitle("");
                setContent("");
                setAuthor("");

                onPostCreated();

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error(
                "Error creating post:",
                error
            );

            alert(
                "Failed to create post"
            );
        }
    };

    return (
        <div>

            <h1 className="page-title">
                Create New Post
            </h1>

            <p className="page-subtitle">
                Share your thoughts with the world
            </p>

            <div className="form-card">

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>
                            Title
                        </label>

                        <input
                            className="form-input"
                            type="text"
                            value={title}
                            onChange={(event) =>
                                setTitle(
                                    event.target.value
                                )
                            }
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Content
                        </label>

                        <textarea
                            className="form-textarea"
                            value={content}
                            onChange={(event) =>
                                setContent(
                                    event.target.value
                                )
                            }
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Author
                        </label>

                        <input
                            className="form-input"
                            type="text"
                            value={author}
                            onChange={(event) =>
                                setAuthor(
                                    event.target.value
                                )
                            }
                            required
                        />

                    </div>

                    <div className="form-actions">

                        <button
                            className="primary-button"
                            type="submit"
                        >
                            Create Post
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default Create;