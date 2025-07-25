import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import logo from './assets/Black Background.png';
import attachIcon from './assets/attach-file.png';
import sendIcon from './assets/sendlogo.png'; 


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
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Oops!</strong>
        <span className="block sm:inline"> Something went wrong. Please try again later or contact support.</span>
        {error && <p className="mt-2 text-sm">Error: {error.toString()}</p>}
        <button
          onClick={() => setHasError(false)}
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
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
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

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
      hour: '2-digit',
      minute: '2-digit',
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

  const renderMessage = (message) => {
    const isSystemMessage = message.type === 'system';
    const isOwnMessage = message.username === username;

    return (
      <div
        key={message.id}
        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-2`}
      >
        <div
          className={`max-w-xs sm:max-w-md p-2 rounded-lg ${isOwnMessage ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'} ${isSystemMessage ? 'text-gray-500 w-full text-center' : ''}`}
        >
          {!isSystemMessage && (
            <div className="flex items-baseline space-x-2 mb-1 text-xs">
              <span className="font-semibold">{message.username}</span>
              <span className="text-gray-600">{formatTimestamp(message.timestamp)}</span>
            </div>
          )}
          <div>
            {message.content}
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
                    className="text-blue-500 hover:text-blue-700 underline"
                  >
                    📎 {message.file.originalName}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (!isConnected) {
    return (
      <div className="bg-gray-100 text-gray-800 min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
          <h1 className="text-2xl font-bold text-green-500 mb-4 text-center">Join Community Chat</h1>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && connectToServer()}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
          />
          <button
            onClick={connectToServer}
            className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Join Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-72 bg-white border-r border-gray-200 p-4 hidden md:block">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Online Users ({connectedUsers.length})</h2>
          <ul className="space-y-2 overflow-y-auto h-[calc(100vh-120px)]">
            {connectedUsers.map((user) => (
              <li key={user.userId} className="text-gray-600 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                {user.username}
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              socket.disconnect();
              setIsConnected(false);
            }}
            className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 mt-4"
          >
            Leave Chat
          </button>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center">
              <img src={logo} alt="Logo" className="w-10 h-10 rounded-full mr-2" />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">The Final Stand</h2>
                <p className="text-xs text-gray-500">
                  {connectedUsers.map((user) => user.username).join(', ') || 'No users online'}
                </p>
              </div>
            </div>
            <div className="md:hidden">
              <button onClick={toggleMobileMenu} className="text-gray-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </header>

          {/* Chat Section */}
          <section className="flex-1 overflow-y-auto p-4">
            {messages.map(renderMessage)}
            {typingUsers.length > 0 && (
              <div className="text-gray-500 italic text-sm">
                {typingUsers.map((user) => user.username).join(', ')}{' '}
                {typingUsers.length === 1 ? 'is' : 'are'} typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </section>

          {/* Input Field */}
          <div className="bg-white border-t border-gray-200 p-4">
            {selectedFile && (
              <div className="flex items-center space-x-2 mb-2 text-gray-600">
                <span> {selectedFile.name}</span>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            )}
            <div className="flex space-x-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => setSelectedFile(e.target.files[0])}
                accept="image/*,.pdf,.doc,.docx,.txt,.zip,.rar"
                style={{ display: 'none' }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className=" hover:bg-gray-300 text-gray-800 px-2 py-2 rounded-full"
                title="Attach file"
              >
                <img src={attachIcon} alt="Attach" className="w-5 h-5" />
              </button>
              <textarea
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                  handleTyping();
                }}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 "
                rows="1"
              />
              <button
                onClick={sendMessage}
                disabled={(!newMessage.trim() && !selectedFile) || isUploading}
                className=" text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 "
              >
                {isUploading ? '⏳' : <img src={sendIcon} alt="Send" className="w-8 h-8" />}
              </button>

            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-white p-4`}>
            <ul className="space-y-2">
              {connectedUsers.map((user) => (
                <li key={user.userId} className="text-gray-600 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  {user.username}
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                socket.disconnect();
                setIsConnected(false);
              }}
              className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 mt-4"
            >
              Leave Chat
            </button>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Community;

