// "use client";

// import { useState } from "react";
// import { FaHeart, FaRegHeart, FaUserCircle } from "react-icons/fa";

// interface Comment {
//   id: number;
//   username: string;
//   text: string;
//   timestamp: string;
//   replies: string[];
//   liked: boolean;
// }

// export default function CommentSection() {
//   const [comments, setComments] = useState<Comment[]>([
//     {
//       id: 1,
//       username: "james_olesenn",
//       text: "Hmm, This poster looks cool and very inspiring. Would love to see more designs like this in the future!",
//       timestamp: "2 days ago",
//       replies: [],
//       liked: false,
//     },
//     {
//       id: 2,
//       username: "olan_sams",
//       text: "Loving your work and profile!",
//       timestamp: "3 days ago",
//       replies: [],
//       liked: false,
//     },
//     {
//       id: 3,
//       username: "rashida_jones",
//       text: "Really cool! Which filter are you using?",
//       timestamp: "3 days ago",
//       replies: [],
//       liked: false,
//     },
//   ]);

//   const [newComment, setNewComment] = useState("");
//   const [activeReplyId, setActiveReplyId] = useState<number | null>(null);
//   const [replyText, setReplyText] = useState<{ [key: number]: string }>({});
//   const [expandedComments, setExpandedComments] = useState<Set<number>>(
//     new Set()
//   );

//   const addComment = () => {
//     if (newComment.trim()) {
//       setComments([
//         ...comments,
//         {
//           id: comments.length + 1,
//           username: "you",
//           text: newComment,
//           timestamp: "Just now",
//           replies: [],
//           liked: false,
//         },
//       ]);
//       setNewComment("");
//     }
//   };

//   const toggleLike = (commentId: number) => {
//     setComments((prevComments) =>
//       prevComments.map((comment) =>
//         comment.id === commentId
//           ? { ...comment, liked: !comment.liked }
//           : comment
//       )
//     );
//   };

//   const handleReplyClick = (commentId: number) => {
//     setActiveReplyId((prevId) => (prevId === commentId ? null : commentId));
//   };

//   const addReply = (commentId: number) => {
//     if (replyText[commentId]?.trim()) {
//       setComments(
//         comments.map((comment) =>
//           comment.id === commentId
//             ? {
//                 ...comment,
//                 replies: [...comment.replies, replyText[commentId]],
//               }
//             : comment
//         )
//       );
//       setReplyText({ ...replyText, [commentId]: "" });
//       setActiveReplyId(null);
//     }
//   };

//   const toggleReadMore = (commentId: number) => {
//     setExpandedComments((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(commentId)) {
//         newSet.delete(commentId);
//       } else {
//         newSet.add(commentId);
//       }
//       return newSet;
//     });
//   };

//   return (
//     <div className="p-4 max-w-lg mx-auto bg-transparent">
//       <h3 className="font-bold text-lg mb-4 text-gray-500">Comments</h3>
//       <div className="space-y-4">
//         {comments.map((comment) => (
//           <div key={comment.id} className="flex items-start space-x-3">
//             <FaUserCircle className="text-gray-400 text-3xl" />
//             <div className="flex-1">
//               <div className="flex justify-between items-center">
//                 <p className="font-semibold text-white-300">{comment.username}</p>
//                 <span className="text-sm text-gray-500">
//                   {comment.timestamp}
//                 </span>
//               </div>
//               <p className="text-white-300 mt-1">
//                 {expandedComments.has(comment.id) || comment.text.length <= 100
//                   ? comment.text
//                   : `${comment.text.slice(0, 100)}... `}
//                 {comment.text.length > 100 && (
//                   <button
//                     onClick={() => toggleReadMore(comment.id)}
//                     className="text-blue-500 hover:underline text-sm"
//                   >
//                     {expandedComments.has(comment.id) ? "Read Less" : "Read More"}
//                   </button>
//                 )}
//               </p>
//               <div className="mt-2 flex justify-between items-center text-sm">
//                 <div className="space-x-4 text-gray-500">
//                   <button
//                     onClick={() => handleReplyClick(comment.id)}
//                     className="hover:text-gray-700"
//                   >
//                     Reply
//                   </button>
//                   <button className="hover:text-gray-700">Translate</button>
//                 </div>
//                 <div
//                   className="flex items-center text-red-500 hover:text-red-800 cursor-pointer justify-center p-1"
//                   onClick={() => toggleLike(comment.id)}
//                 >
//                   {comment.liked ? (
//                    <FaHeart
//                    className="text-red-600"
//                    style={{
//                      width: '24px',
//                      height: '24px',
//                      display: 'inline-block',
//                      verticalAlign: 'middle',
//                    }}
//                  />
                 
