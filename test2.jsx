import React, { useState, useEffect, useRef } from "react";
import { FaComments, FaTimes } from "react-icons/fa";

const ChatComponent = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatPosition, setChatPosition] = useState({ x: window.innerWidth - 320, y: window.innerHeight - 420 });
  const [chatSize, setChatSize] = useState({ width: 300, height: 400 });
  const [buttonPosition, setButtonPosition] = useState({ x: window.innerWidth - 150, y: window.innerHeight - 60 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState("");
  const chatRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && chatRef.current) {
        const newX = Math.max(0, Math.min(e.clientX - chatRef.current.offsetWidth / 2, window.innerWidth - chatRef.current.offsetWidth));
        const newY = Math.max(0, Math.min(e.clientY - 20, window.innerHeight - chatRef.current.offsetHeight));
        setChatPosition({ x: newX, y: newY });
      } else if (isDragging && buttonRef.current) {
        const newX = Math.max(0, Math.min(e.clientX - buttonRef.current.offsetWidth / 2, window.innerWidth - buttonRef.current.offsetWidth));
        const newY = Math.max(0, Math.min(e.clientY - buttonRef.current.offsetHeight / 2, window.innerHeight - buttonRef.current.offsetHeight));
        setButtonPosition({ x: newX, y: newY });
      } else if (isResizing && chatRef.current) {
        const chat = chatRef.current;
        if (resizeDirection.includes("e")) {
          const newWidth = Math.max(200, Math.min(e.clientX - chat.offsetLeft, window.innerWidth - chat.offsetLeft));
          setChatSize((prev) => ({ ...prev, width: newWidth }));
        }
        if (resizeDirection.includes("s")) {
          const newHeight = Math.max(200, Math.min(e.clientY - chat.offsetTop, window.innerHeight - chat.offsetTop));
          setChatSize((prev) => ({ ...prev, height: newHeight }));
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, resizeDirection]);

  const startDragging = (e, isButton = false) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const startResizing = (direction) => (e) => {
    e.preventDefault();
    setIsResizing(true);
    setResizeDirection(direction);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) {
      setChatPosition({
        x: Math.min(buttonPosition.x, window.innerWidth - chatSize.width),
        y: Math.max(0, buttonPosition.y - chatSize.height)
      });
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {!isChatOpen && (
        <div
          ref={buttonRef}
          style={{
            position: "absolute",
            left: `${buttonPosition.x}px`,
            top: `${buttonPosition.y}px`,
          }}
          className="w-30 h-10 cursor-move"
          onMouseDown={(e) => startDragging(e, true)}
        >
          <button
            onClick={toggleChat}
            className="w-full h-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 pointer-events-auto"
            aria-label="Start Chat"
          >
            <FaComments className="mr-2 inline-block" />
            Start Chat
          </button>
        </div>
      )}
      {isChatOpen && (
        <div
          ref={chatRef}
          style={{
            position: "absolute",
            left: `${chatPosition.x}px`,
            top: `${chatPosition.y}px`,
            width: `${chatSize.width}px`,
            height: `${chatSize.height}px`,
          }}
          className="bg-white rounded-lg shadow-2xl overflow-hidden pointer-events-auto flex flex-col"
        >
          <div
            className="bg-blue-500 p-4 flex justify-between items-center cursor-move"
            onMouseDown={startDragging}
          >
            <h2 className="text-white font-bold">Chat Support</h2>
            <button
              onClick={toggleChat}
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
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
            onMouseDown={startResizing("se")}
          ></div>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
