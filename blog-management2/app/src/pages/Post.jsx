import {
    useEffect,
    useState
} from "react";

function Post({ postId, onBack }) {

    const [post, setPost] =
        useState(null);

    const [editing, setEditing] =
        useState(false);

    const [title, setTitle] =
        useState("");

    const [content, setContent] =
        useState("");

    const [author, setAuthor] =
        useState("");

    useEffect(() => {

        fetchPost();

    }, [postId]);

    const fetchPost = async () => {

        try {

            const response = await fetch(
                `http://localhost:5000/api/posts/${postId}`
            );

            const data =
                await response.json();

            if (response.ok) {

                setPost(data);

                setTitle(data.title);

                setContent(data.content);

                setAuthor(data.author);

            }

        } catch (error) {

            console.error(
                "Error fetching post:",
                error
            );

        }
    };

    const updatePost = async (event) => {

        event.preventDefault();

        try {

            const response = await fetch(
                `http://localhost:5000/api/posts/${postId}`,
                {
                    method: "PUT",

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
                    "Post updated successfully"
                );

                setEditing(false);

                fetchPost();

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error(
                "Error updating post:",
                error
            );

        }
    };

    const deletePost = async () => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this post?"
            );

        if (!confirmDelete) {
            return;
        }

        try {

            const response = await fetch(
                `http://localhost:5000/api/posts/${postId}`,
                {
                    method: "DELETE"
                }
            );

            const data =
                await response.json();

            if (response.ok) {

                alert(
                    "Post deleted successfully"
                );

                onBack();

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error(
                "Error deleting post:",
                error
            );

        }
    };

    if (!post) {

        return (
            <div className="empty-box">

                <p>
                    Loading post...
                </p>

                <br />

                <button
                    className="secondary-button"
                    onClick={onBack}
                >
                    Back
                </button>

            </div>
        );
    }

    return (
        <div>

            <h1 className="page-title">
                Blog Post
            </h1>

            <p className="page-subtitle">
                View and manage your post
            </p>

            {!editing ? (

                <div className="post-detail">

                    <h1>
                        {post.title}
                    </h1>

                    <p className="content">
                        {post.content}
                    </p>

                    <p className="author">
                        Author: {post.author}
                    </p>

                    <div className="action-row">

                        <button
                            className="secondary-button"
                            onClick={onBack}
                        >
                            Back to Home
                        </button>

                        <button
                            className="edit-button"
                            onClick={() =>
                                setEditing(true)
                            }
                        >
                            Edit
                        </button>

                        <button
                            className="delete-button"
                            onClick={deletePost}
                        >
                            Delete
                        </button>

                    </div>

                </div>

            ) : (

                <div>

                    <h1 className="page-title">
                        Edit Post
                    </h1>

                    <div className="form-card">

                        <form
                            onSubmit={updatePost}
                        >

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
                                    Save Changes
                                </button>

                                <button
                                    className="secondary-button"
                                    type="button"
                                    onClick={() =>
                                        setEditing(false)
                                    }
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Post;