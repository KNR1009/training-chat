import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import {Chat} from './index'

const useStyles = makeStyles(() =>
  createStyles({
    chats: {
      height: "400px",
      padding: "0px",
      overflow: "auto",
    },
  })
);

const Chats = (props) => {
  const classes = useStyles();

  return (
    <List className={classes.chats} id={"scrollarea"}>
      {props.chats.map((value, index)=>{
        return <Chat text={value.text} type={value.type} key={index} />
      })}
    </List>
  );
}

export default Chats