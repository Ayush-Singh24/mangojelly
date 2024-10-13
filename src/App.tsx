import { Provider } from "react-redux";
import { store } from "./app/store";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import ChatInterface from "./components/ChatInterface";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F4BB44",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ChatInterface />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
