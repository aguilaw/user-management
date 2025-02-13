import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { LoginForm, RegisterForm } from "../components";
import { useNavigate } from "react-router";
import { useAuth } from "../context";
import { useEffect, useState } from "react";

const Register: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formType, setFormType] = useState<"login" | "register">("login");
  useEffect(() => {
    //no need to register if we already have an active token
    if (user?.id) {
      navigate("/");
    }
  }, [user]);

  return (
    <Stack
      direction="column"
      justifyContent="center"
      sx={{
        background: "#2e77c5",
        height: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ p: 3 }}>
          <Typography textAlign="center" variant="h3" sx={{ color: "white" }}>
            Welcome! Please register below
          </Typography>
        </Box>
        {formType === "login" ? <LoginForm /> : <RegisterForm />}
      </Container>
      {formType === "login" ? (
        <Button
          variant="text"
          sx={{ color: "white" }}
          onClick={() => setFormType("register")}
        >
          Create Account
        </Button>
      ) : (
        <Button
          variant="text"
          sx={{ color: "white" }}
          onClick={() => setFormType("login")}
        >
          Login
        </Button>
      )}
    </Stack>
  );
};

export default Register;
