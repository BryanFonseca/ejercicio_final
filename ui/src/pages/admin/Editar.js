import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import CursoForm from "../../components/forms/CursoForm";
import AdminContext from "../../context/admin-context";

const Editar = () => {
  const history = useHistory();
  const cancelarHandler = () => {
    history.goBack();
  };

  const submitHandler = (values) => {
    alert("Aún por implementar :)");
    console.log(values);
  };

  const { id } = useParams();
  const { cursos } = useContext(AdminContext);
  if (cursos.length <= 0) return null;

  const cursoEditar = cursos.find((curso) => curso.id === +id);
  const { nombre, horaInicio, horaSalida, fechaInicio } = cursoEditar;
  const profesorId = cursoEditar.docente.id;

  return (
    <>
      <header>
        <h2>Editar Curso</h2>
      </header>
      <section>
        <CursoForm
          id={id}
          nombre={nombre}
          horaInicio={horaInicio}
          horaSalida={horaSalida}
          fechaInicio={fechaInicio}
          profesorId={profesorId}
          onSubmit={submitHandler}
        />
        <button onClick={cancelarHandler}>Cancelar</button>
      </section>
    </>
  );
};

export default Editar;
