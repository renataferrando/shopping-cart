import { useState } from "react";

import Drawer from "./Drawer";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="app">
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        Trigger Drawer
      </button>

      <Drawer position="right" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <button type="button" onClick={() => setIsOpen(false)}>
          Close
        </button>
      </Drawer>
    </div>
  );
}
