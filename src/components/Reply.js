import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import moment from "moment";

function Reply({ reply, replies, setReplies, comment }) {
  const [isReplyEditable, toggleReplyEditable] = useState(false);

  return (
    <>
      <div className="reply-wrapper">
        <div className="reply-header">
          <div className="reply-name">{reply.name}</div>
          <div className="reply-date">
            {moment(reply.date).format("Do MMM YYYY")}
          </div>
        </div>
        <div className="reply-body">
          <div
            className={`reply-content ${
              isReplyEditable ? "reply-content-edit" : ""
            }`}
            contentEditable={isReplyEditable}
          >
            {reply.reply}
          </div>
          <div className="reply-delete">
            <IconButton
              onClick={() =>
                setReplies((prev) =>
                  prev.filter((rep) => rep.replyId !== reply.replyId)
                )
              }
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        <div className="reply-footer">
          <div
            className="reply-edit"
            onClick={() => toggleReplyEditable((prev) => !prev)}
          >
            {isReplyEditable ? "Update" : "Edit"}
          </div>
        </div>
      </div>
    </>
  );
}

export default Reply;
