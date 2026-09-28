function PostSummary({ post, onViewPost }) {
    return (
        <div className="card">

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
                    onViewPost(post._id)
                }
            >
                View Post
            </button>

        </div>
    );
}

export default PostSummary;