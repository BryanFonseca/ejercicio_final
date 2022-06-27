import React, { useContext } from "react";
import classes from "./Layout.module.css";
import { useHistory } from "react-router-dom";
import Options from "./Options";
import AuthContext from "../../context/auth-context";

const Layout = ({ children, ...props }) => {
  const { userInfo, dispatchLogout } = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = () => {
    dispatchLogout({ type: "LOGOUT", payload: null });
    history.replace("/login");
  };

  return (
    <div className={classes.layoutContainer}>
      <aside className={classes.sideBar}>
        <div className={classes.sideBarTop}>
          <div className={classes.info}>
            <p>{userInfo.rol} </p>
            <p>{userInfo.nombres}</p>
          </div>
          <Options />
        </div>
        <button className={classes.logoutButton} onClick={logoutHandler}>
          Cerrar sesión
        </button>
      </aside>
      <main className={classes.main}>{children}</main>
    </div>
  );
};

export default Layout;
