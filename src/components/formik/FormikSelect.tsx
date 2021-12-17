import React, { ReactElement } from 'react';
import { useField } from 'formik';
import { FormattedMessage } from 'react-intl';

interface Props {
    name: string;
    children: ReactElement;
}

const FormikSelect = ({ name, children }: Props) => {
    const [field, meta] = useField({ name, children });

    const element = React.cloneElement(
        children,
        { ...field, className: "table_section-tab-select" },
        children.props.children
    )

    return (
        <div>
            {meta.touched && meta.error ? (
                <span className="table_section-error">
                    {<FormattedMessage id={meta.error} />}
                </span>
            ) : null}
            {element}
        </div>
    );
};

export default FormikSelect;
