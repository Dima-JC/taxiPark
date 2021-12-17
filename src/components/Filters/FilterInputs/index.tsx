import { ChangeEvent } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";

import Input from "../../commons/Input";
import { CAR_INFO, DRIVE_INFO } from "../../../constants/filterInputs"
import { Filter } from "../../../interfaces";
import { isPageCarSelector } from "../../../redux/selectors";

interface Props {
    filter: (event: ChangeEvent<HTMLInputElement>) => void;
    filterValues: Filter;
}

interface Info {
    name: string;
    placeholder: string;
};

const FilterInputs = ({ filter, filterValues }: Props) => {
    const isPageCar = useSelector(isPageCarSelector);
    const inputInfo = (isPageCar && CAR_INFO) || DRIVE_INFO;
    const intl = useIntl();

    const mapItems = ({ name, placeholder }: Info) => {
        const inputValue = ((filterValues as Filter[])[name as keyof Filter[]] as string);
        return (
            <Input onChange={filter}
                key={name}
                name={name}
                placeholder={intl.formatMessage({ id: placeholder })}
                value={inputValue || ""}
            />
        )
    }

    const mappedItems = inputInfo.map(mapItems);

    return (
        <>
            <div className='filter_element-inputs'>
                {mappedItems}
            </div>
        </>
    );
}

export default FilterInputs;
