import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/pages/Landing";
import Game from "./components/pages/Game";

function App() {
  return (
    <div className="h-screen bg-gray-900">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/play" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
