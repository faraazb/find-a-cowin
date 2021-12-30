import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import axios from "axios"
import { flow, partialRight, pickBy } from "lodash/fp";
import {
	byAgeCategory as filterByAgeCategory, 
    byKeyword as filterByKeyword, 
    byVaccine as filterByVaccine, 
    isFree as filterIsFree, 
    isPaid as filterIsPaid 
} from "../finder/filters/filters";
import { 
	byCenterTotalDoses as sortByCenterTotalDoses 
} from "../finder/sorting/sorting";

const getCalendarByStarredCenters = () => {
    let status = {}
    const centers = JSON.parse(localStorage.getItem("starred"));
    for (let center of centers) {
        status[center] = 'idle'
    }
    return status;
}

const initialState = {
    states: [],
    districts: [],
    selected: {
        stateEnt: {
            stateName: "Select a State",
            stateId: null
        },
        districtEnt: {
            districtName: "Select a District",
            districtId: null
        },
    },
    calendarByDistrict: {
        centers: []
    },
    calendarByCenter: {},
    vaccinationReports: {},
    publicReports: {},
    status: {
        states: 'idle',
        districts: 'idle',
        calendarByDistrict: 'idle',
        calendarByCenter: getCalendarByStarredCenters(),
        vaccinationReports: 'idle',
        publicReports: 'idle'
    },
    error: {
        states: null,
        districts: null,
        calendarByDistrict: null,
        vaccinationReports: null,
        publicReports: null
    },
    filters: {
        keywords: [],
        feeType: {
            "Free": true,
            "Paid": true
        },
        // vaccines: {
        //     "COVAXIN": false,
        //     "COVISHIELD": true,
        //     "SPUTNIK V": false
        // },
        vaccines: {
            covaxin: {
                name: "COVAXIN",
                checked: true
            },
            covishield: {
                name: "COVISHIELD",
                checked: true
            },
            sputnik: {
                name: "SPUTNIK V",
                checked: true
            }
        },
        ages: {
            minAge: null,
            maxAge: null,
			eighteenAbove: true,
			eighteenFortyFour: true,
			fortyFiveAbove: true
        }
    },
    sort: {
        session: {
            doses: ['desc', 'desc'],
        },
        center: {
			totalDoses: 'desc'
        }
    }
}

