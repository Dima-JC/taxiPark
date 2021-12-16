import { useField } from 'formik';
import React from 'react';
import { FormattedMessage } from 'react-intl';

interface Props {
    name: string;
    children: React.ReactNode | any;
}

const FormikSelect = ({ name, children }: Props) => {
    const [field, meta] = useField({ name, children });

    const element = React.cloneElement(
        children,
        [name, field],
    )

    return (
        <div>
            {meta.touched && meta.error ? (
                <span className="table_section-error">{<FormattedMessage id={meta.error} />}</span>
            ) : null}
            {element}
        </div>
    );
};

export default FormikSelect;
