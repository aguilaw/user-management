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
import LogoutIcon from "@mui/icons-material/Logout";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const goToMyMessages = () => {
    navigate(`/users/${user?.id}`);
  };
  const goHome = () => {
    navigate(`/`);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl" fixed>
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1 }}>
              <Box onClick={goHome}>
                <Typography
                  variant="h6"
                  component="div"
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
              <Button
                variant="text"
                startIcon={<LogoutIcon />}
                onClick={logout}
                sx={{ color: "white" }}
              >
                Logout
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
