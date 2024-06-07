// src/App.js
import React from "react";
import { Container, Typography, Paper, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import PostList from "./components/PostList";
import theme from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper style={{ minHeight: "100vh" }}>
        <Container>
          <PostList />
        </Container>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
