import { useState } from "react";
import Room from "./pages/Room";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Topic from "./pages/Topic";
import RandomTopic from "./pages/Topic/RandomTopic";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { ChakraProvider } from "@mui/material";

import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<Home />} />
          <Route path={`/topic`} element={<Topic />} />
          <Route path={`/randomtopic`} element={<RandomTopic />} />
          <Route path={`/room`} element={<Room />} />
          <Route path={`/result`} element={<Result />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
