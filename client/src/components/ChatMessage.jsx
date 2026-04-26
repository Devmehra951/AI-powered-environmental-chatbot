const ChatMessage = ({ item, onFeedback }) => (
  <div className="chat-card">
    <p className="meta">{item.topic} • {new Date(item.createdAt).toLocaleString()}</p>
    <div className="bubble user">🧑 {item.userMessage}</div>
    <div className="bubble bot">🌿 {item.botResponse}</div>
    {item.messageId && (
      <div className="feedback-row">
        <button onClick={() => onFeedback(item.messageId, 'up')} aria-label="thumbs-up">👍</button>
        <button onClick={() => onFeedback(item.messageId, 'down')} aria-label="thumbs-down">👎</button>
      </div>
    )}
  </div>
);

export default ChatMessage;
