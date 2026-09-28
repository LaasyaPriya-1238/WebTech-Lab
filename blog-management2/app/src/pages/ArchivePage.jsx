import {
    useEffect,
    useState
} from "react";

function ArchivePage({ onViewPost }) {

    const [posts, setPosts] =
        useState([]);

    useEffect(() => {

        fetchPosts();

    }, []);

    const fetchPosts = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/api/posts"
            );

            const data =
                await response.json();

            setPosts(data);

        } catch (error) {

            console.error(
                "Error fetching posts:",
                error
            );

        }
    };

    return (
        <div>

            <h1 className="page-title">
                Post Archive
            </h1>

            <p className="page-subtitle">
                Browse all your published posts
            </p>

            {posts.length === 0 ? (

                <div className="empty-box">

                    <p>
                        No posts available.
                    </p>

                </div>

            ) : (

                posts.map((post) => (

                    <div
                        className="card"
                        key={post._id}
                    >

                        <h3>
                            {post.title}
                        </h3>

                        <p>
                            {post.content}
                        </p>

                        <p className="author">
                            Author: {post.author}
                        </p>

                        <button
                            className="primary-button"
                            onClick={() =>
                                onViewPost(
                                    post._id
                                )
                            }
                        >
                            View Post
                        </button>

                    </div>

                ))

            )}

        </div>
    );
}

export default ArchivePage;