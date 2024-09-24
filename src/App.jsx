import { useState, useRef } from "react";

import axios from "axios";

import MessageBox from "./components/MessageBox";
import LoadSpinner from "./components/LoadSpinner";

import "./App.css";
import "./index.css";
import avatar from "./assets/avatar.webp";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  const sendMessage = (e) => {
    e.preventDefault();
    const message = e.target.elements.message.value;
    setLoading(true);
    // const formData = new FormData(e.target);
    // const message = formData.get('message');
    setInput({ userInput: message });
    postData(message);
  };

  const postData = async (input) => {
    if (input) {
      try {
        let userInput = input;
        console.log("input:", userInput);

        // const { data } = await axios.post(
        //   `https://fony-talk-api.onrender.com/talk`,
        //   { userInput: userInput },
        //   { headers: { "Content-Type": "application/json" } }
        // );

        const { data } = await axios.post(
          `http://localhost:4100/talk`,
          { userInput: userInput },
          { headers: { "Content-Type": "application/json" } }
        );

        const userMessage = {
          content: userInput,
          user: true,
          key: messages.length,
        };
        const botMessage = {
          content: data,
          user: false,
          key: messages.length + 1,
        };
        setMessages([userMessage, botMessage, ...messages]);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    //Main container
    <div className="w-full md:m-10 md:p-10 ">
      {/* Chat container */}
      <div className="bg-white shadow-lg rounded-lg max-w-md">
        {/* Chat header */}
        <div className="border-b-2 px-2 py-2">
          <div className="inline-flex items-center">
            <img src={avatar} alt="logo" className="w-8" />
            <span className="ml-4">The Unhelpful Senior Developer</span>
          </div>
        </div>
        {/* <i className='text-gray-500'>Based on real messages with former students</i>
        <br></br>  */}
        <i className="text-gray-500">Built for the lolz</i>

        {/* Chat body */}
        <div
          className="h-80 flex flex-col overflow-y-auto max-w-md px-2 mb-2 mt-2"
          ref={chatEndRef}
        >
          {messages.map((message) => (
            <MessageBox
              key={message.key}
              user={message.user}
              value={message.content}
            />
          ))}
        </div>

        {/* Chat footer */}
        <form
          onSubmit={(e) => sendMessage(e)}
          className="border-t-2 flex items-center py-4 px-2 "
        >
          <input
            type="text"
            name="message"
            placeholder="What he really thinks of you..."
            className="flex-1 rounded-lg px-4 py-2 border-2 mr-2"
          />
          {loading ? (
            <LoadSpinner />
          ) : (
            <button type="submit" className="relative right-1">
              Send
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
