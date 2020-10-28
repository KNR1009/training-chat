import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Masl from '../assets/imgae/istockphoto.jpg'
import Noimage from '../assets/imgae/no-profile.png'





const Chat = (props) => {
  const isQuestion = (props.type === "question"); // questionかanswerかの判別
  const classes = isQuestion ? "p-chat__row" : "p-chat__reverse"


  return (
    <ListItem alignItems="flex-start" className={classes}>
      <ListItemAvatar>
        {isQuestion ? <Avatar src={Masl} /> : <Avatar src={Noimage} />}
      </ListItemAvatar>
      <div className="p-chat__bubble chat__reverse">{props.text}</div>
    </ListItem>
  );
};

export default Chat;
