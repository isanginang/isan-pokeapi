import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PokePage from "./pages/PokePage";
import Types from "./pages/Types";
import TypePage from "./pages/TypePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/type" element={<Types />} />
        <Route path="/pokemon/:id" element={<PokePage />} />
        <Route path="/type/:id" element={<TypePage />} />
      </Routes>
    </Router>
  );
};

export default App;