//                   ) : (
//                     <FaRegHeart />
//                   )}
//                 </div>
//               </div>
//               {activeReplyId === comment.id && (
//                 <div className="mt-3">
//                   <input
//                     type="text"
//                     placeholder="Write a reply..."
//                     value={replyText[comment.id] || ""}
//                     onChange={(e) =>
//                       setReplyText((prev) => ({
//                         ...prev,
//                         [comment.id]: e.target.value,
//                       }))
//                     }
//                     className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none"
//                   />
//                   <button
//                     onClick={() => addReply(comment.id)}
//                     className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"
//                   >
//                     Post Reply
//                   </button>
//                 </div>
//               )}
//               {comment.replies.length > 0 && (
//                 <div className="mt-3 space-y-2">
//                   {comment.replies.map((reply, index) => (
//                     <div
//                       key={index}
//                       className="ml-6 bg-gray-100 p-2 rounded-lg text-gray-700 text-sm"
//                     >
//                       {reply}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="mt-4 flex items-center space-x-2">
//       <input
//   type="text"
//   placeholder="Add a comment..."
//   value={newComment}
//   onChange={(e) => setNewComment(e.target.value)}
//   className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none w-96"
// />

//         <button
//           onClick={addComment}
//           className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"
//         >
//           Post
//         </button>
//       </div>
//     </div>
//   );
// }





import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaUserCircle } from "react-icons/fa";

// Comment schema based on the database structure
interface Reply {
  name: string;
  email: string;
  guest: boolean;
  randomPic: string;
  text: string;
  date: string;
  replyLikeCount: number;
  parentComment: string; // Parent comment ID reference
  replies: string[]; // Replies are nested
}

interface Comment {
  id: string; // Use string since MongoDB uses ObjectId for referencing
  blogId: string; // Reference to the blog post
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
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchComments = async () => {
      if (blogId) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/comments?blogId=${blogId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch comments");
          }
          const data = await response.json();
          console.log(data);
          setComments(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      }
    };
    fetchComments();
  }, [blogId]);

  // Add a new comment
  const addComment = () => {
    if (newComment.trim()) {
      const newCommentData: Comment = {
        id: (comments.length + 1).toString(),
        blogId,
        name: "you",
        email: "you@example.com",
        guest: true,
        randomPic: "https://images.unsplash.com/photo-1475874619827-b5f0310b6e6f?q=80&w=4000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

  // Like a comment
  const toggleLike = (commentId: string) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, commentLikeCount: comment.commentLikeCount + 1 }
          : comment
      )
    );
  };

  // Handle reply click
  const handleReplyClick = (commentId: string) => {
    setActiveReplyId((prevId) => (prevId === commentId ? null : commentId));
  };

  // Add a reply to a comment
  const addReply = (commentId: string) => {
    if (replyText[commentId]?.trim()) {
      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                replies: [
                  ...comment.replies,
                  {
                    name: "you",
                    email: "you@example.com",
                    guest: true,
                    randomPic: "https://images.unsplash.com/photo-1475874619827-b5f0310b6e6f?q=80&w=4000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    text: replyText[commentId],
                    date: new Date().toISOString(),
                    replyLikeCount: 0,
                    parentComment: commentId,
                    replies: [],
                  },
                ],
              }
            : comment
        )
      );
      setReplyText({ ...replyText, [commentId]: "" });
      setActiveReplyId(null);
    }
  };

  // Toggle read more for comment content
  const toggleReadMore = (commentId: string) => {
    setExpandedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-transparent">
      <h3 className="font-bold text-lg mb-4 text-gray-500">Comments</h3>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-3">
            <FaUserCircle className="text-gray-400 text-3xl" />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-white-300">{comment.name}</p>
                <span className="text-sm text-gray-500">
                  {new Date(comment.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-white-300 mt-1">
                {expandedComments.has(comment.id) || comment.content.length <= 100
                  ? comment.content
                  : `${comment.content.slice(0, 100)}... `}
                {comment.content.length > 100 && (
                  <button
                    onClick={() => toggleReadMore(comment.id)}
                    className="text-blue-500 hover:underline text-sm"
                  >
                    {expandedComments.has(comment.id) ? "Read Less" : "Read More"}
                  </button>
                )}
              </p>
              <div className="mt-2 flex justify-between items-center text-sm">
                <div className="space-x-4 text-gray-500">
                  <button
                    onClick={() => handleReplyClick(comment.id)}
                    className="hover:text-gray-700"
                  >
                    Reply
                  </button>
                  <button className="hover:text-gray-700">Translate</button>
                </div>
                <div
                  className="flex items-center text-red-500 hover:text-red-800 cursor-pointer justify-center p-1"
                  onClick={() => toggleLike(comment.id)}
                >
                  {comment.commentLikeCount > 0 ? (
                    <FaHeart className="text-red-600" />
                  ) : (
                    <FaRegHeart />
                  )}
                </div>
              </div>
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
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none"
                  />
                  <button
                    onClick={() => addReply(comment.id)}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"
                  >
                    Post Reply
                  </button>
                </div>
              )}
              {comment.replies.length > 0 && (
                <div className="mt-3 space-y-2">
                  {comment.replies.map((reply, index) => (
                    <div
                      key={index}
                      className="ml-6 bg-gray-100 p-2 rounded-lg text-gray-700 text-sm"
                    >
                      {reply.text}
                    </div>
                  ))}
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
          className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none w-96"
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
