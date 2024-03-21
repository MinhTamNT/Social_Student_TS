import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoute } from "./Route/route";
import { LayoutDefautl } from "./Components/LayoutDefault/LayoutDefautl";
import React from "react";
export const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoute.map((route, index) => {
            const Page = route.component;
            const Layout =
              route.layout === null ? React.Fragment : LayoutDefautl;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
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
