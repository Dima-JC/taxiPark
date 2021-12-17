import { useSelector } from "react-redux";
import { useMemo } from "react";
import { FormattedMessage } from "react-intl";

import { Data, Status } from "../../../../interfaces";
import { DRIVER_TITLES, CAR_TITLES } from "../../../../constants/additionalInfo";
import { isPageCarSelector } from "../../../../redux/selectors";

import icons from "../../../../ascets/img/svg/IconsDirection.svg";

const uuid = require("react-uuid");

interface Props {
    additionalData: Data[];
}

const AdditionalData = ({ additionalData }: Props) => {
    const isPageCar = useSelector(isPageCarSelector);

    const renderTitles = (array: string[]) => {
        return array.map((item: string) => {
            return <p key={uuid()}>
                <FormattedMessage id={item} />
                <img src={icons}
                    alt="alt"
                />
            </p>
        });
    }

    const mapItems = (item: Data) => {
        return (
            <div className="block"
                key={item.id}>
                {Object.values(item).map((item: Status | string | number) => {
                    if (item.hasOwnProperty("title")) {
                        return <p key={uuid()}>
                            {(item as Status).title}
                        </p>;
                    }
                    return <p key={uuid()}>
                        {item}
                    </p>
                })}
            </div>
        )
    }

    const mappedItems = useMemo(() => additionalData.map(mapItems), [additionalData]);

    return (
        <div className="table_section_isActive">
            <div className="block">
                {isPageCar 
                    ? renderTitles(DRIVER_TITLES)
                    : renderTitles(CAR_TITLES)}
            </div>
            {mappedItems}
        </div>
    )
}

export default AdditionalData;
