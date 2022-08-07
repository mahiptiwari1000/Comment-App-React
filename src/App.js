import { useEffect, useState } from "react";
import "./App.css";
import { AppInsertComment } from "./components";
import { AppComment } from "./components";

function App() {
  const [comments, setComments] = useState(
    JSON.parse(localStorage.getItem("comments")) || []
  );
  const [replies, setReplies] = useState(
    JSON.parse(localStorage.getItem("replies")) || []
  );
  const [asc, setAsc] = useState(true);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem("replies", JSON.stringify(replies));
  }, [replies]);

  return (
    <div className="main-wrapper">
      <AppInsertComment comments={comments} setComments={setComments} />
      <div
        onClick={() => setAsc((prev) => !prev)}
        className="sort-date-and-time"
      >
        Sort By: Date and Time {asc ? "↓" : "↑"}
      </div>
      {comments !== [] && (
        <AppComment
          setComments={setComments}
          comments={comments}
          replies={replies}
          setReplies={setReplies}
          asc={asc}
        />
      )}
    </div>
  );
}

export default App;
