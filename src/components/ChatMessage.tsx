import { Avatar, Box, ListItem, Typography } from "@mui/material";
import { Message } from "../types/types";

interface ChatMessageProps {
  message: Message;
  isCurrentUser: boolean;
}

export default function ChatMessage({
  message,
  isCurrentUser,
}: ChatMessageProps) {
  const formattedTime = new Date(message.timeStamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        flexDirection: "column",
        alignItems: isCurrentUser ? "flex-end" : "flex-start",
        padding: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isCurrentUser ? "row-reverse" : "row",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Avatar
          sx={{
            bgcolor: isCurrentUser ? "primary.main" : "secondary.main",
            mr: isCurrentUser ? 0 : 1,
            ml: isCurrentUser ? 1 : 0,
          }}
        >
          {message.user.name[0].toUpperCase()}
        </Avatar>
        <Typography variant="body2" sx={{ mx: 1 }}>
          {message.user.name}
        </Typography>
      </Box>
      <Box
        sx={{
          maxWidth: "80%",
          bgcolor: isCurrentUser ? "primary.light" : "grey.100",
          borderRadius: 2,
          p: 1,
          position: "relative",
        }}
      >
        <Typography variant="body1">{message.text}</Typography>
        <Typography
          variant="caption"
          sx={{ display: "block", textAlign: "right", mt: 0.5 }}
        >
          {formattedTime}
        </Typography>
      </Box>
    </ListItem>
  );
}
