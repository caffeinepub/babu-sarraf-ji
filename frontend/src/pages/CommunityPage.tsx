import { Users } from 'lucide-react';
import SiteNav from '../components/SiteNav';
import PostComposer from '../components/community/PostComposer';
import PostCard from '../components/community/PostCard';
import ChatPanel from '../components/community/ChatPanel';
import { useGetAllPosts } from '../hooks/community/usePosts';
import { useAuthState } from '../hooks/useAuthState';
import LoginButton from '../components/LoginButton';
import FocusBabuLogo from '../components/FocusBabuLogo';
import { Card } from '../components/ui/card';
import { getCopyrightText, getAppIdentifier } from '../lib/branding';

export default function CommunityPage() {
  const { data: posts = [], isLoading } = useGetAllPosts();
  const { isAuthenticated } = useAuthState();

  const currentYear = new Date().getFullYear();
  const appIdentifier = getAppIdentifier();

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Users className="h-8 w-8 text-primary" />
            <h1 className="text-3xl sm:text-4xl font-display font-bold">Community</h1>
          </div>
          <p className="text-muted-foreground">Share your study goals and connect with others</p>
        </div>

        {!isAuthenticated && (
          <Card className="mb-6 p-8 text-center bg-card/50 backdrop-blur-sm border-border/50">
            <div className="flex flex-col items-center gap-4">
              <FocusBabuLogo variant="centered" />
              <p className="text-muted-foreground">Sign in to post, comment, and chat with the community</p>
              <LoginButton />
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {isAuthenticated && <PostComposer />}

            <div className="space-y-4">
              {isLoading ? (
                <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-border/50">
                  <p className="text-muted-foreground">Loading posts...</p>
                </Card>
              ) : posts.length === 0 ? (
                <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-border/50">
                  <p className="text-muted-foreground">No posts yet. Be the first to share your study target!</p>
                </Card>
              ) : (
                posts
                  .sort((a, b) => Number(b.timestamp - a.timestamp))
                  .map((post) => <PostCard key={post.id.toString()} post={post} />)
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <ChatPanel />
          </div>
        </div>
      </main>

      <footer className="w-full py-6 px-4 sm:px-6 lg:px-8 border-t border-border/50 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
          <p className="text-sm text-muted-foreground">
            {getCopyrightText(currentYear)}
          </p>
          <p className="text-sm text-muted-foreground">
            Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
