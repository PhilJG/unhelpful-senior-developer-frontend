import { useState } from "react";
import avatar from "../assets/avatar.webp";

function MessageBox({ messages, input, user, value }) {
  return (
    <>
      {!user ? (
        <div className="flex flex-col items-start ">
          <span className="bg-blue-500 px-4 py-2 text-white rounded-b-xl rounded-tr-xl mb-2 mt-2">
            {value}
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-end ">
          <span className="bg-gray-500 px-2 py-4 text-white mt-2 mb-2 rounded-bl-xl rounded-t-xl">
            {value}
          </span>
        </div>
      )}
    </>
  );
}

export default MessageBox;
