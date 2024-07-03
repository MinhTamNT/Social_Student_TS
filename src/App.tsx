import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { RouteSocial } from "./Route/route";
import ProtectedRoute, {
  RequireAuth,
} from "./Components/RequireAuth/RequireAuth";
import { LayoutDefault } from "./Components/LayoutDefault/LayoutDefautl";

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
                    {route.isAuthencatied ? (
                      <RequireAuth>
                        <Page />
                      </RequireAuth>
                    ) : (
                      <Page />
                    )}
                  </LayoutComponent>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
};
