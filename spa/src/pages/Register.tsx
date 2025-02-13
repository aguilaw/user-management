import { Box, Container, Stack, Typography } from "@mui/material";
import { RegisterForm } from "../components";
import { useNavigate } from "react-router";
import { useAuth } from "../context";
import { useEffect } from "react";

const Register: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
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
        <RegisterForm />
      </Container>
    </Stack>
  );
};

export default Register;
