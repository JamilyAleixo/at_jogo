import React from "react";
import { AuthProvider } from "./contexts/auth";
import RoutesApp from "./routes";

const App = () => (
  <AuthProvider>
    <RoutesApp />
  </AuthProvider>
);

export default App;