import React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
            <IconButton sx={{ p: 0 }}>
              <Avatar alt={"USER NAME"} />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="md">{children}</Container>
    </>
  );
};

export default Layout;
