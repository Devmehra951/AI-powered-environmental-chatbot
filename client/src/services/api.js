const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const parseJson = async (response) => {
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || payload.message || 'Request failed');
  }
  return payload;
};

export const getHistory = (topic) => {
  const query = topic && topic !== 'All' ? `?topic=${encodeURIComponent(topic)}` : '';
  return fetch(`${API_BASE}/api/history${query}`).then(parseJson);
};

export const sendMessage = ({ message, topic }) =>
  fetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, topic })
  }).then(parseJson);

export const submitFeedback = ({ messageId, rating }) =>
  fetch(`${API_BASE}/api/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messageId, rating })
  }).then(parseJson);
