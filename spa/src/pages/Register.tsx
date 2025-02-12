import { Box, Container, Stack, Typography } from "@mui/material";
import { RegisterForm } from "../components";

const Register: React.FC = () => {
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
