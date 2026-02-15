import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ImagePlus, Loader2 } from 'lucide-react';
import { useCreatePost } from '../../hooks/community/usePosts';
import { ExternalBlob } from '../../backend';
import ErrorBanner from './ErrorBanner';

const MAX_CAPTION_LENGTH = 500;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export default function PostComposer() {
  const [caption, setCaption] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const createPost = useCreatePost();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE) {
      setError(`Image size must be less than ${MAX_IMAGE_SIZE / 1024 / 1024}MB`);
      return;
    }

    setImageFile(file);
    setError(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!imageFile) {
      setError('Please select an image');
      return;
    }

    if (!caption.trim()) {
      setError('Please add a caption');
      return;
    }

    if (caption.length > MAX_CAPTION_LENGTH) {
      setError(`Caption must be less than ${MAX_CAPTION_LENGTH} characters`);
      return;
    }

    try {
      const arrayBuffer = await imageFile.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
        setUploadProgress(percentage);
      });

      await createPost.mutateAsync({ image: blob, caption: caption.trim() });

      setCaption('');
      setImageFile(null);
      setImagePreview(null);
      setUploadProgress(0);
    } catch (err: any) {
      setError(err.message || 'Failed to create post');
    }
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
      <h2 className="text-xl font-display font-semibold mb-4">Share Today's Target</h2>
      
      {error && <ErrorBanner message={error} onDismiss={() => setError(null)} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="image" className="cursor-pointer">
            <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-primary transition-colors text-center">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <ImagePlus className="h-8 w-8" />
                  <span>Click to upload image (max {MAX_IMAGE_SIZE / 1024 / 1024}MB)</span>
                </div>
              )}
            </div>
          </Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <div>
          <Label htmlFor="caption">Caption</Label>
          <Textarea
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="What's your study target today?"
            className="min-h-[100px] resize-none"
            maxLength={MAX_CAPTION_LENGTH}
          />
          <p className="text-xs text-muted-foreground mt-1">
            {caption.length}/{MAX_CAPTION_LENGTH}
          </p>
        </div>

        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="space-y-1">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground text-center">Uploading: {uploadProgress}%</p>
          </div>
        )}

        <Button type="submit" disabled={createPost.isPending || !imageFile || !caption.trim()} className="w-full">
          {createPost.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Posting...
            </>
          ) : (
            'Post'
          )}
        </Button>
      </form>
    </Card>
  );
}
