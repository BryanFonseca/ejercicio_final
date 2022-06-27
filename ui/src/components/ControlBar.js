import React, { useContext } from "react";
import classes from "./ControlBar.module.css";
import { useHistory } from "react-router-dom";
import AdminContext from "../context/admin-context";

const createDocenteComps = (docentesArr) => {
  return docentesArr.map((docente) => (
    <option
      key={docente.id}
      value={docente.id}
    >{`${docente.nombre} ${docente.apellidos}`}</option>
  ));
};

const ControlBar = ({ onFilter }) => {
  const adminCtx = useContext(AdminContext);
  const history = useHistory();
  const agregarHandler = () => {
    history.push("/admin/agregar");
  };

  let docentesOptions;
  if (adminCtx.docentes.length > 0) {
    const docentes = [...adminCtx.docentes];
    docentesOptions = [
      <option key="-1" value="">
        -- ninguno --
      </option>,
      ...createDocenteComps(docentes),
    ];
  } else {
    docentesOptions = [
      <option key="-1" value="">
        --ninguno--
      </option>,
    ];
  }

  return (
    <div className={classes.controlBar}>
      <div>
        <button id="agregar" onClick={agregarHandler}>
          Agregar Curso
        </button>
      </div>
      <div className={classes.filterContainer}>
        <label htmlFor="filtro">Filtrar por docente</label>
        <select onChange={onFilter} id="filtro">
          {docentesOptions}
        </select>
      </div>
    </div>
  );
};

export default ControlBar;
