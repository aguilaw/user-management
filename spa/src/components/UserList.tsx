import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material";
import { useAuth } from "../context";
import CommentIcon from "@mui/icons-material/Comment";
import { useEffect, useState } from "react";
import axios from "axios";
import { Delete, Send } from "@mui/icons-material";

const UserList: React.FC = ({}) => {
  const { user, token } = useAuth();
  const [openMessage, setOpenMessage] = useState(0);
  const [messageBody, setMessageBody] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/users`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(data);
    } catch (error) {
      // TODO; error handler
    }
  };
  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await getAllUsers();
    } catch (error) {
      // TODO; error handler
    }
  };
  const sendMessageToId = async (id: number) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/users/${id}/messages`,
        {
          fromUserId: user?.id,
          body: messageBody,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessageBody("");
      setOpenMessage(0);
    } catch (error) {
      // TODO; error handler
    }
  };
  const OpenMessageBoxForId = (id: number) => {
    setOpenMessage(id);
    setMessageBody("");
  };
  return (
    <List>
      {users.map(({ firstName, lastName, id }) => (
        <ListItem
          key={id}
          secondaryAction={
            <>
              {openMessage === id ? (
                <IconButton
                  aria-label="Send"
                  onClick={() => sendMessageToId(id)}
                >
                  <Send />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="Message"
                  onClick={() => OpenMessageBoxForId(id)}
                >
                  <CommentIcon />
                </IconButton>
              )}

              <IconButton aria-label="Delete" onClick={() => deleteUser(id)}>
                <Delete />
              </IconButton>
            </>
          }
        >
          <ListItemAvatar>
            <Avatar alt={firstName} />
          </ListItemAvatar>
          <ListItemText
            primary={`${firstName} ${lastName}`}
            secondary={
              openMessage === id && (
                <TextField
                  fullWidth
                  variant="standard"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setMessageBody(event?.target.value)
                  }
                />
              )
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default UserList;
