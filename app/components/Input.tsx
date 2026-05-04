import { InputProps } from "../constants/constants";

export const Input = ({ input, setInput, sendMessage }: InputProps) => {
  return (
    <div className="px-32 py-4 border-t border-gray-300 bg-white flex gap-3">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 bg-gray-100 px-4 py-3 rounded-xl outline-none border border-gray-300 focus:ring-2 focus:ring-gray-300"
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
      />

      <button
        onClick={sendMessage}
        className="bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition"
      >
        Send
      </button>
    </div>
  );
};
