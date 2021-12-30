import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    centers: JSON.parse(localStorage.getItem("starred")) || []
}


export const starredCentersSlice = createSlice({
    name: 'starredCenters',
    initialState,
    reducers: {
        resetStarredCenters: (state, _action) => {
            localStorage.setItem("starred", JSON.stringify([]));
            state.centers = []
        },
        setStarredCenters: (state, action) => {
            const { centers } = action.payload;
            localStorage.setItem("starred", JSON.stringify(centers));
            state.centers = centers;
        }
    }
});

export const {
    resetStarredCenters,
    setStarredCenters
} = starredCentersSlice.actions;

export const selectStarredCenters = (state) => state.starredCenters.centers;

export default starredCentersSlice.reducer;
