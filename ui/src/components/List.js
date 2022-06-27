import React from "react";
import classes from "./List.module.css";

const List = ({ children }) => {
  return <ul className={classes.container}>{children}</ul>;
};

export default List;
