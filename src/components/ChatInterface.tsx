import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  List,
  Paper,
  TextField,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import ChatMessage from "./ChatMessage";
import { receiveMessage, sendMessage } from "../features/chatSlice";

const drawerWidth = 240;

export default function ChatInterface() {
  const [input, setInput] = useState<string>("");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { messages, currentUser, isLoading } = useAppSelector(
    (state) => state.chat,
  );

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm"),
  );

  const handleSend = async () => {
    if (input.trim()) {
      console.log(messages);
      await dispatch(sendMessage(input));
      setInput("");
      //Simulate receiveing message after sending
      dispatch(receiveMessage());
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // A simple drawer component for showing online users
  const drawer = (
    <Box
      sx={{
        width: drawerWidth,
        p: 2,
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Online Users
      </Typography>
      <Box sx={{ mb: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ bgcolor: "primary.main" }}>
            {currentUser.name[0].toUpperCase()}
          </Avatar>
          <Typography>{currentUser.name}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            {currentUser.name[0].toUpperCase()}
          </Avatar>
          <Typography>Bot</Typography>
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {`${new Date().toLocaleString()}`}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          {isSmallScreen && (
            <Button color="inherit" onClick={toggleDrawer} sx={{ mr: 2 }}>
              <MenuIcon />
            </Button>
          )}
          <Typography variant="h6" noWrap component="div">
            Chat Application
          </Typography>
        </Toolbar>
      </AppBar>
      {!isSmallScreen ? (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={toggleDrawer}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Toolbar />
        <Paper
          elevation={3}
          sx={{
            height: "calc(100vh - 110px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <List sx={{ flexGrow: 1, overflow: "auto", p: 2, width: "100%" }}>
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                isCurrentUser={message.user.id === currentUser.id}
              />
            ))}
            <div ref={messagesEndRef} />
          </List>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              p: 2,
              borderTop: 1,
              borderColor: "divider",
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && !isLoading && handleSend()}
              disabled={isLoading}
              placeholder="Type a message..."
              sx={{ flexGrow: 1 }}
            />
            <Button
              variant="contained"
              onClick={handleSend}
              disabled={isLoading}
            >
              Send
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
