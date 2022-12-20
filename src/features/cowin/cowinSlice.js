import {
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const initialState = {
    selected: {
        stateEnt: {
            state_name: "Select a State",
            state_id: null,
        },
        districtEnt: {
            district_name: "Select a District",
            district_id: null,
        },
    },
    error: {
        states: null,
        districts: null,
        calendarByDistrict: null,
        vaccinationReports: null,
        publicReports: null,
    },
    filters: {
        keywords: [],
        feeType: {
            Free: true,
            Paid: true,
        },
        vaccines: {
            covaxin: {
                name: "COVAXIN",
                checked: false,
            },
            covovax: {
                name: "COVOVAX",
                checked: false,
            },
            corbevax: {
                name: "CORBEVAX",
                checked: false,
            },
            covishield: {
                name: "COVISHIELD",
                checked: false,
            },
            sputnik: {
                name: "SPUTNIK V",
                checked: false,
            },
        },
        ages: {
            minAge: 12,
            maxAge: "",
        },
    },
    sort: {
        session: {
            doses: ["desc", "desc"],
        },
        center: {
            totalDoses: "desc",
        },
    },
};

export const cowinApi = createApi({
    reducerPath: "cowinApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://cdn-api.co-vin.in/api/v2/" }),
    endpoints: (builder) => ({
        getCalendarByDistrict: builder.query({
            query: ({ id, date }) =>
                `appointment/sessions/public/calendarByDistrict?district_id=${id}&date=${date}`,
            transformResponse: (response, meta, arg) => response.centers,
        }),
        getCalendarByCenter: builder.query({
            query: ({ id, date }) =>
                `appointment/sessions/public/calendarByCenter?center_id=${id}&date=${date}`,
            transformResponse: (response, meta, arg) => response.centers,
        }),
        getStates: builder.query({
            query: () => `admin/location/states`,
            transformResponse: (response, meta, arg) => response.states,
        }),
        getDistricts: builder.query({
            query: (id) => `admin/location/districts/${id}`,
            transformResponse: (response, meta, arg) => response.districts,
        }),
    }),
});

export const fetchVaccinationReports = createAsyncThunk(
    "cowin/fetchVaccinationReports",
    async ({ stateId, districtId, date }) => {
        const response =
            await axios.get(`https://api.cowin.gov.in/api/v1/reports/v2/getVacPublicReports?
        state_id=${stateId}&district_id=${districtId}&date=${date}`);
        return response.data;
    }
);

export const fetchPublicReports = createAsyncThunk(
    "cowin/fetchPublicReports",
    async ({ stateId, districtId, date }) => {
        const response =
            await axios.get(`https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports?
        state_id=${stateId}&district_id=${districtId}&date=${date}`);
        return response.data;
    }
);

export const cowinSlice = createSlice({
    name: "cowin",
    initialState,
    reducers: {
        resetDistrictStore: (state) => {
            state.districts = [];
        },
        resetCalendarByDistrictStore: (state) => {
            state.calendarByDistrict = { centers: [] };
        },
        setSelectedState: (state, action) => {
            const { state_name } = action.payload;
            state.selected.stateEnt.state_name = state_name;
            state.status.calendarByDistrict = "idle";
            if (action.payload.state_id) {
                state.selected.stateEnt.state_id = action.payload.state_id;
            } else {
                state.selected.stateEnt.state_id = null;
            }
        },
        setSelectedDistrict: (state, action) => {
            const { district_name } = action.payload;
            state.selected.districtEnt.district_name = district_name;
            if (action.payload.district_id) {
                state.selected.districtEnt.district_id =
                    action.payload.district_id;
            } else {
                state.selected.districtEnt.district_id = null;
            }
        },
        setFeeFilter: (state, action) => {
            const { feeType, typeSelected } = action.payload;
            state.filters.feeType[feeType] = typeSelected;
        },
        setKeywordFilter: (state, action) => {
            state.filters.keywords = action.payload;
        },
        setVaccineFilter: (state, action) => {
            const { vaccine, value } = action.payload;
            switch (vaccine) {
                case "COVAXIN":
                    state.filters.vaccines.covaxin.checked = value;
                    break;
                case "COVOVAX":
                    state.filters.vaccines.covovax.checked = value;
                    break;
                case "CORBEVAX":
                    state.filters.vaccines.corbevax.checked = value;
                    break;
                case "COVISHIELD":
                    state.filters.vaccines.covishield.checked = value;
                    break;
                case "SPUTNIK V":
                    state.filters.vaccines.sputnik.checked = value;
                    break;
                default:
                    break;
            }
        },
        setAgeFilter: (state, action) => {
            const { minAge, maxAge } = action.payload;
            state.filters.ages.minAge = minAge;
            state.filters.ages.maxAge = maxAge;
        },
    },
});

export const {
    resetDistrictStore,
    resetCalendarByDistrictStore,
    setKeywordFilter,
    setFeeFilter,
    setVaccineFilter,
    setAgeFilter,
    setSelectedState,
    setSelectedDistrict,
} = cowinSlice.actions;

export const selectAllFilters = (state) => state.cowin.filters;
export const selectAllSort = (state) => state.cowin.sort;
export const selectKeywordFilter = (state) => state.cowin.filters.keywords;
export const selectFeeFilters = (state) => state.cowin.filters.feeType;
export const selectVaccineFilter = (state) => state.cowin.filters.vaccines;
export const selectAgeFilter = (state) => state.cowin.filters.ages;
export const selectSelectedState = (state) => state.cowin.selected.stateEnt;
export const selectSelectedDistrict = (state) =>
    state.cowin.selected.districtEnt;

// export const selectVaxReportsLastThirtyDays = (state) => state.cowin.vaccinationReports.last30DaysVaccination;
// export const selectPublicReports = (state) => state.cowin.publicReports;
// export const selectPublicReportsBeneficiaries = (state) => state.cowin.publicReports.getBeneficiariesGroupBy;

export default cowinSlice.reducer;
