import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/pages/Landing";
import Game from "./components/pages/Game";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
