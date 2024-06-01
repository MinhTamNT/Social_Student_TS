import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LayoutDefautl } from "./Components/LayoutDefault/LayoutDefautl";
import React from "react";
import { RouteSocial } from "./Route/route";
import ProtectedRoute from "./Components/RequireAuth/RequireAuth";

export const App = () => {
  return (
    <Router>
      <div className="App md:h-screen">
        <Routes>
          {RouteSocial.map((route, index) => {
            const Page = route.component;
            const Layout =
              route.layout === null ? React.Fragment : LayoutDefautl;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    {route.isAuthencatied ? (
                      <ProtectedRoute>
                        <Page />
                      </ProtectedRoute>
                    ) : (
                      <Page />
                    )}
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
};
