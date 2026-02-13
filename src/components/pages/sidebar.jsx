import React, { useState } from "react";
import "./sidebar.css";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      {/* Bouton toggle */}
      <button 
        className="toggle-btn"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${open ? "open" : ""}`}>
        <h3>Historique</h3>
        <ul>
          <li>Conversation 1</li>
          <li>Conversation 2</li>
          <li>Conversation 3</li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;