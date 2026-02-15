import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { deriveInitials } from '@/lib/userIdentity';

interface UserAvatarProps {
  displayName: string;
  photoUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function UserAvatar({ displayName, photoUrl, size = 'md', className = '' }: UserAvatarProps) {
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  };

  const initials = deriveInitials(displayName);

  return (
    <Avatar className={`${sizeClasses[size]} ${className}`}>
      {photoUrl && <AvatarImage src={photoUrl} alt={displayName} />}
      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
