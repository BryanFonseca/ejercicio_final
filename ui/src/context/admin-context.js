import { createContext, useState, useReducer, useEffect } from "react";
import useHttp from "../hooks/use-http";
import { API_BASE_URL } from "../globals";

// fill up for autocompletion help
const AdminContext = createContext({});

export const AdminContextProvider = (props) => {
  const { sendRequest } = useHttp();

  return (
    <AdminContext.Provider value={{}}>{props.children}</AdminContext.Provider>
  );
};

export default AdminContext;
