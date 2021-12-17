import { ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { useIntl } from "react-intl";

import Input from "../../commons/Input";
import { statusesSelector } from "../../../redux/selectors";
import { Filter } from "../../../interfaces";

interface Props {
    filter: (event: ChangeEvent<HTMLInputElement>) => void;
    filterValues: Filter;
}

const uuid = require("react-uuid");

const FilterStatuses = ({ filter, filterValues }: Props) => {
    const statuses = useSelector(statusesSelector);
    const intl = useIntl();

    const mapItems = ({ title }: { title: string }) => {
        return (
            <div className="filter-element" key={uuid()}>
                <Input
                    type="radio"
                    name="status"
                    id={"status" + title}
                    onChange={filter}
                    value={title}
                    checked={filterValues.status === title}
                />
                <label htmlFor={"status" + title}>
                    {intl.formatMessage({ id: title })}
                </label>
            </div>
        )
    }

    const mappedItems = statuses.map(mapItems);

    return (
        <div className='filter_element-inputRadio'>
            {mappedItems}
        </div>
    )
}

export default FilterStatuses;
