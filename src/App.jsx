import { useState } from "react";
import Room from "./pages/Room";
import Home from "./pages/Home";
import Result from "./pages/Result";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { ChakraProvider } from "@mui/material";

import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<Home />} />
          <Route path={`/room`} element={<Room />} />
          <Route path={`/result`} element={<Result />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
