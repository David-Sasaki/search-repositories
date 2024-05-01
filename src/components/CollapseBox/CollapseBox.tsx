import React, { useState } from "react";
import "./CollapseBox.css";

interface CollapseBoxProps {
  title: string;
  content: string;
}

const CollapseBox: React.FC<CollapseBoxProps> = ({ title, content }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="collapse-box">
      <hr />
      <div className="toggle-bar">
        <h3>{title}</h3>
        {!open && <button onClick={() => setOpen(true)}>v</button>}
        {open && <button onClick={() => setOpen(false)}>^</button>}
      </div>
      {open && <p className="collapse-content">{content}</p>}
    </div>
  );
};

export default CollapseBox;
