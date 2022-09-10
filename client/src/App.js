import "./App.scss";
import { Route, Routes } from "react-router";
import { GurpsCharacterPage } from "./pages/GurpsCharacter";
import { DndCharacterPage } from "./pages/DndCharacter";
import { SwadeCharacterPage } from "./pages/SwadeCharacter";
import { DndSpellsPage } from "./pages/DndSpells";
import { Home } from "./pages/Home";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gurpscharacter" element={<GurpsCharacterPage />} />
        <Route path="/dndcharacter" element={<DndCharacterPage />} />
        <Route path="/dndspells" element={<DndSpellsPage />} />
        <Route path="/swadecharacter" element={<SwadeCharacterPage />} />
      </Routes>
    </div>
  );
}
