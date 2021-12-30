import { configureStore } from '@reduxjs/toolkit';
import cowinReducer from "../features/cowin/cowinSlice";
import settingsReducer from "../features/settings/settingsSlice";
import starredCentersReducer from "../features/starred-centers/starredCentersSlice"

export const store = configureStore({
    reducer: {
        cowin: cowinReducer,
        settings: settingsReducer,
        starredCenters: starredCentersReducer
    },
});