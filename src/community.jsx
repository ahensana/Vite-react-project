import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import logo from './assets/Black Background.png';
import attachIcon from './assets/attach-file.png';
import sendIcon from './assets/sendlogo.png';
import emojiImg from './assets/emoji.png';

const SERVER_URL = 'http://localhost:5000';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleError = (error) => {
      setHasError(true);
      setError(error);
      console.error("Error caught by ErrorBoundary:", error);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="bg-red-100/10 border border-red-400/20 text-red-400 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Oops!</strong>
        <span className="block sm:inline"> Something went wrong. Please try again later or contact support.</span>
        {error && <p className="mt-2 text-sm">Error: {error.toString()}</p>}
        <button
          onClick={() => setHasError(false)}
          className="mt-2 bg-blue-400 hover:bg-blue-300 text-white font-bold py-1 px-2 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  return children;
};

const Community = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileUserListOpen, setIsMobileUserListOpen] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const connectToServer = () => {
    if (!username.trim()) {
      alert('Please enter a username');
      return;
    }

    const attemptConnection = (attempt) => {
      console.log(`Attempting to connect to ${SERVER_URL} - Attempt ${attempt} of ${maxRetries}`);
      const newSocket = io(SERVER_URL, {
        reconnectionAttempts: 5,
        transports: ['websocket', 'polling'],
        withCredentials: true,
      });
      setSocket(newSocket);

      newSocket.on('connect', () => {
        console.log(`Successfully connected to ${SERVER_URL} with socket ID: ${newSocket.id}`);
        newSocket.emit('user_join', { username });
        setIsConnected(true);
        setRetryCount(0);
      });

      newSocket.on('connect_error', (error) => {
        console.error(`Connection failed on attempt ${attempt}:`, error.message);
        newSocket.close();
        if (attempt < maxRetries) {
          const delay = 2000 * attempt;
          setTimeout(() => attemptConnection(attempt + 1), delay);
          console.log(`Retrying connection in ${delay / 1000} seconds...`);
        } else {
          console.error(`Max retries (${maxRetries}) reached. Giving up.`);
          alert('Failed to connect to the chat server. Please ensure the server is running and try again.');
          setIsConnected(false);
          setRetryCount(0);
        }
      });

      newSocket.on('user_joined', (user) => {
        setIsConnected(true);
        console.log('User joined:', user);
      });

      newSocket.on('previous_messages', (messages) => {
        setMessages(messages);
      });

      newSocket.on('new_message', (message) => {
        setMessages((prev) => [...prev, message]);
      });

      newSocket.on('users_update', (users) => {
        setConnectedUsers(users);
      });

      newSocket.on('user_typing', (data) => {
        setTypingUsers((prev) => {
          if (!prev.find((user) => user.userId === data.userId)) {
            return [...prev, data];
          }
          return prev;
        });
      });

      newSocket.on('user_stop_typing', (data) => {
        setTypingUsers((prev) => prev.filter((user) => user.userId !== data.userId));
      });

      newSocket.on('disconnect', () => {
        setIsConnected(false);
        console.log('Disconnected from server');
      });

      return () => {
        newSocket.close();
      };
    };

    attemptConnection(1);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() && !selectedFile) return;

    let fileData = null;

    if (selectedFile) {
      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await axios.post(`${SERVER_URL}/api/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });

        fileData = response.data;
      } catch (error) {
        console.error('File upload failed:', error);
        alert('File upload failed. Please try again.');
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
    }

    socket.emit('send_message', {
      content: newMessage.trim() || (fileData ? `Shared a file: ${fileData.originalName}` : ''),
      file: fileData,
    });

    setNewMessage('');
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    // Reset textarea height after sending message
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const isMobile = window.innerWidth <= 640;
      const minHeight = isMobile ? '32px' : '40px';
      textareaRef.current.style.height = minHeight;
    }
  };

  const handleTyping = () => {
    if (socket) {
      socket.emit('typing_start');
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('typing_stop');
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSmoothScroll = (e, id) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleEmojiClick = () => {
    console.log('Emoji button clicked - implement emoji picker here');
    // Placeholder for emoji picker integration
  };

  const openMobileUserList = () => setIsMobileUserListOpen(true);
  const closeMobileUserList = () => setIsMobileUserListOpen(false);

  const renderMessage = (message) => {
    const isSystemMessage = message.type === 'system';
    const isOwnMessage = message.username === username;

    return (
      <div
        key={message.id}
        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-2`}
      >
        <div
          className={`max-w-xs sm:max-w-md p-2 rounded-lg ${isOwnMessage ? 'bg-blue-400 text-white' : 'bg-white/10 text-white'} ${isSystemMessage ? 'text-gray-400 w-full text-center' : ''}`}
        >
          {!isSystemMessage && !isOwnMessage && (
            <div className="flex items-baseline space-x-2 mb-1 text-xs">
              <span className="font-semibold text-blue-300">{message.username}</span>
              <span className="text-black">{formatTimestamp(message.timestamp)}</span>
            </div>
          )}
          <div className={isOwnMessage ? 'flex justify-between items-start' : ''}>
            <div className={`${isOwnMessage ? 'flex-1' : ''} break-words overflow-hidden`}>
              <div className="whitespace-pre-wrap">{message.content}</div>
              {message.file && (
                <div className="mt-1">
                  {message.file.mimetype.startsWith('image/') ? (
                    <img
                      src={`${SERVER_URL}${message.file.url}`}
                      alt={message.file.originalName}
                      className="max-w-full rounded-lg"
                    />
                  ) : (
                    <a
                      href={`${SERVER_URL}${message.file.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      📎 {message.file.originalName}
                    </a>
                  )}
                </div>
              )}
            </div>
            {isOwnMessage && !isSystemMessage && (
              <span className="text-black text-xs ml-2">{formatTimestamp(message.timestamp)}</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (!isConnected) {
    return (
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white min-h-screen flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 max-w-md w-full border border-white/20 shadow-lg">
          <h1 className="text-2xl font-bold text-blue-300 mb-4 text-center">Join Community Chat</h1>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && connectToServer()}
            className="w-full border border-white/20 rounded-lg px-4 py-2 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          />
          <button
            onClick={connectToServer}
            className="w-full bg-blue-400 hover:bg-blue-300 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Join Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="flex h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        {/* Sidebar */}
        <aside className="w-72 bg-white/10 backdrop-blur-md border-r border-white/20 p-4 hidden md:block">
          <h2 className="text-lg font-semibold text-blue-300 mb-4">Online Users ({connectedUsers.length})</h2>
          <ul className="space-y-2 overflow-y-auto h-[calc(100vh-120px)]">
            {connectedUsers.map((user) => (
              <li key={user.userId} className="text-gray-300 flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                {user.username}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white/10 backdrop-blur-md border-b border-white/20 p-4 flex items-center justify-between">
            <div className="flex items-center">
              <img src={logo} alt="Logo" className="w-10 h-10 rounded-full mr-2" />
              <div>
                <h2 className="text-lg font-semibold text-blue-300">The Trader's Escape</h2>
                <p className="text-xs text-gray-400">
                  {connectedUsers.map((user) => user.username).join(', ') || 'No users online'}
                </p>
              </div>
            </div>
            {/* Removed mobile menu bar button */}
          </header>

          {/* Chat Section */}
          <section className="flex-1 overflow-y-auto p-4">
            {messages.map(renderMessage)}
            {typingUsers.filter((user) => user.username !== username).length > 0 && (
              <div className="text-gray-400 italic text-sm">
                {typingUsers
                  .filter((user) => user.username !== username)
                  .map((user) => user.username)
                  .join(', ')}{' '}
                {typingUsers.filter((user) => user.username !== username).length === 1 ? 'is' : 'are'} typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </section>

          {/* Input Field */}
          <div className="bg-white/10 backdrop-blur-md border-t border-white/20 p-4">
            {selectedFile && (
              <div className="flex items-center space-x-2 mb-2 text-gray-300">
                <span>{selectedFile.name}</span>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-red-400 hover:text-red-300"
                >
                  ✕
                </button>
              </div>
            )}
            <div className="flex space-x-2">
              <button
                onClick={handleEmojiClick}
                className="hover:bg-white/15 text-white px-2 py-2 rounded-full"
                title="Add emoji"
              >
                <img src={emojiImg} alt="Emoji" className="w-7 h-7" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => setSelectedFile(e.target.files[0])}
                accept="image/*,.pdf,.doc,.docx,.txt,.zip,.rar"
                style={{ display: 'none' }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="hover:bg-white/15 text-white px-2 py-2 rounded-full"
                title="Attach file"
              >
                <img src={attachIcon} alt="Attach" className="w-5 h-5" />
              </button>
              <textarea
                ref={textareaRef}
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                  handleTyping();
                  if (textareaRef.current) {
                    textareaRef.current.style.height = 'auto';
                    // Responsive max height: 120px desktop, 70px mobile
                    const isMobile = window.innerWidth <= 640;
                    const maxHeight = isMobile ? 70 : 120;
                    textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, maxHeight) + 'px';
                  }
                }}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none scrollbar-hide"
                rows="1"
                style={{
                  maxHeight: window.innerWidth <= 640 ? '70px' : '120px',
                  minHeight: window.innerWidth <= 640 ? '32px' : '40px',
                  overflowY: 'auto',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              />
              <button
                onClick={sendMessage}
                disabled={(!newMessage.trim() && !selectedFile) || isUploading}
                className="text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                {isUploading ? '⏳' : <img src={sendIcon} alt="Send" className="w-8 h-8" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden mobile-menu-dropdown${isMobileMenuOpen ? ' open' : ''} bg-white/10 backdrop-blur-md p-4`}>
            <ul className="space-y-2">
              {connectedUsers.map((user) => (
                <li key={user.userId} className="text-gray-300 flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  {user.username}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {isMobileUserListOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 md:hidden">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 w-11/12 max-w-xs border border-white/20 shadow-lg">
            <h2 className="text-lg font-semibold text-blue-300 mb-4 text-center">Online Users</h2>
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {connectedUsers.map((user) => (
                <li key={user.userId} className="text-gray-300 flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  {user.username}
                </li>
              ))}
            </ul>
            <button
              onClick={closeMobileUserList}
              className="w-full bg-blue-400 hover:bg-blue-300 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </ErrorBoundary>
  );
};

export default Community;