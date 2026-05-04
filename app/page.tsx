"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Chat } from "./components/Chat";
import { Input } from "./components/Input";
import { Message } from "./constants/constants";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("/api/chat", {
        message: input,
      });

      const botMessage: Message = {
        role: "assistant",
        content: res.data.reply,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <div className="px-8 py-4 border-b border-gray-300 text-lg font-semibold bg-white">
        Chat App
      </div>

      {/* Chat Area */}
      <Chat messages={messages} loading={loading} bottomRef={bottomRef} />

      {/* Input Bar */}
      <Input input={input} setInput={setInput} sendMessage={sendMessage} />
    </div>
  );
}
