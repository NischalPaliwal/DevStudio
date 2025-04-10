import BuilderPage from "./pages/BuilderPage";
import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path='/' Component={LandingPage} />
      <Route path='/build' Component={BuilderPage} />
    </Routes>
  );
}

export default App;