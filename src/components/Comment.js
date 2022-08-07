import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import Reply from "./Reply";
import InsertReply from "./InsertReply";
import moment from "moment";

const IndividualComment = (props) => {
  const { comment, toggleInsertReplyBox, setComments } = props;
  const [isEditable, toggleIsEditable] = useState(false);

  return (
    <div className="comment-wrapper" key={comment.commentId}>
      <div className="comment-header">
        <div className="comment-name">{comment.name}</div>
        <div className="comment-date">
          {moment(comment.date).format("Do MMM YYYY")}
        </div>
      </div>
      <div className="comment-body">
        <div
          className={[
            `comment-content ${isEditable ? "comment-content-edit" : ""}`,
          ]}
          contentEditable={isEditable}
        >
          {comment.comment}
        </div>
        <div className="comment-delete">
          <IconButton
            onClick={() => {
              setComments((prev) =>
                prev.filter((cmt) => cmt.commentId !== comment.commentId)
              );
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      <div className="comment-footer">
        <div
          className="comment-reply"
          onClick={() => {
            toggleInsertReplyBox(comment.commentId);
          }}
        >
          Reply
        </div>
        <div
          className="comment-edit"
          onClick={() => {
            toggleIsEditable((prev) => !prev);
          }}
        >
          {isEditable ? "Update" : "Edit"}
        </div>
      </div>
    </div>
  );
};

const AssociatedReplies = (props) => {
  const { replies, setReplies, comment } = props;
  return (
    <div className="associated-replies-container">
      {replies &&
        replies.map((reply) => {
          return (
            <div className="individual-reply-box" key={reply.replyId}>
              {reply.commentId === comment.commentId && (
                <Reply reply={reply} setReplies={setReplies} />
              )}
            </div>
          );
        })}
    </div>
  );
};

function Comment({ comments, replies, setReplies, setComments, asc }) {
  const [showInsertReplyBox, toggleInsertReplyBox] = useState("");

  return (
    <>
      {comments && asc
        ? comments.map((comment) => {
            return (
              <div
                className="comment-reply-association"
                key={comment.commentId}
              >
                <IndividualComment
                  comment={comment}
                  toggleInsertReplyBox={toggleInsertReplyBox}
                  setComments={setComments}
                />
                {showInsertReplyBox === comment.commentId && (
                  <InsertReply
                    replies={replies}
                    setReplies={setReplies}
                    comment={comment}
                  />
                )}
                {replies && (
                  <AssociatedReplies
                    comment={comment}
                    replies={replies}
                    setReplies={setReplies}
                  />
                )}
              </div>
            );
          })
        : comments &&
          comments
            .slice()
            .reverse()
            .map((comment) => {
              return (
                <div
                  className="comment-reply-association"
                  key={comment.commentId}
                >
                  <IndividualComment
                    comment={comment}
                    toggleInsertReplyBox={toggleInsertReplyBox}
                    setComments={setComments}
                  />
                  {showInsertReplyBox === comment.commentId && (
                    <InsertReply
                      replies={replies}
                      setReplies={setReplies}
                      comment={comment}
                    />
                  )}
                  <AssociatedReplies
                    comment={comment}
                    replies={replies}
                    setReplies={setReplies}
                  />
                </div>
              );
            })}
    </>
  );
}

export default Comment;
