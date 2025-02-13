import React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useAuth } from "../context";
import { Comment } from "@mui/icons-material";
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const goToMyMessages = () => {
    navigate(`/users/${user?.id}`);
  };
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl" fixed>
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                component="a"
                sx={{
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                LOGO
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <Button
                variant="text"
                startIcon={<Comment />}
                onClick={goToMyMessages}
                sx={{ color: "white" }}
              >
                My Messages
              </Button>

              <IconButton sx={{ p: 0 }}>
                <Avatar alt={`${user?.firstName} ${user?.lastName}`} />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="sm" sx={{ p: 3 }}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
