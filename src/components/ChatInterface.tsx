import { Box, Button, Container, List, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import ChatMessage from "./chatMessage";
import { receiveMessage, sendMessage } from "../features/chatSlice";

export default function ChatInterface() {
  const [input, setInput] = useState<string>("");

  const dispatch = useAppDispatch();

  const { messages, currentUser, isLoading } = useAppSelector(
    (state) => state.chat,
  );

  const handleSend = async () => {
    if (input.trim()) {
      await dispatch(sendMessage(input));
      setInput("");
      //Simulate receiveing message after sending
      dispatch(receiveMessage());
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  return (
    <Container maxWidth="sm">
      <Box sx={{ height: "80vh", display: "flex", flexDirection: "column" }}>
        <List sx={{ flexGrow: 1, overflow: "auto", mb: 2 }}>
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isCurrentUser={message.user.id === currentUser.id}
            />
          ))}
          <div ref={messagesEndRef} />
        </List>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && handleSend()}
          />
          <Button variant="contained" onClick={handleSend} disabled={isLoading}>
            Send
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
