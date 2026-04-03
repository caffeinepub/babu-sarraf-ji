import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Trash2, Send } from 'lucide-react';
import { useGetComments, useAddComment } from '../../hooks/community/useComments';
import { useDisplayName, useUserProfile } from '../../hooks/community/useUserProfiles';
import { useAuthState } from '../../hooks/useAuthState';
import { useIsCallerAdmin, useDeleteComment } from '../../hooks/community/useModeration';
import UserAvatar from '../user/UserAvatar';
import ErrorBanner from './ErrorBanner';

interface CommentsSectionProps {
  postId: bigint;
}

export default function CommentsSection({ postId }: CommentsSectionProps) {
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { data: comments = [] } = useGetComments(postId);
  const addComment = useAddComment();
  const deleteComment = useDeleteComment();
  const { isAuthenticated } = useAuthState();
  const { data: isAdmin = false } = useIsCallerAdmin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setError(null);

    try {
      await addComment.mutateAsync({ postId, content: commentText.trim() });
      setCommentText('');
    } catch (err: any) {
      setError(err.message || 'Failed to add comment');
    }
  };

  const handleDelete = async (commentId: bigint) => {
    if (!isAdmin) return;
    if (!confirm('Are you sure you want to delete this comment?')) return;
    setError(null);
    try {
      await deleteComment.mutateAsync({ postId, commentId });
    } catch (err: any) {
      setError(err.message || 'Failed to delete comment');
    }
  };

  return (
    <div className="border-t border-border/50 pt-4 space-y-3">
      {error && <ErrorBanner message={error} onDismiss={() => setError(null)} />}

      <div className="space-y-3">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id.toString()}
            comment={comment}
            isAdmin={isAdmin}
            onDelete={handleDelete}
          />
        ))}
        {comments.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-2">No comments yet</p>
        )}
      </div>

      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1"
            maxLength={300}
          />
          <Button type="submit" size="icon" disabled={!commentText.trim() || addComment.isPending}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      ) : (
        <p className="text-sm text-muted-foreground text-center py-2">Sign in to comment</p>
      )}
    </div>
  );
}

function CommentItem({
  comment,
  isAdmin,
  onDelete,
}: {
  comment: any;
  isAdmin: boolean;
  onDelete: (id: bigint) => void;
}) {
  const authorPrincipal = comment.author.toString();
  const displayName = useDisplayName(authorPrincipal);
  const { data: profile } = useUserProfile(authorPrincipal);
  const timestamp = new Date(Number(comment.timestamp) / 1000000);
  const timeAgo = getTimeAgo(timestamp);

  return (
    <div className="flex items-start gap-3">
      <UserAvatar displayName={displayName} photoUrl={profile?.photoUrl} size="sm" />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-bold text-sm">{displayName}</span>
          <span className="text-xs text-muted-foreground">{timeAgo}</span>
        </div>
        <p className="text-sm text-muted-foreground break-words">{comment.content}</p>
      </div>
      {isAdmin && (
        <Button variant="ghost" size="icon" className="h-6 w-6 flex-shrink-0" onClick={() => onDelete(comment.id)}>
          <Trash2 className="h-3 w-3 text-destructive" />
        </Button>
      )}
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  
  return date.toLocaleDateString();
}
