import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Copy, Share2, Check } from 'lucide-react';
import useTripStore from '@/store/tripStore';

function ShareModal({ open, onClose, tripId }) {
  const [shareUrl, setShareUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { shareTrip } = useTripStore();

  const handleShare = async () => {
    setLoading(true);
    try {
      const data = await shareTrip(tripId);
      const url = `${window.location.origin}/share/${data.shareId}`;
      setShareUrl(url);
    } catch {
      toast.error('Failed to generate share link.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success('Link copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogDescription>
            <div className="flex items-center gap-2 mb-4">
              <Share2 className="h-5 w-5 text-primary" />
              <h2 className="font-bold text-lg text-foreground">Share Trip</h2>
            </div>
            <p className="text-muted-foreground text-sm mb-5">
              Generate a public link — anyone with the link can view this trip.
            </p>

            {!shareUrl ? (
              <Button onClick={handleShare} disabled={loading} className="w-full">
                {loading ? 'Generating...' : 'Generate Share Link'}
              </Button>
            ) : (
              <div className="flex gap-2">
                <input
                  readOnly
                  value={shareUrl}
                  className="flex-1 text-xs border border-border rounded-lg px-3 py-2 bg-muted truncate"
                />
                <Button onClick={handleCopy} size="icon" variant="outline">
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ShareModal;
