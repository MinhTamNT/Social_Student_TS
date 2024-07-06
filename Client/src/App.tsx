import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RouteSocial } from "./Route/route";
import { RequireAuth } from "./Components/RequireAuth/RequireAuth";
import { LayoutDefault } from "./Components/LayoutDefault/LayoutDefautl";
import { Login } from "./Page/Login/Login";
import { Register } from "./Page/Register/Register";
import React from "react";
import { RestPassword } from "./Page/RestPassword/RestPassword";

export const App = () => {
  return (
    <Router>
      <div className="App md:h-screen">
        <Routes>
          {RouteSocial.map((route, index) => {
            const Page = route.component;
            let LayoutComponent = LayoutDefault;

            if (route.layout) {
              LayoutComponent = route.layout;
            } else if (route.layout === null) {
              LayoutComponent = React.Fragment;
            }
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
          <Route path="/rest-password" element={<RestPassword />} />
        </Routes>
      </div>
    </Router>
  );
};
