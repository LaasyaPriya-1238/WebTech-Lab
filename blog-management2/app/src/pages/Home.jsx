import { useEffect, useState } from "react";

import PostSummary from "../components/PostSummary.jsx";

function Home({ onViewPost }) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/api/posts"
            );

            const data = await response.json();

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
                Blog Management Application
            </h1>

            <p className="page-subtitle">
                Create, manage and organize your
                blog posts
            </p>

            <h2
                className="page-title"
                style={{ fontSize: "25px" }}
            >
                Recent Posts
            </h2>

            {posts.length === 0 ? (

                <div className="empty-box">
                    No posts available.
                </div>

            ) : (

                posts.map((post) => (

                    <PostSummary
                        key={post._id}
                        post={post}
                        onViewPost={onViewPost}
                    />

                ))

            )}

        </div>
    );
}

export default Home;