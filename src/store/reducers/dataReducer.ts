import { Info, ActionType } from "../../interfaces";

const defaultState = [{ status: { title: "", code: "" } }];
export default function dataReducer(state: Info[] = [], action: ActionType<Info[]>): Info[] {
    switch (action.type) {
        case "DATA_RECEIVED":
            return action.payload!;
        default:
            return state;
    }
}