export interface Car {
    mark: string;
    model: string;
    number: string;
    driver_id: string | number;
    year: string | number;
    status: {
        title: string;
        code: string;
    } | string;
}

export interface Driver {
    first_name: string;
    last_name: string;
    date_birth: number | string;
    status: {
        title: string;
        code: string;
    } | string;
}

export const CAR_VALUES: Car = {
    mark: '',
    model: '',
    year: '',
    number: '',
    driver_id: '',
    status: '',
};

export const DRIVER_VALUES: Driver = {
    first_name: "",
    last_name: "",
    date_birth: "",
    status: ""
};
