import Footer from '@/view-trip/components/Footer';
import { useState } from 'react';
import { Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import api from '@/api/client';

function Chat() {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAskHelp = async () => {
    if (!userInput.trim()) return;
    setLoading(true);
    setResponse('');
    try {
      const res = await api.post('/ai/support', { message: userInput });
      setResponse(res.data.reply || 'No response received.');
    } catch {
      setResponse('Sorry, something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-5 py-12">
        <div className="border border-border rounded-2xl p-6 bg-card shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Bot className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Support Assistant</h2>
          </div>

          <textarea
            rows={4}
            className="w-full p-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary mb-4 resize-none text-sm placeholder:text-muted-foreground"
            placeholder="Describe the help you need... (Ctrl+Enter to send)"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && e.ctrlKey && handleAskHelp()}
          />

          <Button onClick={handleAskHelp} disabled={loading} className="w-full gap-2">
            <Send className="h-4 w-4" />
            {loading ? 'Thinking...' : 'Ask Support'}
          </Button>

          {response && (
            <div className="mt-5 bg-muted border border-border p-4 rounded-xl text-sm text-foreground">
              <p className="font-semibold mb-2 flex items-center gap-1 text-primary">
                <Bot className="h-4 w-4" /> AI Response:
              </p>
              <p className="whitespace-pre-wrap leading-relaxed">{response}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Chat;
