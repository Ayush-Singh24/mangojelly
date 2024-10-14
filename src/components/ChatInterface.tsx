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

  // Media Query breakpoint for smaller screens
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm"),
  );

  // Function to handle send button
  const handleSend = async () => {
    if (input.trim()) {
      console.log(messages);
      await dispatch(sendMessage(input));
      setInput("");
      //Simulate receiveing message after sending
      dispatch(receiveMessage());
    }
  };

  // Reference to a div element at the end of messages for auto scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to handle auto scroll
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
        overflow: "hidden",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Online Users
      </Typography>
      <Box
        sx={{
          mb: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          "&>*": {
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 0.5,
            borderRadius: 2,
          },
          "&>*:hover": { bgcolor: "grey.200", cursor: "pointer" },
        }}
      >
        <Box>
          <Avatar sx={{ bgcolor: "primary.main" }}>
            {currentUser.name[0].toUpperCase()}
          </Avatar>
          <Typography>{currentUser.name}</Typography>
        </Box>
        <Box>
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            {"Bot"[0].toUpperCase()}
          </Avatar>
          <Typography>Bot</Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
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
            overflow: "hidden",
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              overflow: "hidden",
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
              overflow: "hidden",
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
