import { Provider } from "react-redux";
import { store } from "./app/store";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import ChatInterface from "./components/ChatInterface";

const theme = createTheme();

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
