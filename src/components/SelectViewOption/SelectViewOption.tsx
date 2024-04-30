import React from "react";
import "./SelectViewOption.css";

interface SelectedViewOptionProps {
  selectedOption: string;
  onOptionChange: (value: string) => void;
}

const SelectViewOption: React.FC<SelectedViewOptionProps> = ({
  selectedOption,
  onOptionChange,
}) => {
  return (
    <div>
      <button
        className={
          selectedOption === "tableView" ? "active-button" : "passive-button"
        }
        disabled={selectedOption === "tableView"}
        onClick={() => {
          onOptionChange("tableView");
        }}
      >
        Table View
      </button>
      <button
        className={
          selectedOption === "cardView" ? "active-button" : "passive-button"
        }
        disabled={selectedOption === "cardView"}
        onClick={() => {
          onOptionChange("cardView");
        }}
      >
        Card View
      </button>
    </div>
  );
};

export default SelectViewOption;
