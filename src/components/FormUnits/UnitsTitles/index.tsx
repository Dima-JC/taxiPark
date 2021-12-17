import { useMemo } from "react";
import { useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";

import { isPageCarSelector } from "../../../redux/selectors";
import { CAR_INFO, DRIVER_INFO } from "../../../constants/unitsTitles"

import IconsDirection from '../../../ascets/img/svg/IconsDirection.svg'
import './unitsTitles.style.scss'

const uuid = require("react-uuid");

const UnitsTitles = () => {
    const isPageCar = useSelector(isPageCarSelector);
    const info: string[] = (isPageCar && CAR_INFO) || DRIVER_INFO;

    const mapItems = (item: string) => {
        if (["Drivers", "Cars"].includes(item)) {
            return (
                <div key={uuid()}
                    className="title-section-button">
                    <div className='title-section-title'>
                        <FormattedMessage id={item} />
                        <img src={IconsDirection}
                            alt="alt"
                        />
                    </div>
                    <div className='title-section-title'>
                        <FormattedMessage id='Delete' />
                        <img src={IconsDirection}
                            alt="alt"
                        />
                    </div>
                </div>
            )
        }
        else {
            return <div key={uuid()}
                className='title-section-title'>
                <FormattedMessage id={item} />
                <img src={IconsDirection}
                    alt="alt"
                />
            </div>
        }
    }

    const mappedItems = useMemo(() => info.map(mapItems), [info])

    return (
        <div className='title-section'>
            {mappedItems}
        </div>
    )
}

export default UnitsTitles;
