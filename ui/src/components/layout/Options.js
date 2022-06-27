import React, { useContext } from "react";
import AuthContext from "../../context/auth-context";
import classes from "./Options.module.css";
import { NavLink } from "react-router-dom";

// las opciones disponibles dependen del tipo de usuario que esté loggeado
const Options = ({ children }) => {
  const { userInfo } = useContext(AuthContext);
  const rol = userInfo.rol;

  let opciones;
  if (rol === "admin") {
    opciones = (
      <>
        <NavLink activeClassName={classes.activeLink} to="/admin/horas-extras">
          <li>Horas Extras</li>
        </NavLink>
        <NavLink activeClassName={classes.activeLink} to="/admin/empleados">
          <li>Empleados</li>
        </NavLink>
      </>
    );
  } else if (rol === "jefe") {
    opciones = (
      <>
        <NavLink activeClassName={classes.activeLink} to="/horas-extras">
          <li>Horas Extras</li>
        </NavLink>
        <NavLink activeClassName={classes.activeLink} to="/empleados">
          <li>Empleados</li>
        </NavLink>
      </>
    );
  } else if (rol === "empleado") {
    opciones = (
      <>
        <li>Información Empleado</li>
      </>
    );
  }

  return <ul className={classes.options}>{opciones}</ul>;
};

export default Options;
