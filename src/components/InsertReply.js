import moment from "moment";
import React from "react";
import { useState } from "react";
import { v4 } from "uuid";

function InsertReply({ replies, setReplies, comment }) {
  const [name, setName] = useState("");
  const [reply, setReply] = useState("");

  const handlePostButtonClick = () => {
    setReplies([
      ...replies,
      {
        reply,
        name,
        commentId: comment.commentId,
        replyId: v4(),
        date: moment(),
      },
    ]);
    setName("");
    setReply("");
  };

  return (
    <div className="container">
      <div className="title">Reply</div>
      <div className="name-box">
        <input
          type="text"
          placeholder="Name"
          className="input-box"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div className="reply-box">
        <input
          type="text"
          placeholder="Reply"
          className="input-box"
          onChange={(e) => setReply(e.target.value)}
          value={reply}
          style={{ height: "10vh" }}
        />
      </div>
      <div className="post-button">
        <button
          className="post-btn"
          onClick={handlePostButtonClick}
          disabled={!name.length || !reply.length}
        >
          POST
        </button>
      </div>
    </div>
  );
}

export default InsertReply;
