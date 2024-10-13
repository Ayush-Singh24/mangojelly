import { ListItem, ListItemText, Typography } from "@mui/material";
import { Message } from "../types/types";

interface ChatMessageProps {
  message: Message;
  isCurrentUser: boolean;
}

export default function ChatMessage({
  message,
  isCurrentUser,
}: ChatMessageProps) {
  return (
    <ListItem
      alignItems="flex-start"
      sx={{ flexDirection: isCurrentUser ? "row-reverse" : "row" }}
    >
      <ListItemText
        primary={message.user.name}
        secondary={
          <Typography
            sx={{ display: "inline" }}
            component="span"
            variant="body2"
            color="textPrimary"
          >
            {message.text}
          </Typography>
        }
        sx={{
          textAlign: isCurrentUser ? "right" : "left",
          bgcolor: isCurrentUser ? "primary.light" : "grey.100",
          borderRadius: 2,
          p: 1,
        }}
      ></ListItemText>
    </ListItem>
  );
}
