import React from 'react';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      backgroundColor: "#FFFFFF",
      borderColor: "#FFB549",
      color: "FFB549",
      fontWeight: 600,
      marginBottom: "8px",
      "&:hover": {
        backgroundColor: "FFB549",
        color: "#fff",
      },
    },
  })
);

const Answer = (props) => {

  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color="light"
      disableElevation
      onClick={() => props.select(props.content, props.nextId)}
      className={classes.button}
    >
      {props.content}
    </Button>
  );
}

export default Answer