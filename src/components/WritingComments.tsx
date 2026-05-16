"use client";

import { useState, useEffect } from "react";

interface Comment {
  _id: string;
  name: string;
  content: string;
  createdAt: string;
  replies: Comment[];
}

function CommentItem({
  comment,
  blogId,
  onReplyPosted,
  depth = 0,
}: {
  comment: Comment;
  blogId: string;
  onReplyPosted: () => void;
  depth?: number;
}) {
  const [showReply, setShowReply] = useState(false);
  const [replyName, setReplyName] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    setSubmitting(true);
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blogId,
          content: replyContent.trim(),
          parentComment: comment._id,
          name: replyName.trim() || null,
        }),
      });
      if (response.ok) {
        setReplyContent("");
        setReplyName("");
        setShowReply(false);
        onReplyPosted();
      }
    } catch (error) {
      console.error("Error posting reply:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const timeAgo = (date: string) => {
    const seconds = Math.floor(
      (new Date().getTime() - new Date(date).getTime()) / 1000
    );
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    return `${months}mo ago`;
  };

  return (
    <div className={`${depth > 0 ? "ml-6 pl-6 border-l border-[hsl(var(--border))]" : ""}`}>
      <div className="py-4">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-sm font-medium text-[hsl(var(--foreground))]">
            {comment.name}
          </span>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">
            {timeAgo(comment.createdAt)}
          </span>
        </div>
        <p className="text-sm text-[hsl(var(--foreground))] leading-relaxed">
          {comment.content}
        </p>
        {depth < 3 && (
          <button
            onClick={() => setShowReply(!showReply)}
            className="mt-2 text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors duration-300"
          >
            Reply
          </button>
        )}

        {showReply && (
          <form onSubmit={handleReply} className="mt-4 space-y-3">
            <input
              type="text"
              value={replyName}
              onChange={(e) => setReplyName(e.target.value)}
              placeholder="Name (optional)"
              className="w-full bg-transparent border-b border-[hsl(var(--border))] py-2 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:border-[hsl(var(--foreground))] transition-colors"
            />
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Your reply..."
              rows={2}
              className="w-full bg-transparent border-b border-[hsl(var(--border))] py-2 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:border-[hsl(var(--foreground))] transition-colors resize-none"
            />
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="text-xs tracking-[0.1em] uppercase text-[hsl(var(--foreground))] disabled:opacity-50"
              >
                Post
              </button>
              <button
                type="button"
                onClick={() => setShowReply(false)}
                className="text-xs tracking-[0.1em] uppercase text-[hsl(var(--muted-foreground))]"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {comment.replies?.length > 0 && (
        <div>
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply._id}
              comment={reply}
              blogId={blogId}
              onReplyPosted={onReplyPosted}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function WritingComments({ blogId }: { blogId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?blogId=${blogId}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setSubmitting(true);
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blogId,
          content: content.trim(),
          name: name.trim() || null,
        }),
      });
      if (response.ok) {
        setContent("");
        setName("");
        fetchComments();
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name (optional)"
          className="w-full bg-transparent border-b border-[hsl(var(--border))] py-2 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:border-[hsl(var(--foreground))] transition-colors duration-500"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Leave a thought..."
          rows={3}
          className="w-full bg-transparent border-b border-[hsl(var(--border))] py-2 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:border-[hsl(var(--foreground))] transition-colors duration-500 resize-none"
        />
        <button
          type="submit"
          disabled={submitting || !content.trim()}
          className="text-xs tracking-[0.15em] uppercase text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors duration-500 disabled:opacity-40"
        >
          {submitting ? "Posting..." : "Post Comment"}
        </button>
      </form>

      {loading ? (
        <p className="text-sm text-[hsl(var(--muted-foreground))]">...</p>
      ) : comments.length > 0 ? (
        <div className="divide-y divide-[hsl(var(--border))]">
          {comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              blogId={blogId}
              onReplyPosted={fetchComments}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          No comments yet. Be the first.
        </p>
      )}
    </div>
  );
}
