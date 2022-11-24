import { STREAMERS_SUCCESS, STREAMERS_FAIL } from '../Action/type';

const initialState = {
    streamerList: []
};

export const JetDevReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case STREAMERS_SUCCESS:
            return {
                ...state,
                streamerList: payload,
            };
        case STREAMERS_FAIL:
            return {
                ...state,
                streamerList: payload,
            };
        default:
            return state;
    }
}