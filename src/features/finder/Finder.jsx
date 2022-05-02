import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchCalendarByDistrict,
    fetchDistricts,
    fetchStates,
    resetCalendarByDistrictStore,
    resetDistrictStore, selectAllDistricts,
    selectAllStates, selectCalendarByDistrict,
    selectFilteredData,
    selectKeywordFilter,
    selectSelectedDistrict,
    selectSelectedState,
    setKeywordFilter,
    setSelectedDistrict,
    setSelectedState
} from "../cowin/cowinSlice";
import "./_finder.scss";
import {CenterCard} from "./Center";
import {DistrictSelector, StateSelector} from "./Selectors";
import {
    Button, ButtonGroup, Icon, Intent,
    NonIdealState, Spinner, TagInput
} from "@blueprintjs/core";
import {FeeTypeFilters} from "./filters/FeeTypeFilters";
import {formatDate} from "../../utils/DateUtilities";
import Settings from "../settings/Settings";
import {FilterPopover} from "./filters/FilterPopover";
import {useHistory} from "react-router-dom";

/*
* A component which shows the Available Slots (active slots returned by CoWIN API)
* after the user selects a State and District.
* It also allows filtering by attributes: keywords (center name, center address
* and center block), fee type (Free/Paid).
* */
export function Finder() {
    const dispatch = useDispatch();
    let history = useHistory();
    const calendarFetchStatus = useSelector((state) => state.cowin.status.calendarByDistrict);
    // Use the filtered calendarByDistrict data from the store
    const states = useSelector(selectAllStates);
    const districts = useSelector(selectAllDistricts);
    const centers = useSelector(selectFilteredData);
    const unfilteredCenters = useSelector(selectCalendarByDistrict)
    const selectedState = useSelector(selectSelectedState);
    const selectedDistrict = useSelector(selectSelectedDistrict);
    const searchInputValues = useSelector(selectKeywordFilter);
    const [isSettingsOpen, setSettingsOpen] = useState(false);
    const autoRefresh = useSelector(state => state.settings.calendarByDistrictAutoRefresh);
    const autoRefreshInterval = useSelector(state => state.settings.calendarByDistrictAutoRefreshInterval);
    const statesFetchStatus = useSelector((state) => state.cowin.status.states);
    const intervalRef = useRef();

    const refreshData = () => {
        if (selectedDistrict.districtName === "Select a District" || selectedState.stateName === "Select a State") {
            return
        }
        let date = new Date();
        date = formatDate(date, '-');
        // console.log("Refreshing data", new Date().toLocaleTimeString(), {districtName: selectedDistrict.districtName});
        dispatch(fetchCalendarByDistrict({districtId: selectedDistrict.districtId, date: date}));
    }

    useEffect(() => {
        if (autoRefresh) {
            // console.log("Old timeout:", intervalRef.current)
            clearInterval(intervalRef.current);
            let intervalId = setInterval(() => {
                refreshData()
            }, autoRefreshInterval);
            intervalRef.current = intervalId;
            // console.log("New timeout:", intervalRef.current)
            return () => clearInterval(intervalRef.current);
        }
    });

    /*
    * Decide what {content} to load in the "centers" div.
    * Depending on the fetch status and filters, show nice contextual messages for each case.
    * */
    let content;
    if (calendarFetchStatus === "idle" || selectedDistrict.district_name === "Select a district") {
        content = <NonIdealState
            icon={"info-sign"}
            title={"Select State and District"}
        >
            <div>
                <Icon icon={"lightbulb"} intent={Intent.WARNING}/>
                Tip: Use the refresh button to refresh the data
            </div>
        </NonIdealState>
    } else if (calendarFetchStatus === "loading") {
        content = <Spinner className={"centers-loading-spinner"} intent={Intent.PRIMARY} size={50}/>
    } else if (calendarFetchStatus === "succeeded") {
        if (centers.length > 0) {
            content = centers.map((center, id) => (
                <CenterCard key={id} center={center}/>
            ));
        } else {
            content = <NonIdealState
                icon={"zoom-out"}
                title={"No centers match your query."}
                description={"It might be helpful to divide your query into multiple keywords."}
            />
        }
    } else if (calendarFetchStatus === "succeeded" && unfilteredCenters.length === 0) {
        content = <NonIdealState
            icon={"issue"}
            title={"Currently, no slots are available."}
            description={"Please check again after sometime."}
        />
    } else if (calendarFetchStatus === "failed") {
        content = <NonIdealState
            icon={"error"}
            title={"There was a problem!"}
            description={"Couldn't load data."}
        />
    }

    // Clear Button element to clear/reset the Search bar
    const clearButton = (
        <Button
            icon={"cross"}
            minimal={true}
            onClick={() => dispatch(setKeywordFilter([]))}
        />
    );

    const toggleSettings = () => {
        setSettingsOpen(!isSettingsOpen);
    }

    // Fetch states for StateSelector when it mounts
    useEffect(() => {
        if (statesFetchStatus === "idle") {
            dispatch(fetchStates());
        }
    }, [statesFetchStatus, dispatch]);

    const handleStateChange = (state) => {
        // Changed the dispatch order here
        // Reset the current District and Center list by resetting the store
        dispatch(resetDistrictStore());
        dispatch(resetCalendarByDistrictStore());
        dispatch(setSelectedState({stateId: state.state_id, stateName: state.state_name}));
        // Fetch new districts for the new State
        dispatch(fetchDistricts({stateId: state.state_id}));
        // Reset the District selector value
        dispatch(setSelectedDistrict({districtName: "Select a District"}))
    }

    const handleDistrictChange = (district) => {
        dispatch(setSelectedDistrict({districtId: district.district_id, districtName: district.district_name}))
        let date = new Date();
        date = formatDate(date, '-');
        dispatch(fetchCalendarByDistrict({districtId: district.district_id, date: date}));
    }

    const toStarred = () => {
        history.push("/starred")
    }

    return (
        <div className="slot-checker-container">
            <div className="slot-checker">
                <div className="slot-toolbar-container">
                    <div className="slot-toolbar">
                        <div className="slot-toolbar-item-group selectors">
                            <StateSelector
                                states={states}
                                selectedState={selectedState}
                                setState={handleStateChange}
                            />
                            <DistrictSelector
                                districts={districts}
                                selectedDistrict={selectedDistrict}
                                setDistrict={handleDistrictChange}
                            />
                        </div>
                        <div className="slot-toolbar-item-group search-fee-type">
                            <TagInput
                                className="slot-toolbar-item search"
                                leftIcon={"search"}
                                placeholder={"Search with multiple keywords.."}
                                onChange={(values => dispatch(setKeywordFilter(values)))}
                                values={searchInputValues}
                                rightElement={clearButton}
                            />
                            <div className="is-hidden-mobile slot-toolbar-item fee-types-container">
                                <FeeTypeFilters alignmentVertical={false}/>
                            </div>
                        </div>
                        <div className="slot-toolbar-item-group menu-buttons">
                            <ButtonGroup className="menu-button-group" fill={true}>
                                <Button icon={"refresh"} text={"Refresh"} onClick={refreshData}/>
                                <Button icon={"star"} text={"Starred"} onClick={toStarred}/>
                                <FilterPopover/>
                                <Button icon={"settings"} text={"Settings"} onClick={toggleSettings}/>
                            </ButtonGroup>
                        </div>
                    </div>
                </div>
                <div className="centers">
                    {content}
                </div>
            </div>
            <Settings isOpen={isSettingsOpen} setIsOpen={setSettingsOpen}/>
        </div>
    )
}