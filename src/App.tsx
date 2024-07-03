import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RouteSocial } from "./Route/route";
import { RequireAuth } from "./Components/RequireAuth/RequireAuth";
import { LayoutDefault } from "./Components/LayoutDefault/LayoutDefautl";
import { Login } from "./Page/Login/Login";
import { Register } from "./Page/Register/Register";

export const App = () => {
  return (
    <Router>
      <div className="App md:h-screen">
        <Routes>
          {RouteSocial.map((route, index) => {
            const Page = route.component;
            const LayoutComponent =
              route.layout === null ? route.component : LayoutDefault;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <LayoutComponent>
                    <RequireAuth>
                      <Page />
                    </RequireAuth>
                  </LayoutComponent>
                }
              />
            );
          })}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};
