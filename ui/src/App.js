import { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AppContext, { AppContextProvider } from "./context/app-context";
import Login from "./pages/Login";
import Admin from "./pages/admin/Admin";
import Layout from "./components/layout/Layout";
import Agregar from "./pages/admin/Agregar";
import AdminContext from "./context/admin-context";
import { AdminContextProvider } from "./context/admin-context";
import AuthContext from "./context/auth-context";
import Editar from "./pages/admin/Editar";
import Signup from './pages/Signup';

function App() {
  const { userInfo } = useContext(AuthContext);
  const adminCtx = useContext(AdminContext);

  const isLoggedIn = !!userInfo.token;
  let redirectOnFirstLoad;
  if (isLoggedIn) {
    // este valor no está diponible durante el primer renderizado.
    // debería user useEffect dependiente en userInfo.token y estado
    // local para implementar la redirección cuando aquel valor esté disponible
    if (userInfo.isAdmin) {
      redirectOnFirstLoad = <Redirect to="/admin/all" />;
    } else {
      redirectOnFirstLoad = <Redirect to="/docente" />;
    }
  } else {
    redirectOnFirstLoad = <Redirect to="/login" />;
  }
  return (
    <Switch>
      <Route path="/" exact>
        {redirectOnFirstLoad}
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Layout>
        {userInfo.isAdmin ? (
          <AdminContextProvider>
            <Route path="/admin/agregar">
              <Agregar />
            </Route>
            <Route path="/admin/editar/:id">
              <Editar />
            </Route>
            <Route path="/admin/horas-extras">{null}</Route>
          </AdminContextProvider>
        ) : null}

        {userInfo.isAdmin === false ? (
          <AppContextProvider>
            <Route path="/horas-extras">{null}</Route>
            <Route path="/empleados">{null}</Route>
          </AppContextProvider>
        ) : null}
      </Layout>
    </Switch>
  );
}

export default App;
