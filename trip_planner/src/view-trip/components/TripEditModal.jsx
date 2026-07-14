import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Pencil } from 'lucide-react';
import useTripStore from '@/store/tripStore';

function TripEditModal({ open, onClose, trip }) {
  const [notes, setNotes] = useState(trip?.notes || '');
  const [loading, setLoading] = useState(false);
  const { updateTrip } = useTripStore();

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateTrip(trip._id, { notes });
      toast.success('Trip updated!');
      onClose();
    } catch {
      toast.error('Failed to update trip.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogDescription>
            <div className="flex items-center gap-2 mb-4">
              <Pencil className="h-5 w-5 text-primary" />
              <h2 className="font-bold text-lg text-foreground">Edit Trip</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Trip Notes</label>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add personal notes, reminders, or modifications..."
                  className="w-full border border-border rounded-xl px-3 py-2 text-sm bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
                <Button className="flex-1" onClick={handleSave} disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default TripEditModal;
