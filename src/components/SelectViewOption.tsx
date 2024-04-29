import React, { ChangeEvent } from "react";

interface SelectedViewOptionProps {
  selectedOption: string;
  onOptionChange: (value: string) => void;
}

const SelectViewOption: React.FC<SelectedViewOptionProps> = ({
  selectedOption,
  onOptionChange,
}) => {
  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    onOptionChange(e.target.value);
  };

  return (
    <div>
      <label>
        <input
          type="radio"
          value="tableView"
          checked={selectedOption === "tableView"}
          onChange={handleOptionChange}
        />
        Table View
      </label>
      <label>
        <input
          type="radio"
          value="cardView"
          checked={selectedOption === "cardView"}
          onChange={handleOptionChange}
        />
        Card View
      </label>
    </div>
  );
};

export default SelectViewOption;
