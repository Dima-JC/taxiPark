import { FormattedMessage } from "react-intl";

import styled from 'styled-components';

import { RESET_BUTTON_BACKGROUND, RESET_BUTTON_COLOR } from "../../../constants/style.colors";

const Button = styled.button`
    width: 200px;
    height: 35px;
    border-radius: 8px;
    color: ${RESET_BUTTON_COLOR};
    background-color: ${RESET_BUTTON_BACKGROUND};
    border: none;
    cursor: pointer;
    @media (max-width: 1080px) {
        height: 100%;
        width: 62px;
    }
    @media (max-width: 445px) {
        width: 300px;
        height: 45px;
    }   
`;

interface Props {
    resetFilters: () => void;
}

const ResetButton = ({ resetFilters }: Props) => {
    return (
        <div className="reset-filter-button">
            <Button type="button" 
                onClick={resetFilters}>
                {<FormattedMessage id='Reset' />}
            </Button>
        </div>
    );
}

export default ResetButton;
