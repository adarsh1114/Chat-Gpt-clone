import { Route,Routes } from 'react-router-dom';
import './App.css';
import {useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Register from './pages/Register';
import Login from './pages/Login';
import { Toaster } from "react-hot-toast";

import Paragraph from './pages/Paragraph';
import ChatBot from './pages/ChatBot';
import Summary from './pages/Summary';
import JsConverter from './pages/JsConverter';

function App() {
  const theme = useMemo(() => createTheme(themeSettings()), []);
  return (
    <>
    <ThemeProvider theme={theme}>
     <CssBaseline/>
      <Navbar/>
      <Toaster />
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/summary' element={<Summary/>}/>
        <Route path='/paragraph' element={<Paragraph/>}/>
        <Route path='/chatbot' element={<ChatBot/>}/>
        <Route path='/js-converter' element={<JsConverter/>}/>

      </Routes>
    </ThemeProvider>
    </>
  );
}

export default App;
