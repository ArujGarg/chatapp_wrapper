import { ChatProps } from "../constants/constants";

export const Chat = ({ messages, loading, bottomRef }: ChatProps) => {
  return (
    <div className="flex-1 overflow-y-auto px-32 py-6 space-y-4">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[60%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === "user"
                ? "bg-gray-300 text-gray-900"
                : "bg-gray-200 text-gray-900"
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}

      {loading && <div className="text-gray-500 text-sm">Typing...</div>}

      <div ref={bottomRef} />
    </div>
  );
};
