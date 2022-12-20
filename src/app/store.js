import { configureStore } from "@reduxjs/toolkit";
import cowinReducer, { cowinApi } from "../features/cowin/cowinSlice";
import settingsReducer from "../features/settings/settingsSlice";
import starredCentersReducer from "../features/starred-centers/starredCentersSlice";

export const store = configureStore({
    reducer: {
        cowin: cowinReducer,
        [cowinApi.reducerPath]: cowinApi.reducer,
        settings: settingsReducer,
        starredCenters: starredCentersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cowinApi.middleware),
});
