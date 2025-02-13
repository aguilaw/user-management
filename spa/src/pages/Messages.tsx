import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Layout, MessageList } from "../components";
import { useAuth } from "../context";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

const Messages: React.FC = () => {
  const [messages, setMessages] = useState({ received: [], sent: [] });
  const { user } = useAuth();
  const { id } = useParams();
  useEffect(() => {
    getAllMessagesForUser();
  }, []);

  const getAllMessagesForUser = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/users/${id}/messages`
      );
      setMessages(data);
    } catch (error) {
      // TODO; error handler
    }
  };

  return (
    <Layout>
      <Stack direction="column" spacing={2}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5">
            Hello, {user?.firstName}! Here are all your messages
          </Typography>
        </Paper>
        <Paper sx={{ p: 3 }}>
          <Typography variant="body2">
            {messages.received.length > 0
              ? `${messages.received.length} messages received`
              : "No Received Messages"}
          </Typography>
          <MessageList messages={messages.received} />
        </Paper>
        <Paper sx={{ p: 3 }}>
          <Typography variant="body2">
            {messages.sent.length > 0
              ? `${messages.sent.length} messages sent`
              : "No Sent Messages"}
          </Typography>
          <MessageList messages={messages.sent} />
        </Paper>
      </Stack>
    </Layout>
  );
};

export default Messages;
