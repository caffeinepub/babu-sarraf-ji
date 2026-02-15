import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Heart, Trash2, Ban } from 'lucide-react';
import type { PostView } from '../../backend';
import { useLikePost } from '../../hooks/community/usePosts';
import { useDisplayName } from '../../hooks/community/useUserProfiles';
import { useAuthState } from '../../hooks/useAuthState';
import { useIsCallerAdmin, useDeletePost, useBlockUser } from '../../hooks/community/useModeration';
import CommentsSection from './CommentsSection';
import { useState } from 'react';
import ErrorBanner from './ErrorBanner';

interface PostCardProps {
  post: PostView;
}

export default function PostCard({ post }: PostCardProps) {
  const authorPrincipal = post.author.toString();
  const displayName = useDisplayName(authorPrincipal);
  const { isAuthenticated, principalString } = useAuthState();
  const { data: isAdmin = false } = useIsCallerAdmin();
  const likePost = useLikePost();
  const deletePost = useDeletePost();
  const blockUser = useBlockUser();
  const [error, setError] = useState<string | null>(null);

  const hasLiked = post.likedBy.some((p) => p.toString() === principalString);
  const imageUrl = post.image.getDirectURL();

  const handleLike = async () => {
    if (!isAuthenticated) return;
    setError(null);
    try {
      await likePost.mutateAsync(post.id);
    } catch (err: any) {
      setError(err.message || 'Failed to like post');
    }
  };

  const handleDelete = async () => {
    if (!isAdmin) return;
    if (!confirm('Are you sure you want to delete this post?')) return;
    setError(null);
    try {
      await deletePost.mutateAsync(post.id);
    } catch (err: any) {
      setError(err.message || 'Failed to delete post');
    }
  };

  const handleBlock = async () => {
    if (!isAdmin) return;
    if (!confirm(`Are you sure you want to block ${displayName}?`)) return;
    setError(null);
    try {
      await blockUser.mutateAsync(authorPrincipal);
    } catch (err: any) {
      setError(err.message || 'Failed to block user');
    }
  };

  const timestamp = new Date(Number(post.timestamp) / 1000000);
  const timeAgo = getTimeAgo(timestamp);

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
      {error && <ErrorBanner message={error} onDismiss={() => setError(null)} />}

      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-semibold">{displayName}</p>
          <p className="text-xs text-muted-foreground">{timeAgo}</p>
        </div>
        {isAdmin && (
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={handleBlock} title="Block user">
              <Ban className="h-4 w-4 text-destructive" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleDelete} title="Delete post">
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        )}
      </div>

      <img src={imageUrl} alt="Post" className="w-full rounded-lg mb-4" />

      <p className="mb-4 whitespace-pre-wrap">{post.caption}</p>

      <div className="flex items-center gap-4 mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          disabled={!isAuthenticated || hasLiked || likePost.isPending}
          className="gap-2"
        >
          <Heart className={`h-4 w-4 ${hasLiked ? 'fill-red-500 text-red-500' : ''}`} />
          <span>{Number(post.likes)}</span>
        </Button>
      </div>

      <CommentsSection postId={post.id} />
    </Card>
  );
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  
  return date.toLocaleDateString();
}
