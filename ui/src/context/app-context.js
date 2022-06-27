import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../globals";
import useHttp from "../hooks/use-http";
import AuthContext from "./auth-context";

// fill up for autocompletion help
const AppContext = createContext({});

export const AppContextProvider = (props) => {
  const authCtx = useContext(AuthContext);
  const { sendRequest } = useHttp();
  return <AppContext.Provider value={{}}>{props.children}</AppContext.Provider>;
};

export default AppContext;
