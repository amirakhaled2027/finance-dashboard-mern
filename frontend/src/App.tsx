import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useMemo } from "react"
import { themeSettings } from "./theme"
import { Box, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "@/scenes/navbar";
import Dashboard from "@/scenes/dashboard";

function App() {
  //[] : coz we're using useMemo, we wanna make sure it only happens once on initial load
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            {/* this is gonna reset the css settings to default that material UI has set*/}
            <CssBaseline />
            <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
              <Navbar/>
              <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/predictions" element={<div>predictions page</div>}/>
              </Routes>
            </Box>
          </ThemeProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App