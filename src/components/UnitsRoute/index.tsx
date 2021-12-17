import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import FormUnits from "../FormUnits";
import { ROUTES_INFO } from "../../constants/routesInfo"
import { isAddNewUnitSelector, statusesSelector } from "../../redux/selectors/selector";
import AddNewCar from "../AddNewUnit/AddNewCar";
import AddNewDriver from "../AddNewUnit/AddNewDriver";
import { Data, Status } from "../../interfaces";
import { addNewUnit } from "../../redux/actions/actions";
import { Car, Driver } from "../AddNewUnit/initialValues";

interface RouteProp {
    path: string;
    title: string;
}

const uuid = require("react-uuid");

const UnitsRoute = () => {
    const isAddNewUnit = useSelector(isAddNewUnitSelector);

    const statuses = useSelector(statusesSelector);
    const dispatch = useDispatch();

    const mapItems = ({ path, title }: RouteProp) => {
        const onSubmit = (values: Car | Driver) => {
            const status = statuses.find((status: Status) => status.title === values.status)!;
            values.status = status;
            if (values.hasOwnProperty("date_birth")) {
                (values as Driver).date_birth = new Date((values as Driver).date_birth).getTime();
            }
            dispatch(addNewUnit(title, true, (values as Data)));
        }
        const newUnit = isAddNewUnit === "car"
            ? <AddNewCar submit={onSubmit} />
            : <AddNewDriver submit={onSubmit} />;
        return (
            <Route key={uuid()} path={path} element={
                <>
                    {isAddNewUnit && newUnit}
                    <FormUnits title={title} />
                </>
            } />
        )
    }

    const mappedItems = useMemo(() => ROUTES_INFO.map(mapItems), [isAddNewUnit]);

    return (
        <div className="content__inform">
            <div className="table">
                <Routes>
                    {mappedItems}
                </Routes>
            </div>
        </div>
    )
}

export default UnitsRoute;
