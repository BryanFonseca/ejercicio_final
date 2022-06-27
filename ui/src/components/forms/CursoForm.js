import React, { useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "./TextInput";
import DateInput from "./DateInput";
import TimeInput from "./TimeInput";
import Select from "./Select";
import AdminContext from "../../context/admin-context";

const createDocenteComps = (docentesArr) => {
  return docentesArr.map((docente) => (
    <option
      key={docente.id}
      value={docente.id}
    >{`${docente.nombre} ${docente.apellidos}`}</option>
  ));
};

const CursoForm = ({
  nombre = "",
  horaInicio = "",
  horaSalida = "",
  fechaInicio = "",
  profesorId = "",
  onSubmit = () => {},
}) => {
  const adminCtx = useContext(AdminContext);
  let docentesOptions;
  if (adminCtx.docentes.length > 0) {
    const docentes = [...adminCtx.docentes];
    if (profesorId) {
      const selectedProfesor = docentes.find(
        (docente) => docente.id === profesorId
      );
      docentesOptions = createDocenteComps([
        selectedProfesor,
        ...docentes.filter((docente) => docente.id !== selectedProfesor.id),
      ]);
    } else {
      docentesOptions = [
        <option key="-1" value="">
          -- ninguno --
        </option>,
        ...createDocenteComps(docentes),
      ];
    }
  } else {
    docentesOptions = [
      <option key="-1" value="">
        --ninguno--
      </option>,
    ];
  }

  return (
    <Formik
      initialValues={{
        nombre,
        horaInicio,
        horaSalida,
        fechaInicio,
        profesorId,
      }}
      validationSchema={Yup.object({
        profesorId: Yup.number().required("Campo requerido."),
        nombre: Yup.string().required("Campo requerido."),
        horaInicio: Yup.string().required("Campo requerido."),
        horaSalida: Yup.string().required("Campo requerido."),
        fechaInicio: Yup.string().required("Campo requerido."),
      })}
      onSubmit={onSubmit}
    >
      <Form>
        <TextInput
          label="Nombre de curso"
          name="nombre"
          type="text"
          placeholder="curso ejemplo"
        />
        <TimeInput
          label="Hora inicio"
          name="horaInicio"
          type="time"
          placeholder="15:00"
        />

        <TimeInput
          label="Hora salida"
          name="horaSalida"
          type="time"
          placeholder="16:00"
        />
        <DateInput
          label="Fecha inicio"
          name="fechaInicio"
          type="date"
          placeholder="2022-06-22"
        />

        <Select label="Profesor" name="profesorId">
          {docentesOptions}
        </Select>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default CursoForm;
