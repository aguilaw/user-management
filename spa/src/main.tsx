import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router";
import { Home, NotFound, Register } from "./pages";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <CssBaseline />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
);
