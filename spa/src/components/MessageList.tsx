import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

//TODO:define type for messages
const MessageList: React.FC<{ messages: any[] }> = ({ messages }) => {
  return (
    <List>
      {messages.map(({ id, fullName, body, sentOn }) => (
        <ListItem key={id}>
          <ListItemAvatar>
            <Avatar alt={fullName} />
          </ListItemAvatar>
          {/* TODO: util to prettify dates */}
          <ListItemText
            primary={body}
            secondary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "text.primary", display: "inline" }}
                >
                  {fullName}
                </Typography>
                {" - " + sentOn}
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default MessageList;