export const fetchCalendarByDistrict = createAsyncThunk('cowin/calendarByDistrict',
    async ({districtId, date}) => {
    const response = await axios.get(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=
            ${districtId}&date=${date}`);
    return response.data;
});

// export const fetchCalendarByCenter = createAsyncThunk('cowin/calendarByCenter',
//     async ({centerId, date}, {fulfillWithValue, rejectWithValue}) => {
//     try {
//         const response = await axios.get(
//             `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByCenter?center_id=
//             ${centerId}&date=${date}`);
//         return fulfillWithValue({center: centerId, sessions: response.data["centers"]})
//     } catch (error) {
//         return rejectWithValue({id: centerId, message: error.response.data});
//     }
// });

export const fetchCalendarByCenter = createAsyncThunk('cowin/calendarByCenter',
async ({centerId, date}) => {
    const response = await axios.get(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByCenter?center_id=
    ${centerId}&date=${date}`);
    return response.data["centers"];
});

export const fetchStates = createAsyncThunk('cowin/fetchStates',
    async () => {
    const response = await axios.get(
        `https://cdn-api.co-vin.in/api/v2/admin/location/states`);
    return response.data;
});

export const fetchDistricts = createAsyncThunk('cowin/fetchDistricts',
    async ({stateId}) => {
    const response = await axios.get(
        `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateId}`);
    return response.data;
});

export const fetchVaccinationReports = createAsyncThunk('cowin/fetchVaccinationReports',
    async ({stateId, districtId, date}) => {
        const response = await axios.get(`https://api.cowin.gov.in/api/v1/reports/v2/getVacPublicReports?
        state_id=${stateId}&district_id=${districtId}&date=${date}`);
        return response.data
    })

export const fetchPublicReports = createAsyncThunk('cowin/fetchPublicReports',
    async ({stateId, districtId, date}) => {
        const response = await axios.get(`https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports?
        state_id=${stateId}&district_id=${districtId}&date=${date}`);
        return response.data
    })

export const cowinSlice = createSlice({
    name: 'cowin',
    initialState,
    reducers: {
        resetDistrictStore: (state) => {
            state.districts = [];
        },
        resetCalendarByDistrictStore: (state) => {
            state.calendarByDistrict = { centers: [] };
        },
        setSelectedState: (state, action) => {
            const { stateName } = action.payload;
            state.selected.stateEnt.stateName = stateName;
            state.status.calendarByDistrict = 'idle';
            if (action.payload.stateId) {
                state.selected.stateEnt.stateId = action.payload.stateId;
            }
            else {
                state.selected.stateEnt.stateId = null;
            }
        },
        setCalendarByCenterStatus: (state, action) => {
            const { centerId, fetchStatus } = action.payload;
            state.status.calendarByCenter[centerId] = fetchStatus;
        },
        setSelectedDistrict: (state, action) => {
            const { districtName } = action.payload;
            state.selected.districtEnt.districtName = districtName;
            if (action.payload.districtId) {
                state.selected.districtEnt.districtId = action.payload.districtId;
            }
            else {
                state.selected.districtEnt.districtId = null
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
		// setAgeFilter: (state, action) => {
		// 	const { minAge, maxAge } = action.payload;
		// 	state.filters.ages.minAge = minAge;
		// 	state.filters.ages.maxAge = maxAge;
		// }
		setAgeFilter: (state, action) => {
			const { age, value } = action.payload;
			switch (age) {
				case "age-18-above":
					state.filters.ages.eighteenAbove = value;
					break;
				case "age-18-44":
					state.filters.ages.eighteenFortyFour = value;
					break;
				case "age-45-above":
					state.filters.ages.fortyFiveAbove = value;
					break;
				default:
					break;
			}
		}
    },
    extraReducers: {
        [fetchCalendarByDistrict.pending]: (state) => {
            state.status.calendarByDistrict = 'loading';
        },
        [fetchCalendarByDistrict.fulfilled]: (state, action) => {
            state.status.calendarByDistrict = 'succeeded';
            state.calendarByDistrict = action.payload;
        },
        [fetchCalendarByDistrict.rejected]: (state, action) => {
            state.status.calendarByDistrict = 'failed';
            state.error.calendarByDistrict = action.error.message;
        },
        [fetchCalendarByCenter.pending]: (state, action) => {
            let center = action.meta.arg.centerId;
            state.status.calendarByCenter[center] = 'idle'
        },
        [fetchCalendarByCenter.fulfilled]: (state, action) => {
            let center = action.meta.arg.centerId;
            state.status.calendarByCenter[center] = 'succeeded';
            state.calendarByCenter[center] = action.payload;
        },
        [fetchCalendarByCenter.rejected]: (state, action) => {
            // let center = action.error.id;
            let center = action.meta.arg.centerId;
            state.status.calendarByCenter[center] = 'failed';
            state.error.calendarByCenter[center] = action.error.message;
        },
        [fetchStates.pending]: (state) => {
            state.status.states = 'loading';
        },
        [fetchStates.fulfilled]: (state, action) => {
            state.status.states = 'succeeded';
            //Here we select the slates key from the response
            // Response: {
            //  states: []
            // }
            state.states = action.payload.states;
        },
        [fetchStates.rejected]: (state, action) => {
            state.status.states = 'failed';
            state.error.states = action.error.message;
        },
        [fetchDistricts.pending]: (state) => {
            state.status.districts = 'loading';
        },
        [fetchDistricts.fulfilled]: (state, action) => {
            state.status.districts = 'succeeded';
            state.districts = action.payload.districts;
        },
        [fetchDistricts.rejected]: (state, action) => {
            state.status.districts = 'failed';
            state.error.districts = action.error.message;
        },
        [fetchVaccinationReports.fulfilled]: (state, action) => {
            state.status.vaccinationReports = 'succeeded';
            state.error.vaccinationReports = null;
            state.vaccinationReports = action.payload;
        },
        [fetchVaccinationReports.rejected]: (state, action) => {
            state.status.vaccinationReports = 'failed';
            state.error.vaccinationReports = action.error.message;
        },
        [fetchPublicReports.fulfilled]: (state, action) => {
            state.status.publicReports = 'succeeded';
            state.error.publicReports = null;
            state.publicReports = action.payload;
        },
        [fetchPublicReports.rejected]: (state, action) => {
            state.status.publicReports = 'failed';
            state.error.publicReports = action.error.message;
        }
    },
});



export const { resetDistrictStore,
    resetCalendarByDistrictStore,
    setKeywordFilter,
    setFeeFilter,
    setVaccineFilter,
	setAgeFilter,
    setSelectedState,
    setSelectedDistrict,
    setCalendarByCenterStatus
} = cowinSlice.actions;

export const selectCalendarByDistrict = (state) => state.cowin.calendarByDistrict.centers;
export const selectCalendarByCenter = (state) => state.cowin.calendarByCenter;

export const selectKeywordFilter = (state) => state.cowin.filters.keywords;
export const selectFeeFilters = (state) => state.cowin.filters.feeType;
export const selectVaccineFilter = (state) => state.cowin.filters.vaccines;
export const selectAgeFilter = (state) => state.cowin.filters.ages;

export const selectAllStates = (state) => state.cowin.states;
export const selectAllDistricts = (state) => state.cowin.districts;
export const selectSelectedState = (state) => state.cowin.selected.stateEnt;
export const selectSelectedDistrict = (state) => state.cowin.selected.districtEnt;

export const selectVaxReportsLastThirtyDays = (state) => state.cowin.vaccinationReports.last30DaysVaccination;

export const selectPublicReports = (state) => state.cowin.publicReports;
export const selectPublicReportsBeneficiaries = (state) => state.cowin.publicReports.getBeneficiariesGroupBy;

export const selectFilteredData = createSelector(
    selectCalendarByDistrict,
    selectFeeFilters,
    selectKeywordFilter,
    selectVaccineFilter,
    selectAgeFilter,
    (state) => state.cowin.sort,
    (centers, feeFilters, keywords, vaccines, ages, sort) => {
        let transformations = []
        if (feeFilters["Free"] !== feeFilters["Paid"]) {
            if (feeFilters["Free"]) {
                transformations.push(filterIsFree);
            }
            else if (feeFilters["Paid"]) {
                transformations.push(filterIsPaid);
            }
        }
        // if (vaccines) {
        //     let selectedVaccines = Object.keys(pickBy(vaccine => vaccine, vaccines));
        //     console.log(selectedVaccines)
        //     transformations.push(partialRight(filterByVaccine, [selectedVaccines]));
        // }
        if (vaccines) {
            let selectedVaccines = pickBy(vaccine => vaccine.checked, vaccines);
            let nextVaccines = [];
            Object.values(selectedVaccines).forEach(vaccine => nextVaccines.push(vaccine.name));
            if (nextVaccines.length > 0) {
                transformations.push(partialRight(filterByVaccine, [nextVaccines]));
            }
        }
		if (ages) {
			transformations.push(partialRight(filterByAgeCategory, [ages]))
		}
        if (keywords.length > 0) {
            transformations.push(partialRight(filterByKeyword, [keywords]));
        }
		// TODO: vaccine price sorting
        // Implementing a drag-drop interface with the ability to rank the sorts would be amazing.
		transformations.push(partialRight(sortByCenterTotalDoses, [[sort.center.totalDoses]]));
		// Sort slots within a center by dose count
        // transformations.push(partialRight(sortByDosesWithinCenter, [sort.session.doses]));
        // console.log(filters)
        return flow(transformations)(centers);
    }
)

export default cowinSlice.reducer;
