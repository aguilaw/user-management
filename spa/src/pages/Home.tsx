import { Paper, Stack, Typography } from "@mui/material";
import { Layout } from "../components";
import { useAuth } from "../context";
import { UserList } from "../components";

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <Stack direction="column" spacing={2}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5">
            Hello {user?.firstName}! You can now send messages to other users
          </Typography>
        </Paper>
        <Paper>
          <UserList />
        </Paper>
      </Stack>
    </Layout>
  );
};

export default Home;
