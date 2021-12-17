import { useDispatch, useSelector } from "react-redux";

import FilterStatuses from "./FilterStatuses";
import FilterInputs from "./FilterInputs";
import ResetButton from "./ResetButton";
import { YEARS } from "../../constants/years";
import { filterData, resetFilter } from "../../redux/actions";
import { stateSelector } from "../../redux/selectors";

import "./filters.style.scss";


interface Props {
  pageName: string;
}

const Filters = ({ pageName }: Props) => {
  const { filterValues, isPageCar } = useSelector(stateSelector);
  const dispatch = useDispatch();
  const reset = () => {
    dispatch(resetFilter());
  };

  const filter = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    dispatch(filterData({ name, value, pageName }));
  };

  const optionalElement = isPageCar && (
    <div className="filter_element-yearSelect">
      <select name="year"
        onChange={filter}>
        {YEARS.map((item: number) => {
          return (
            <option key={item}
              value={item}>
              {item}
            </option>
          )
        })}
      </select>
    </div>
  );

  return (
    <form className="content__options-filter">
      <FilterInputs filter={filter}
        filterValues={filterValues}
      />
      {optionalElement}
      <FilterStatuses filter={filter}
        filterValues={filterValues}
      />
      <ResetButton resetFilters={reset} />
    </form>
  );
};

export default Filters;
