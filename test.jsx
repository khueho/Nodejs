import React, { useState, useRef, useEffect } from "react";
import { FaComments } from "react-icons/fa";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";

const ChatbotComponent = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const chatWindowRef = useRef(null);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, { text: inputMessage, sender: "user" }]);
      setInputMessage("");
      // Simulating a bot response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "This is a bot response.", sender: "bot" },
        ]);
      }, 1000);
    }
  };

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="relative h-screen">
      <button
        className="fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300 z-50"
        onClick={toggleChat}
      >
        <FaComments className="text-2xl" />
      </button>

      {isChatOpen && (
        <Draggable bounds="parent">
          <Resizable
            defaultSize={{ width: 300, height: 400 }}
            minConstraints={[200, 200]}
            maxConstraints={[500, 600]}
          >
            <div className="fixed bottom-20 right-5 bg-white rounded-lg shadow-xl overflow-hidden z-40 flex flex-col">
              <div className="bg-blue-500 text-white p-3 cursor-move">
                Chatbot
              </div>
              <div
                ref={chatWindowRef}
                className="flex-1 p-4 overflow-y-auto"
              >
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-2 ${
                      message.sender === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    <span
                      className={`inline-block p-2 rounded-lg ${
                        message.sender === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {message.text}
                    </span>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t">
                <div className="flex">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={handleInputChange}
                    className="flex-1 border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your message..."
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600 transition-colors duration-300"
                  >
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

export default ChatbotComponent;
