import { useContext, useRef, Dispatch, SetStateAction, MutableRefObject } from "react";
import { useSelector } from "react-redux";

import { filteredDataContext, filteredValuesContext } from "../../context/context";
import { RootState } from "../../store/rootReducer";
import { Data } from "../../interfaces/interfaces";

import DriverFilter from "./driverFilter/DriverFilter";
import CarFilter from "./carFilter/CarFilter";

import "./filters.style.scss";


const Filter = ({ title }: { title: string }) => {
  const data = useSelector((state: RootState) => state.dataReducer);
  const [isFiltered, setIsFiltered]: [boolean, Dispatch<SetStateAction<boolean>>] = useContext(filteredDataContext).filter;
  const { datas, isDataEmpty } = useContext(filteredDataContext);
  const filtersValues: MutableRefObject<{ [key: string]: string }> = useRef({});

  const resetFilters = () => {
    isDataEmpty.current = true;
    filtersValues.current = {};
    setIsFiltered(!isFiltered);
  };

  if (filtersValues.current.title && filtersValues.current.title !== title) {
    resetFilters();
  }

  const filter = (event: React.ChangeEvent<HTMLInputElement>) => {
    filtersValues.current.title = title;
    filtersValues.current[event.target.name] = event.target.value;
    let result = data;

    for (let key in filtersValues.current) {
      if (key === "title") {
        continue;
      }
      result = result.filter((item: Data | any) => {
        if (key === "status") {
          return (filtersValues.current)[key] ===
            item.status.title
            ? true
            : false;
        } else {
          return String(item[key]).toLocaleLowerCase()
            .includes(filtersValues.current[key].toLocaleLowerCase())
            ? true : false;
        }
      });
    }

    datas.current = result;
    isDataEmpty.current = false;
    setIsFiltered(!isFiltered);
  };

  return (
    <form className="content__options-filter">
      <filteredValuesContext.Provider value={filtersValues}>
        {title === "driver" ? (
          <DriverFilter searchDriver={filter} resetFilters={resetFilters} data={data} />
        ) : (
          <CarFilter {...{ searchCar: filter, resetFilters: resetFilters }} />
        )}
      </filteredValuesContext.Provider>
    </form>
  );
};

export default Filter;
