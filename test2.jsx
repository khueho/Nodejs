import React, { useState, useRef, useEffect } from "react";
import { FaComments } from "react-icons/fa";
import { Rnd } from "react-rnd";

const ChatComponent = () => {
  const [showChat, setShowChat] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [chatPosition, setChatPosition] = useState({ x: 0, y: 0 });
  const [chatSize, setChatSize] = useState({ width: 300, height: 400 });
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      const initialX = clientWidth - 100;
      const initialY = clientHeight - 100;
      setButtonPosition({ x: initialX, y: initialY });
      setChatPosition({ x: initialX - 200, y: initialY - 300 });
    }
  }, []);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const handleButtonDrag = (e, d) => {
    setButtonPosition({ x: d.x, y: d.y });
  };

  const handleChatDrag = (e, d) => {
    setChatPosition({ x: d.x, y: d.y });
  };

  const handleChatResize = (e, direction, ref, delta, position) => {
    setChatSize({
      width: ref.style.width,
      height: ref.style.height,
    });
    setChatPosition(position);
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {!showChat && (
        <Rnd
          default={{
            x: buttonPosition.x,
            y: buttonPosition.y,
            width: 80,
            height: 80,
          }}
          minWidth={80}
          minHeight={80}
          bounds="parent"
          onDragStop={handleButtonDrag}
        >
          <button
            onClick={toggleChat}
            className="w-full h-full bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors duration-300"
          >
            <FaComments className="text-2xl" />
          </button>
        </Rnd>
      )}

      {showChat && (
        <Rnd
          default={{
            x: chatPosition.x,
            y: chatPosition.y,
            width: chatSize.width,
            height: chatSize.height,
          }}
          minWidth={250}
          minHeight={300}
          bounds="parent"
          onDragStop={handleChatDrag}
          onResize={handleChatResize}
        >
          <div className="w-full h-full bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col">
            <div className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-lg font-semibold">Chat Window</h2>
              <button
                onClick={toggleChat}
                className="text-white hover:text-gray-200 transition-colors duration-300"
              >
                ×
              </button>
            </div>
            <div className="flex-grow p-4 overflow-y-auto">
              {/* Chat messages will go here */}
              <p className="text-gray-700">Welcome to the chat! How can I help you today?</p>
            </div>
            <div className="p-4 border-t border-gray-200">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </Rnd>
      )}
    </div>
  );
};

export default ChatComponent;
