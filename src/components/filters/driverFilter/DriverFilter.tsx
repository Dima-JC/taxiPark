import { useContext, Dispatch, SetStateAction, ChangeEventHandler, MouseEventHandler } from "react";

import { receivedDataContext, filteredValuesContext } from "../../../context/context";

import Input from "../../regularComponents/input/Input";

import { Data, Status } from '../../../interfaces/interfaces';

interface CurrentValue {
  current: Record<string, string>;
};

interface Props {
  searchDriver: ChangeEventHandler<HTMLInputElement>;
  resetFilters: MouseEventHandler<HTMLButtonElement>;
};

interface ReceivedData {
  info: Data[];
  statuses: Status[];
};


const DriverFilter = (props: Props) => {
  const [receivedData, setReceivedData]: [ReceivedData, Dispatch<SetStateAction<ReceivedData>>] = useContext(receivedDataContext);
  const filtersValues: CurrentValue = useContext(filteredValuesContext);

  const searchUser: ChangeEventHandler<HTMLInputElement> | undefined = props.searchDriver;
  const resetFilters: MouseEventHandler<HTMLButtonElement> | undefined = props.resetFilters;

  return (
    <>
      <div className='filter_element-inputs'>
        <Input onChange={searchUser}
          name="id"
          placeholder="Search by ID"
          value={(filtersValues.current as { [key: string]: string }).id || ""} />
        <Input
          onChange={searchUser}
          name="first_name"
          placeholder="Search by name"
          value={(filtersValues.current as { [key: string]: string })["first_name"] || ""}
        />
        <Input
          onChange={searchUser}
          name="last_name"
          placeholder="Search by surname"
          value={(filtersValues.current as { [key: string]: string })["last_name"] || ""}
        />
      </div>
      <div className='filter_element-inputRadio'>
        {receivedData.statuses &&
          receivedData.statuses.map((item: any, index: number) => {
            return (
              <div className="filter-element" key={index}>
                <Input
                  type="radio"
                  name="status"
                  id={"status" + index}
                  onChange={searchUser}
                  value={item.title}
                  checked={(filtersValues.current as { [key: string]: string }).status === item.title}
                />
                <label htmlFor={"status" + index}>{item.title}</label>
              </div>
            );
          })}
      </div>
      <div className="reset-filter-button">
        <button
          onClick={resetFilters}>
          Reset
        </button>
      </div>
    </>
  );
}

export default DriverFilter;
