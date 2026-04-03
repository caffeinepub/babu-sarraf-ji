import { useState, useEffect, useRef } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Send, Trash2, MessageSquare } from 'lucide-react';
import { useGetChatMessages, useSendMessage } from '../../hooks/community/useChat';
import { useDisplayName, useUserProfile } from '../../hooks/community/useUserProfiles';
import { useAuthState } from '../../hooks/useAuthState';
import { useIsCallerAdmin, useDeleteChatMessage } from '../../hooks/community/useModeration';
import { ScrollArea } from '../ui/scroll-area';
import UserAvatar from '../user/UserAvatar';
import ErrorBanner from './ErrorBanner';

export default function ChatPanel() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { data: messages = [] } = useGetChatMessages();
  const sendMessage = useSendMessage();
  const deleteMessage = useDeleteChatMessage();
  const { isAuthenticated } = useAuthState();
  const { data: isAdmin = false } = useIsCallerAdmin();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setError(null);

    try {
      await sendMessage.mutateAsync(message.trim());
      setMessage('');
    } catch (err: any) {
      setError(err.message || 'Failed to send message');
    }
  };

  const handleDelete = async (messageId: bigint) => {
    if (!isAdmin) return;
    if (!confirm('Are you sure you want to delete this message?')) return;
    setError(null);
    try {
      await deleteMessage.mutateAsync(messageId);
    } catch (err: any) {
      setError(err.message || 'Failed to delete message');
    }
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 sticky top-4">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-display font-semibold">Group Chat</h2>
      </div>

      {error && <ErrorBanner message={error} onDismiss={() => setError(null)} />}

      <ScrollArea className="h-[400px] mb-4 pr-4" ref={scrollRef}>
        <div className="space-y-3">
          {messages.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No messages yet. Start the conversation!</p>
          ) : (
            messages.map((msg) => (
              <ChatMessage key={msg.id.toString()} message={msg} isAdmin={isAdmin} onDelete={handleDelete} />
            ))
          )}
        </div>
      </ScrollArea>

      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            maxLength={500}
          />
          <Button type="submit" size="icon" disabled={!message.trim() || sendMessage.isPending}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      ) : (
        <p className="text-sm text-muted-foreground text-center py-2">Sign in to chat</p>
      )}
    </Card>
  );
}

function ChatMessage({
  message,
  isAdmin,
  onDelete,
}: {
  message: any;
  isAdmin: boolean;
  onDelete: (id: bigint) => void;
}) {
  const authorPrincipal = message.author.toString();
  const displayName = useDisplayName(authorPrincipal);
  const { data: profile } = useUserProfile(authorPrincipal);
  const timestamp = new Date(Number(message.timestamp) / 1000000);
  const timeStr = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex items-start gap-3 p-2 rounded hover:bg-accent/50 transition-colors">
      <UserAvatar displayName={displayName} photoUrl={profile?.photoUrl} size="sm" />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-bold text-sm">{displayName}</span>
          <span className="text-xs text-muted-foreground">{timeStr}</span>
        </div>
        <p className="text-sm break-words">{message.content}</p>
      </div>
      {isAdmin && (
        <Button variant="ghost" size="icon" className="h-6 w-6 flex-shrink-0" onClick={() => onDelete(message.id)}>
          <Trash2 className="h-3 w-3 text-destructive" />
        </Button>
      )}
    </div>
  );
}
