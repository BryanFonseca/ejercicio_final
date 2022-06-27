import React, { useContext, useEffect, useState } from "react";
import ControlBar from "../../components/ControlBar";
import CursoItem from "../../components/CursoItem";
import List from "../../components/List";
import AdminContext from "../../context/admin-context";

const AllCursos = () => {
  const { cursos } = useContext(AdminContext);
  const [cursosLocal, setCursosLocal] = useState([]);

  useEffect(() => {
    setCursosLocal(cursos);
  }, [cursos]);

  if (!cursosLocal) return null;

  const filtrarHandler = (e) => {
    // esto es muy imperativo
    const docenteId = +e.target.value;
    if (!docenteId) {
      setCursosLocal(cursos);
      return;
    }
    setCursosLocal(cursos.filter((curso) => curso.docente.id === docenteId));
  };

  let cursosComponents;
  if (cursosLocal.length > 0) {
    cursosComponents = cursosLocal.map((curso) => (
      <CursoItem
        key={curso.id}
        id={curso.id}
        nombre={curso.nombre}
        horaInicio={curso.horaInicio}
        horaSalida={curso.horaSalida}
        nombreDocente={`${curso.docente.nombre} ${curso.docente.apellidos}`}
      />
    ));
  } else {
    cursosComponents = null;
  }
  return (
    <>
      <header>
        <h2>Todos los Cursos</h2>
      </header>
      <ControlBar onFilter={filtrarHandler} />
      <section className="scrollableContainer">
        <List>{cursosComponents}</List>
      </section>
    </>
  );
};

export default AllCursos;
