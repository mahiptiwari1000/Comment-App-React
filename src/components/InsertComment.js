import React from "react";
import { useState } from "react";
import { v4 } from "uuid";
import moment from "moment";

function InsertComment({ comments, setComments }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handlePostButtonClick = () => {
    const commentId = v4();
    setComments([...comments, { name, comment, commentId, date: moment() }]);
    setComment("");
    setName("");
  };

  return (
    <>
      <div className="container">
        <div className="title">Comment</div>
        <div className="name-box">
          <input
            type="text"
            placeholder="Name"
            className="input-box"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="comment-box">
          <input
            type="text"
            placeholder="Comment"
            className="input-box"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            style={{ height: "10vh" }}
          />
        </div>
        <div className="post-button">
          <button
            className="post-btn"
            onClick={handlePostButtonClick}
            disabled={!name.length || !comment.length}
          >
            POST
          </button>
        </div>
      </div>
    </>
  );
}

export default InsertComment;
