import React, { useState } from "react";
import { Rnd } from "react-rnd";
import { FaComments, FaTimes } from "react-icons/fa";

const ChatComponent = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatPosition, setChatPosition] = useState({ x: 0, y: 0 });
  const [chatSize, setChatSize] = useState({ width: 300, height: 400 });
  const [buttonPosition, setButtonPosition] = useState({ x: window.innerWidth - 150, y: window.innerHeight - 60 });

  const handleChatResize = (e, direction, ref, delta, position) => {
    setChatSize({ width: ref.style.width, height: ref.style.height });
    setChatPosition(position);
  };

  const handleChatDrag = (e, d) => {
    setChatPosition({ x: d.x, y: d.y });
  };

  const handleButtonDrag = (e, d) => {
    setButtonPosition({ x: d.x, y: d.y });
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {!isChatOpen && (
        <Rnd
          default={{
            x: buttonPosition.x,
            y: buttonPosition.y,
            width: 120,
            height: 40
          }}
          onDragStop={handleButtonDrag}
          bounds="window"
          enableResizing={false}
        >
          <button
            onClick={() => setIsChatOpen(true)}
            className="w-full h-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 pointer-events-auto"
            aria-label="Start Chat"
          >
            <FaComments className="mr-2 inline-block" />
            Start Chat
          </button>
        </Rnd>
      )}
      {isChatOpen && (
        <Rnd
          size={{ width: chatSize.width, height: chatSize.height }}
          position={{ x: chatPosition.x, y: chatPosition.y }}
          onDragStop={handleChatDrag}
          onResizeStop={handleChatResize}
          minWidth={200}
          minHeight={300}
          maxWidth={500}
          maxHeight={600}
          bounds="window"
        >
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden pointer-events-auto h-full flex flex-col">
            <div className="bg-blue-500 p-4 flex justify-between items-center">
              <h2 className="text-white font-bold">Chat Support</h2>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:text-red-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 rounded"
                aria-label="Close chat"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-4 flex-grow overflow-y-auto">
              <p>Welcome to our chat support! How can we help you today?</p>
            </div>
            <div className="p-4 bg-gray-100">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Type your message"
              />
            </div>
          </div>
        </Rnd>
      )}
    </div>
  );
};

export default ChatComponent;
