import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "./Config/routes";
import { Box } from "@mui/material";


function App() {
  return (
    <div className="App">
      <Box p={2} fixed className="header">Anime Search App</Box>

      <Router>
          <Routes>
            {routes.map(({ path, name, element }, key) => {
              return (
                <Route
                  key={element}
                  exact
                  path={path}
                  name={name}
                  element={element}
                />
              );
            })}
          </Routes>
          </Router>
    </div>
  );
}

export default App;
