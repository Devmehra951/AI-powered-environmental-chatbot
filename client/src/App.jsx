import { useEffect, useMemo, useRef, useState } from 'react';
import ChatInput from './components/ChatInput.jsx';
import ChatMessage from './components/ChatMessage.jsx';
import { ThemeProvider, useTheme } from './context/ThemeContext.jsx';
import { getHistory, sendMessage, submitFeedback } from './services/api.js';

const ChatShell = () => {
  const { theme, toggleTheme } = useTheme();
  const [items, setItems] = useState([]);
  const [topic, setTopic] = useState('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);

  const effectiveTopic = useMemo(() => (topic === 'All' ? 'General' : topic), [topic]);

  useEffect(() => {
    getHistory(topic)
      .then((history) => {
        const normalized = history.reverse().map((entry) => ({ ...entry, messageId: entry._id }));
        setItems(normalized);
      })
      .catch((err) => setError(err.message));
  }, [topic]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [items, loading]);

  const onSend = async (message) => {
    setError('');
    setLoading(true);
    try {
      const response = await sendMessage({ message, topic: effectiveTopic });
      setItems((prev) => [...prev, response]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onFeedback = async (messageId, rating) => {
    try {
      await submitFeedback({ messageId, rating });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className={`app ${theme}`}>
      <header>
        <h1>Chat Bot for Prakriti</h1>
        <button onClick={toggleTheme} className="theme-btn">Toggle {theme === 'light' ? 'Dark' : 'Light'}</button>
      </header>

      <section className="chat-window">
        {items.map((item, idx) => (
          <ChatMessage key={`${item.messageId}-${idx}`} item={item} onFeedback={onFeedback} />
        ))}
        {loading && <div className="loading">🌱 Generating environmental insight...</div>}
        <div ref={bottomRef} />
      </section>

      {error && <p className="error">{error}</p>}
      <ChatInput onSend={onSend} loading={loading} topic={topic} setTopic={setTopic} />
    </main>
  );
};

const App = () => (
  <ThemeProvider>
    <ChatShell />
  </ThemeProvider>
);

export default App;
