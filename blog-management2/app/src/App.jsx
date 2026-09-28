import { useState } from "react";

import Home from "./pages/Home.jsx";
import Create from "./pages/Create.jsx";
import Post from "./pages/Post.jsx";
import ArchivePage from "./pages/ArchivePage.jsx";

import "./App.css";

function App() {
    const [page, setPage] = useState("home");

    const [selectedPostId, setSelectedPostId] =
        useState(null);

    const openPost = (id) => {
        setSelectedPostId(id);

        setPage("post");
    };

    return (
        <div className="app">

            <nav className="navbar">

                <div className="logo">
                    ✦ Blog Manager
                </div>

                <div className="nav-buttons">

                    <button
                        className={`nav-button ${
                            page === "home"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            setPage("home")
                        }
                    >
                        Home
                    </button>

                    <button
                        className={`nav-button ${
                            page === "create"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            setPage("create")
                        }
                    >
                        Create Post
                    </button>

                    <button
                        className={`nav-button ${
                            page === "archive"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            setPage("archive")
                        }
                    >
                        Archive
                    </button>

                </div>

            </nav>

            <main className="page-container">

                {page === "home" && (
                    <Home
                        onViewPost={openPost}
                    />
                )}

                {page === "create" && (
                    <Create
                        onPostCreated={() =>
                            setPage("home")
                        }
                    />
                )}

                {page === "post" && (
                    <Post
                        postId={selectedPostId}
                        onBack={() =>
                            setPage("home")
                        }
                    />
                )}

                {page === "archive" && (
                    <ArchivePage
                        onViewPost={openPost}
                    />
                )}

            </main>

        </div>
    );
}

export default App;