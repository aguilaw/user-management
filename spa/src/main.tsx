import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router";
import { Home, Messages, NotFound, Register } from "./pages";
import { AuthProvider, useAuth } from "./context";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(user);
    //TODO: check for TOKEN instead?
    if (!user?.id) {
      navigate("/register");
    }
  }, []);
  return children;
};

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <CssBaseline />
      <AuthProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          {/* add Extra auth rules to this route. Currently any logged in user can see any other users messages. by providing the id */}
          <Route
            path="/users/:id"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <NotFound />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
);
