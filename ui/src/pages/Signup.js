import { useContext } from "react";
import AuthContext from "../context/auth-context";
import classes from "./Login.module.css";
import useHttp from "../hooks/use-http";

import { API_BASE_URL } from "../globals";
import { useHistory } from "react-router-dom";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "../components/forms/TextInput";
import Select from "../components/forms/Select";

const SignupFormik = () => {
  const history = useHistory();
  const { dispatchSingup } = useContext(AuthContext);
  const { sendRequest, serverErrorMessage, isLoading } = useHttp();

  const registrarseHandler = (values) => {
    sendRequest({
      method: "POST",
      url: `${API_BASE_URL}/auth/signup`,
      body: {
        nombre: values.nombre,
        apellidos: values.apellidos,
        user: values.user,
        password: values.password,
        rol: values.rolId,
      },
    }).then(() => {
      alert("Registrado con éxito. Procede a iniciar sesión.");
      history.replace("/login");
    });
  };

  const cancelarHandler = () => {
    history.replace("/login");
  };

  return (
    <Formik
      initialValues={{
        nombre: "",
        apellidos: "",
        user: "",
        password: "",
        rolId: "empleado",
      }}
      validationSchema={Yup.object({
        nombre: Yup.string().min(4).required("Campo requerido."),
        apellidos: Yup.string().required("Campo requerido."),
        user: Yup.string().required("Campo requerido."),
        password: Yup.string().required("Campo requerido."),
      })}
      onSubmit={registrarseHandler}
    >
      <Form>
        <TextInput
          label="Nombre del usuario"
          name="nombre"
          type="text"
          placeholder="nombre"
        />
        <TextInput
          label="Apellidos del usuario"
          name="apellidos"
          type="text"
          placeholder="apellidos"
        />
        <TextInput label="user" name="user" type="text" placeholder="user" />
        <TextInput
          label="contraseña"
          name="password"
          type="password"
          placeholder="contraseña"
        />

        <Select label="rol" name="rolId">
          <option value="jefe">jefe</option>
          <option value="empleado">empleado</option>
        </Select>

        <button type="submit">Registrar</button>
        <button onClick={cancelarHandler} type="button">
          Cancelar
        </button>
      </Form>
    </Formik>
  );
};

export default SignupFormik;
