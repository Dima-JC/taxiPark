import { useEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";

import { GET } from "../../requests/requests";
import { Data } from "../../interfaces";

import "./driversOptions.style.scss";

const uuid = require("react-uuid");

const DriversOptions = () => {
  const [drivers, setDrivers] = useState(Array<Data>());
  const intl = useIntl();

  const fetchData = async () => {
    const drivers = await GET("driver");
    setDrivers(drivers as Data[]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const mapItems = (item: Data) => {
    return (
      <option 
        key={uuid()} 
        value={item.id}
      >
        {item.first_name + " " + item.last_name}
      </option>
    )
  }

  const mappedItems = useMemo(() => drivers?.map(mapItems), [drivers])

  return (
    <select>
      <option value="" hidden>
        {intl.formatMessage({ id: "Driver" })}
      </option>
      {mappedItems}
    </select>
  )
};

export default DriversOptions;
