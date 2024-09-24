import React, { useState, useRef, useEffect } from "react";
import { FaComments, FaTimes } from "react-icons/fa";
import { Resizable } from "react-resizable";
import Draggable from "react-draggable";

const ChatComponent = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatPosition, setChatPosition] = useState({ x: 0, y: 0 });
  const [chatSize, setChatSize] = useState({ width: 300, height: 400 });
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const chatRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const updatePositions = () => {
      if (chatRef.current) {
        const rect = chatRef.current.getBoundingClientRect();
        setChatPosition({
          x: Math.min(window.innerWidth - rect.width, Math.max(0, chatPosition.x)),
          y: Math.min(window.innerHeight - rect.height, Math.max(0, chatPosition.y)),
        });
      }
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setButtonPosition({
          x: Math.min(window.innerWidth - rect.width, Math.max(0, buttonPosition.x)),
          y: Math.min(window.innerHeight - rect.height, Math.max(0, buttonPosition.y)),
        });
      }
    };

    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, [chatPosition, buttonPosition]);

  const handleResize = (e, { size }) => {
    setChatSize({ width: size.width, height: size.height });
  };

  const handleDrag = (e, ui) => {
    setChatPosition({
      x: ui.x,
      y: ui.y,
    });
  };

  const handleButtonDrag = (e, ui) => {
    setButtonPosition({
      x: ui.x,
      y: ui.y,
    });
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {!isChatOpen && (
        <Draggable
          bounds="parent"
          position={buttonPosition}
          onDrag={handleButtonDrag}
          nodeRef={buttonRef}
        >
          <button
            ref={buttonRef}
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 pointer-events-auto"
            aria-label="Start Chat"
          >
            <FaComments className="mr-2 inline-block" />
            Start Chat
          </button>
        </Draggable>
      )}
      {isChatOpen && (
        <Draggable
          bounds="parent"
          position={chatPosition}
          onDrag={handleDrag}
          nodeRef={chatRef}
        >
          <Resizable
            width={chatSize.width}
            height={chatSize.height}
            onResize={handleResize}
            minConstraints={[200, 300]}
            maxConstraints={[500, 600]}
          >
            <div
              ref={chatRef}
              className="bg-white rounded-lg shadow-2xl overflow-hidden pointer-events-auto"
              style={{ width: chatSize.width, height: chatSize.height }}
            >
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
              <div className="p-4 h-[calc(100%-4rem)] overflow-y-auto">
                {/* Chat messages would go here */}
                <p>Welcome to our chat support! How can we help you today?</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-100">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label="Type your message"
                />
              </div>
            </div>
          </Resizable>
        </Draggable>
      )}
    </div>
  );
};

export default ChatComponent;
