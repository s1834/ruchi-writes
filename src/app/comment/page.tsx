"use client";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useRouter } from "next/router";

interface Reply {
  name: string;
  email: string;
  guest: boolean;
  randomPic: string;
  text: string;
  date: string;
  replyLikeCount: number;
  parentComment: string;
  replies: Reply[];
}

interface Comment {
  id: string;
  blogId: string;
  name: string;
  email: string;
  guest: boolean;
  randomPic: string;
  content: string;
  date: string;
  commentLikeCount: number;
  parentComment: string | null;
  replies: Reply[];
}

export default function CommentSection({ blogId }: { blogId: string }) {
  
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set());
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/comments?blogId=${blogId}`
        );
        const data = await response.json();
        setComments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [blogId]);

  const addComment = () => {
    if (newComment.trim()) {
      const newCommentData: Comment = {
        id: (comments.length + 1).toString(),
        blogId,
        name: "You",
        email: "you@example.com",
        guest: true,
        randomPic: "https://source.unsplash.com/random/50x50",
        content: newComment,
        date: new Date().toISOString(),
        commentLikeCount: 0,
        parentComment: null,
        replies: [],
      };
      setComments([...comments, newCommentData]);
      setNewComment("");
    }
  };

  const addReply = (parentId: string) => {
    if (replyText[parentId]?.trim()) {
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === parentId || comment.replies.some((r) => r.parentComment === parentId)
            ? {
                ...comment,
                replies: [
                  ...comment.replies,
                  {
                    name: "You",
                    email: "you@example.com",
                    guest: true,
                    randomPic: "https://source.unsplash.com/random/50x50",
                    text: replyText[parentId],
                    date: new Date().toISOString(),
                    replyLikeCount: 0,
                    parentComment: parentId,
                    replies: [],
                  },
                ],
              }
            : comment
        )
      );
      setReplyText({ ...replyText, [parentId]: "" });
      setActiveReplyId(null);
    }
  };

  const toggleReplies = (commentId: string) => {
    setExpandedReplies((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  const toggleLike = (id: string, isReply: boolean = false, parentId?: string) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (isReply) {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.parentComment === id
                  ? { ...reply, replyLikeCount: reply.replyLikeCount + 1 }
                  : reply
              ),
            };
          }
          return comment;
        } else if (comment.id === id) {
          return { ...comment, commentLikeCount: comment.commentLikeCount + 1 };
        }
        return comment;
      })
    );
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h3 className="font-bold text-lg mb-4 text-gray-700">Comments</h3>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-3">
            <img
              src={comment.randomPic}
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-700">{comment.name}</p>
                <span className="text-sm text-gray-500">
                  {new Date(comment.date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <p className="text-gray-700 flex-1">{comment.content}</p>
                <div
                  onClick={() => toggleLike(comment.id)}
                  className="flex items-center text-red-500 hover:text-red-800 cursor-pointer"
                >
                  {comment.commentLikeCount > 0 ? <FaHeart /> : <FaRegHeart />}
                  {comment.commentLikeCount > 0 && (
                    <span className="ml-1">{comment.commentLikeCount}</span>
                  )}
                </div>
              </div>
              <div className="mt-2 text-sm">
                <button
                  onClick={() => setActiveReplyId(comment.id)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Reply
                </button>
                {comment.replies.length > 0 && (
                  <button
                    onClick={() => toggleReplies(comment.id)}
                    className="ml-4 text-blue-500 hover:underline"
                  >
                    {expandedReplies.has(comment.id)
                      ? "Hide Replies"
                      : `View Replies (${comment.replies.length})`}
                  </button>
                )}
              </div>
              {expandedReplies.has(comment.id) && (
                <div className="mt-3 space-y-2">
                  {comment.replies.map((reply, index) => (
                    <div key={index} className="ml-6 flex items-start space-x-2">
                      <img
                        src={reply.randomPic}
                        alt="Reply User"
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="bg-gray-100 p-2 rounded-lg flex-1">
                        <div className="flex justify-between items-center">
                          <p className="font-semibold text-gray-700">
                            {reply.name}
                          </p>
                          <div
                            onClick={() =>
                              toggleLike(reply.parentComment, true, comment.id)
                            }
                            className="flex items-center text-red-500 hover:text-red-800 cursor-pointer mt-1"
                          >
                            {reply.replyLikeCount > 0 ? <FaHeart /> : <FaRegHeart />}
                            {reply.replyLikeCount > 0 && (
                              <span className="ml-1">{reply.replyLikeCount}</span>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-700">{reply.text}</p>
                        <div className="mt-2 text-sm">
                          <button
                            onClick={() => setActiveReplyId(reply.parentComment)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            Reply
                          </button>
                        </div>
                        {activeReplyId === reply.parentComment && (
                          <div className="mt-3">
                            <input
                              type="text"
                              placeholder="Write a reply..."
                              value={replyText[reply.parentComment] || ""}
                              onChange={(e) =>
                                setReplyText((prev) => ({
                                  ...prev,
                                  [reply.parentComment]: e.target.value,
                                }))
                              }
                              className="w-full border border-gray-300 rounded-lg p-2 text-sm text-black focus:outline-none"
                            />
                            <button
                              onClick={() => addReply(reply.parentComment)}
                              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"
                            >
                              Post Reply
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeReplyId === comment.id && (
                <div className="mt-3">
                  <input
                    type="text"
                    placeholder="Write a reply..."
                    value={replyText[comment.id] || ""}
                    onChange={(e) =>
                      setReplyText((prev) => ({
                        ...prev,
                        [comment.id]: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm text-black focus:outline-none"
                  />
                  <button
                    onClick={() => addReply(comment.id)}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"
                  >
                    Post Reply
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 text-sm text-black focus:outline-none w-full"
        />
        <button
          onClick={addComment}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"
        >
          Post
        </button>
      </div>
    </div>
  );
}


