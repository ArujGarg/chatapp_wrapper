export type ChatProps = {
  messages: Message[];
  loading: boolean;
  bottomRef: React.RefObject<HTMLDivElement | null>;
};

export type InputProps = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
};

export type Message = {
  role: "user" | "assistant";
  content: string;
};
