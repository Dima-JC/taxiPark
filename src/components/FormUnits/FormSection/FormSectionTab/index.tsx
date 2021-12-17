import { useState, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import Statuses from "../../../Statuses";
import { Data, Status } from "../../../../interfaces";
import { patchData } from "../../../../redux/actions";
import { statusesSelector } from "../../../../redux/selectors";
import { immutableFields } from "../../../../constants/commons";

import "./formSectionTab.style.scss";

interface Props {
  value: string | number | Status;
  property: string;
  pageName: string;
  id: string;
  data: Data;
}

type KeyboardEvent = React.KeyboardEvent<HTMLInputElement>;
type FocusEvent = React.FocusEvent<HTMLInputElement>;

const FormSectionTab = ({ value, property, pageName, data, id }: Props) => {
  const statuses = useSelector(statusesSelector);
  const [selectValue, setSelectValue] = useState<string>((value as Status).title);
  const [isMutable, setIsMutable] = useState<boolean>(true);
  const dispatch = useDispatch();

  const changeElementType = (event: MouseEvent<HTMLElement>) => {
    if (!immutableFields.includes(property)) {
      if (!((event.target as HTMLElement).className === "table_input")) {
        setIsMutable(!isMutable);
      }
    }
  }

  const patchNewInformation = (newValue: string | Status, property: string) => {
    (data[property as keyof Data] as string | Status) = newValue;
    setIsMutable(!isMutable);
    dispatch(patchData(pageName, id, { [property]: newValue }));
  };

  const saveInput = (event: KeyboardEvent | FocusEvent) => {
    if (event.hasOwnProperty("key") && (event as KeyboardEvent).key !== "Enter") {
      return;
    }

    const target = event.target as HTMLInputElement;
    target.value
      ? patchNewInformation(target.value, target.id)
      : setIsMutable(!isMutable);
  }

  const saveStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTitle = event.target.value;
    const status = statuses.find((status: Status) => status.title === newTitle)!;
    setSelectValue(newTitle);
    patchNewInformation(status, event.target.id);
  };

  if (property === "status") {
    return (
      <Statuses
        name="status"
        className="table_section-tab-select"
        value={selectValue}
        onChange={saveStatus}
        id={property} />
    )
  }

  const element = isMutable
    ? (
      <p className="table_paragraph"
        onClick={changeElementType}
        id={property}>
        {data[property as keyof Data]}
      </p>
    ) : (
      <input
        type="text"
        placeholder={String(data[property as keyof Data])}
        className="table_input"
        autoFocus={true}
        onClick={changeElementType}
        onBlur={saveInput}
        onKeyPress={saveInput}
        id={property}
      />)

  return (
    <div className="table-section-tab">
      {element}
    </div>
  );
};

export default FormSectionTab;
