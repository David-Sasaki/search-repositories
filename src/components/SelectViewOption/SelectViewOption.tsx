import React from "react";
import "./SelectViewOption.css";
import { ViewOption } from "../../types/types-index";

enum ButtonStatus {
  Active = "active-button",
  Passive = "passive-button",
}

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
          selectedOption === ViewOption.TableView
            ? ButtonStatus.Active
            : ButtonStatus.Passive
        }
        disabled={selectedOption === ViewOption.TableView}
        onClick={() => {
          onOptionChange(ViewOption.TableView);
        }}
      >
        {ViewOption.TableView}
      </button>
      <button
        className={
          selectedOption === ViewOption.CardView
            ? ButtonStatus.Active
            : ButtonStatus.Passive
        }
        disabled={selectedOption === ViewOption.CardView}
        onClick={() => {
          onOptionChange(ViewOption.CardView);
        }}
      >
        {ViewOption.CardView}
      </button>
    </div>
  );
};

export default SelectViewOption;
