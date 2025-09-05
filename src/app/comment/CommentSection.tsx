// @ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import { ICommentTree } from "@/types/shared";

// --- Props Interfaces ---
// interface CommentFormProps {
//   blogId: string;
//   parentId?: string | null;
//   onCommentPosted: () => void;
//   setShowReplyForm?: (show: boolean) => void;
// }

// interface CommentItemProps {
//   comment: ICommentTree;
//   blogId: string;
//   onReplyPosted: () => void;
// }

// interface CommentSectionProps {
//   blogId: string;
// }

// --- Time Formatting Helper ---
// @ts-ignore
const timeAgo = (date) => {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
};

// --- Reusable Comment Form Component ---
// @ts-ignore
const CommentForm = ({
  blogId,
  parentId = null,
  onCommentPosted,
  setShowReplyForm,
}) => {
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // @ts-ignore
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blogId,
          content: content.trim(),
          parentComment: parentId,
          name: name.trim() || null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }

      setContent("");
      setName("");
      if (setShowReplyForm) setShowReplyForm(false); // Hide form on successful reply
      onCommentPosted(); // Trigger refetch
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("There was an error posting your comment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      {/* Name input field - always visible and optional */}
      <div className="space-y-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (optional)"
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-neutral-800 dark:border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
        />
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={parentId ? "Write a reply..." : "Add a public comment..."}
        className="w-full p-3 border border-gray-300 rounded-md dark:bg-neutral-800 dark:border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-vertical min-h-[80px]"
        rows={3}
        required
      />
      <div className="flex justify-end gap-2 mt-2">
        {setShowReplyForm && (
          <button
            type="button"
            onClick={() => setShowReplyForm(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-neutral-700 dark:text-gray-300 dark:hover:bg-neutral-600"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
        >
          {isSubmitting ? "Posting..." : parentId ? "Post Reply" : "Comment"}
        </button>
      </div>
    </form>
  );
};

// --- Recursive Component for a Single Comment and its Replies ---
// @ts-ignore
const CommentItem = ({ comment, blogId, onReplyPosted }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(true);

  const hasReplies = comment.replies && comment.replies.length > 0;

  return (
    <div className="flex items-start space-x-3 py-3">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-gray-200 dark:bg-neutral-700 rounded-full flex items-center justify-center font-bold text-gray-600 dark:text-gray-400">
          {comment.name.charAt(0).toUpperCase()}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <p className="font-semibold text-gray-800 dark:text-gray-200">
            {comment.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {timeAgo(comment.createdAt)}
          </p>
        </div>
        <p className="mt-1 text-gray-700 dark:text-gray-300">
          {comment.content}
        </p>
        <div className="mt-2 flex items-center space-x-4">
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Reply
          </button>

          {hasReplies && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 flex items-center space-x-1"
            >
              <span>{showReplies ? "▼" : "▶"}</span>
              <span>
                {showReplies ? "Hide" : "Show"} {comment.replies.length}{" "}
                {comment.replies.length === 1 ? "reply" : "replies"}
              </span>
            </button>
          )}
        </div>

        {showReplyForm && (
          <CommentForm
            blogId={blogId}
            parentId={comment._id.toString()}
            onCommentPosted={onReplyPosted}
            setShowReplyForm={setShowReplyForm}
          />
        )}

        {hasReplies && showReplies && (
          <div className="mt-3 pl-4 border-l-2 border-gray-200 dark:border-neutral-700">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply._id.toString()}
                comment={reply}
                blogId={blogId}
                onReplyPosted={onReplyPosted}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main Component to Display All Comments ---
export default function CommentSection({ blogId }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/comments?blogId=${blogId}`);
      if (!response.ok) throw new Error("Failed to fetch comments");
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white rounded-lg shadow-sm dark:bg-neutral-800/50">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
        Comments
      </h3>
      <CommentForm blogId={blogId} onCommentPosted={fetchComments} />

      <div className="mt-6">
        {isLoading ? (
          <p className="text-gray-500 dark:text-gray-400">
            Loading comments...
          </p>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem
              key={comment._id.toString()}
              comment={comment}
              blogId={blogId}
              onReplyPosted={fetchComments}
            />
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            Be the first to comment.
          </p>
        )}
      </div>
    </div>
  );
}

// "use client";
// import React, { useEffect, useState, useCallback, FC, FormEvent } from "react";

// // --- TYPES ---
// interface CommentType {
//   _id: string;
//   blogId: string;
//   name: string;
//   content: string;
//   date: string;
//   commentLikeCount: number;
//   replies: CommentType[];
//   parentComment?: string;
// }

// // --- API HELPER ---
// const postComment = async (
//   blogId: string,
//   content: string,
//   parentComment?: string
// ) => {
//   const response = await fetch("/api/comments", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ blogId, content, parentComment }),
//   });
//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || "Failed to post comment");
//   }
//   return response.json();
// };

// // --- REPLY FORM COMPONENT ---
// interface ReplyFormProps {
//   blogId: string;
//   parentId: string;
//   onCommentPosted: () => void;
//   onCancel: () => void;
// }
// const ReplyForm: FC<ReplyFormProps> = ({
//   blogId,
//   parentId,
//   onCommentPosted,
//   onCancel,
// }) => {
//   const [replyText, setReplyText] = useState("");
//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     if (replyText.trim()) {
//       try {
//         await postComment(blogId, replyText, parentId);
//         setReplyText("");
//         onCommentPosted();
//       } catch (error) {
//         console.error("Failed to submit reply:", error);
//         alert("Could not post reply. Please try again.");
//       }
//     }
//   };
//   return (
//     <form onSubmit={handleSubmit} className="mt-3">
//       <textarea
//         placeholder="Write a reply..."
//         value={replyText}
//         onChange={(e) => setReplyText(e.target.value)}
//         className="w-full border border-gray-300 dark:border-neutral-700 rounded-lg p-2 text-sm text-black dark:text-white bg-white dark:bg-neutral-800 focus:outline-none"
//         rows={2}
//       />
//       <div className="flex gap-2 mt-2">
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600"
//         >
//           Post Reply
//         </button>
//         <button
//           type="button"
//           onClick={onCancel}
//           className="bg-gray-200 dark:bg-neutral-700 text-black dark:text-white px-3 py-1 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-neutral-600"
//         >
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// };

// // --- SINGLE COMMENT ITEM (RECURSIVE) ---
// interface CommentItemProps {
//   comment: CommentType;
//   blogId: string;
//   onCommentPosted: () => void;
// }
// const CommentItem: FC<CommentItemProps> = ({
//   comment,
//   blogId,
//   onCommentPosted,
// }) => {
//   const [isReplying, setIsReplying] = useState(false);

//   return (
//     <div className="flex items-start space-x-3">
//       <img
//         src={`https://source.unsplash.com/random/50x50?sig=${comment._id}`}
//         alt="User avatar"
//         className="w-10 h-10 rounded-full"
//       />
//       <div className="flex-1">
//         <div className="flex items-center gap-2">
//           <p className="font-semibold text-gray-800 dark:text-gray-200">
//             {comment.name}
//           </p>
//           <p className="text-xs text-gray-500 dark:text-gray-400">
//             {new Date(comment.date).toLocaleDateString()}
//           </p>
//         </div>
//         <p className="text-gray-700 dark:text-gray-300 mt-1">
//           {comment.content}
//         </p>
//         <div className="mt-2 text-sm">
//           <button
//             onClick={() => setIsReplying(!isReplying)}
//             className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-semibold"
//           >
//             Reply
//           </button>
//         </div>
//         {isReplying && (
//           <ReplyForm
//             blogId={blogId}
//             parentId={comment._id}
//             onCommentPosted={() => {
//               setIsReplying(false);
//               onCommentPosted();
//             }}
//             onCancel={() => setIsReplying(false)}
//           />
//         )}
//         <div className="mt-4 space-y-4 pl-4 border-l-2 border-gray-200 dark:border-neutral-700">
//           {comment.replies?.map((reply) => (
//             <CommentItem
//               key={reply._id}
//               comment={reply}
//               blogId={blogId}
//               onCommentPosted={onCommentPosted}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- MAIN COMMENT SECTION CONTAINER ---
// export default function CommentSection({ blogId }: { blogId: string }) {
//   const [comments, setComments] = useState<CommentType[]>([]);
//   const [newComment, setNewComment] = useState("");
//   const [error, setError] = useState<string | null>(null);

//   const fetchComments = useCallback(async () => {
//     if (!blogId) return;
//     try {
//       setError(null);
//       const response = await fetch(`/api/comments?blogId=${blogId}`);
//       if (!response.ok) throw new Error("Failed to fetch comments");
//       const data = await response.json();
//       setComments(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("Error fetching comments:", err);
//       setError("Could not load comments. Please try refreshing the page.");
//     }
//   }, [blogId]);

//   useEffect(() => {
//     fetchComments();
//   }, [fetchComments]);

//   const handleAddComment = async (e: FormEvent) => {
//     e.preventDefault();
//     if (newComment.trim()) {
//       try {
//         await postComment(blogId, newComment);
//         setNewComment("");
//         await fetchComments();
//       } catch (err) {
//         console.error("Failed to post comment:", err);
//         alert("Could not post comment. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="p-4 max-w-2xl mx-auto">
//       <h3 className="font-bold text-xl mb-4 text-gray-800 dark:text-gray-200">
//         Join the Conversation
//       </h3>
//       <form onSubmit={handleAddComment} className="mb-6">
//         <textarea
//           placeholder="Add a public comment..."
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           className="w-full border border-gray-300 dark:border-neutral-700 rounded-lg p-2 text-sm text-black dark:text-white bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           rows={3}
//         />
//         <button
//           type="submit"
//           className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:bg-gray-400"
//           disabled={!newComment.trim()}
//         >
//           Post Comment
//         </button>
//       </form>
//       {error && <p className="text-red-500 text-center">{error}</p>}
//       <div className="space-y-6">
//         {comments.map((comment) => (
//           <CommentItem
//             key={comment._id}
//             comment={comment}
//             blogId={blogId}
//             onCommentPosted={fetchComments}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
