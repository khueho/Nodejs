import React, { useState, useRef, useEffect } from "react";
import { FaComments, FaTimes } from "react-icons/fa";
import { Resizable } from "react-resizable";
import Draggable from "react-draggable";

const ChatbotWidget = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatSize, setChatSize] = useState({ width: 300, height: 400 });
  const [chatPosition, setChatPosition] = useState({ x: 0, y: 0 });
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const chatWindowRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (chatWindowRef.current) {
        const { right, bottom } = chatWindowRef.current.getBoundingClientRect();
        const maxX = window.innerWidth - right;
        const maxY = window.innerHeight - bottom;
        setChatPosition(prevPos => ({
          x: Math.min(prevPos.x, maxX),
          y: Math.min(prevPos.y, maxY)
        }));
      }
      if (buttonRef.current) {
        const { width, height } = buttonRef.current.getBoundingClientRect();
        const maxX = window.innerWidth - width;
        const maxY = window.innerHeight - height;
        setButtonPosition(prevPos => ({
          x: Math.min(prevPos.x, maxX),
          y: Math.min(prevPos.y, maxY)
        }));
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const handleResize = (e, { size }) => {
    setChatSize({ width: size.width, height: size.height });
  };

  const handleChatDrag = (e, ui) => {
    setChatPosition({ x: ui.x, y: ui.y });
  };

  const handleButtonDrag = (e, ui) => {
    setButtonPosition({ x: ui.x, y: ui.y });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isChatOpen && (
        <Draggable
          bounds="parent"
          position={buttonPosition}
          onDrag={handleButtonDrag}
        >
          <button
            ref={buttonRef}
            onClick={toggleChat}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 cursor-move"
            aria-label="Start chat"
          >
            <FaComments className="w-6 h-6" />
          </button>
        </Draggable>
      )}
      {isChatOpen && (
        <Draggable
          bounds="parent"
          position={chatPosition}
          onDrag={handleChatDrag}
          handle=".drag-handle"
        >
          <Resizable
            width={chatSize.width}
            height={chatSize.height}
            onResize={handleResize}
            minConstraints={[250, 300]}
            maxConstraints={[500, 600]}
          >
            <div
              ref={chatWindowRef}
              className="bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col"
              style={{ width: chatSize.width, height: chatSize.height }}
            >
              <div className="bg-blue-500 text-white p-4 flex justify-between items-center drag-handle cursor-move">
                <h2 className="text-lg font-semibold">Chat with us</h2>
                <button
                  onClick={toggleChat}
                  className="text-white hover:text-gray-200 transition-colors duration-300 focus:outline-none"
                  aria-label="Close chat"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="flex-grow p-4 overflow-y-auto">
                <p className="text-gray-600">Welcome! How can we help you today?</p>
              </div>
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </Resizable>
        </Draggable>
      )}
    </div>
  );
};

export default ChatbotWidget;
