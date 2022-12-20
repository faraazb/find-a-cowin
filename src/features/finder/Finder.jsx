import React, { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    cowinApi,
    selectKeywordFilter,
    selectSelectedDistrict,
    selectSelectedState,
    setKeywordFilter,
    setSelectedDistrict,
    setSelectedState,
} from "../cowin/cowinSlice";
import "./_finder.scss";
import {
    Button,
    ButtonGroup,
    Icon,
    Intent,
    NonIdealState,
    Spinner,
    TagInput,
} from "@blueprintjs/core";
import { useNavigate } from "react-router-dom";
import { CenterCard } from "./Center";
import { Selector } from "./Selector";
import { FeeTypeFilters } from "./filters/FeeTypeFilters";
import { formatDate } from "../../utils/date-utils";
import Settings from "../settings/Settings";
import { FilterPopover } from "./filters/FilterPopover";
import { applyFilters } from "./filters/filters";
import { AppToaster } from "../../App";

/*
 * A component which shows the Available Slots (active slots returned by CoWIN API)
 * after the user selects a State and District.
 * It also allows filtering by attributes: keywords (center name, center address
 * and center block), fee type (Free/Paid), eligible ages and vaccine.
 * */
export function Finder() {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const selectedState = useSelector(selectSelectedState);
    const selectedDistrict = useSelector(selectSelectedDistrict);
    const filters = useSelector((state) => state.cowin.filters);
    const sort = useSelector((state) => state.cowin.sort);
    const searchInputValues = useSelector(selectKeywordFilter);
    const [isSettingsOpen, setSettingsOpen] = useState(false);

    const autoRefresh = useSelector(
        (state) => state.settings.calendarByDistrictAutoRefresh
    );
    const autoRefreshInterval = useSelector(
        (state) => state.settings.calendarByDistrictAutoRefreshInterval
    );

    // Fetch states
    const {
        data: states,
        error: isStatesError,
        isSuccess: isStatesSuccess,
        isLoading: isStatesLoading,
        refetch: refetchStates,
    } = cowinApi.useGetStatesQuery({
        refetchOnReconnect: true,
    });

    // Fetch districts on trigger
    const [
        triggerDistricts,
        { data: districts, isSuccess: isDistrictsSuccess },
    ] = cowinApi.useLazyGetDistrictsQuery();

    // show error toast if failed to fetch states
    useEffect(() => {
        if (!isStatesLoading && isStatesError) {
            AppToaster.show({
                message: "Encountered an error while fetching data!",
                intent: Intent.DANGER,
                icon: "error",
                action: {
                    onClick: refetchStates,
                    text: "Retry",
                },
            });
        }
    }, [isStatesLoading, isStatesError, refetchStates]);

    // Fetch centers on trigger
    const [
        triggerCenters,
        {
            data: centers,
            isFetching: isCentersFetching,
            isSuccess: isCentersSuccess,
            isError: isCentersError,
            isUninitialized: isCenterUnintialized,
        },
    ] = cowinApi.useLazyGetCalendarByDistrictQuery({
        pollingInterval: autoRefresh ? autoRefreshInterval : 0,
    });

    // Filtering centers
    const transformedCenters = useMemo(() => {
        if (centers) {
            let newCenters = centers.slice();
            return applyFilters(newCenters, filters, sort);
        }
    }, [centers, filters, sort]);

    const refreshData = () => {
        if (
            selectedDistrict.district_name === "Select a District" ||
            selectedState.state_name === "Select a State"
        ) {
            return;
        }
        let date = new Date();
        date = formatDate(date, "-");
        triggerCenters({ id: selectedDistrict.district_id, date: date });
    };

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
    };

    const handleStateChange = (state) => {
        dispatch(
            setSelectedState({
                state_id: state.state_id,
                state_name: state.state_name,
            })
        );
        // Fetch new districts for the new State
        triggerDistricts(state.state_id);
        // Reset the District selector value
        dispatch(setSelectedDistrict({ district_name: "Select a District" }));
    };

    const handleDistrictChange = (district) => {
        dispatch(
            setSelectedDistrict({
                district_id: district.district_id,
                district_name: district.district_name,
            })
        );
        let date = new Date();
        date = formatDate(date, "-");
        triggerCenters({ id: district.district_id, date: date });
    };

    const toStarred = () => {
        navigate("starred");
    };

    /*
     * Decide what {content} to load in the "centers" div.
     * Depending on the fetch status and filters, show nice messages for each case.
     * */
    let content;
    if (
        isCenterUnintialized ||
        selectedDistrict.district_name === "Select a district"
    ) {
        content = (
            <NonIdealState
                icon={"info-sign"}
                title={"Select State and District"}
            >
                <div>
                    <Icon icon={"lightbulb"} intent={Intent.WARNING} />
                    Tip: Use the refresh button to refresh the data
                </div>
            </NonIdealState>
        );
    } else if (isCentersFetching) {
        content = (
            <Spinner
                className={"centers-loading-spinner"}
                intent={Intent.PRIMARY}
                size={50}
            />
        );
    } else if (isCentersSuccess) {
        if (transformedCenters.length > 0) {
            content = transformedCenters.map((center, id) => (
                <CenterCard key={id} center={center} />
            ));
        } else if (centers.length === 0) {
            content = (
                <NonIdealState
                    icon={"issue"}
                    title={"Currently, no slots are available."}
                    description={"Please check again after sometime."}
                />
            );
        } else {
            content = (
                <NonIdealState
                    icon={"zoom-out"}
                    title={"No centers match your query."}
                    description={
                        "It might be helpful to divide your query into multiple keywords."
                    }
                />
            );
        }
    } else if (isCentersError) {
        content = (
            <NonIdealState
                icon={"error"}
                title={"There was a problem!"}
                description={"Couldn't load data."}
                action={
                    <Button
                        onClick={refreshData}
                        intent={Intent.PRIMARY}
                        text="Retry"
                        icon="refresh"
                        outlined={true}
                    />
                }
            />
        );
    }

    return (
        <div className="slot-checker-container">
            <div className="slot-checker">
                <div className="slot-toolbar-container">
                    <div className="slot-toolbar">
                        <div className="slot-toolbar-item-group selectors">
                            <Selector
                                id="state_id"
                                label="state_name"
                                items={isStatesSuccess ? states : []}
                                selectedItem={selectedState}
                                setItem={handleStateChange}
                            />
                            <Selector
                                id="district_id"
                                label="district_name"
                                items={isDistrictsSuccess ? districts : []}
                                selectedItem={selectedDistrict}
                                setItem={handleDistrictChange}
                            />
                        </div>
                        <div className="slot-toolbar-item-group search-fee-type">
                            <TagInput
                                className="slot-toolbar-item search"
                                leftIcon={"search"}
                                placeholder={"Search.."}
                                onChange={(values) =>
                                    dispatch(setKeywordFilter(values))
                                }
                                values={searchInputValues}
                                rightElement={clearButton}
                            />
                            <div className="slot-toolbar-item fee-types-container">
                                <FeeTypeFilters alignmentVertical={false} />
                            </div>
                        </div>
                        <div className="slot-toolbar-item-group menu-buttons">
                            <ButtonGroup
                                className="menu-button-group"
                                fill={true}
                            >
                                <Button
                                    icon={"refresh"}
                                    text={"Refresh"}
                                    onClick={refreshData}
                                />
                                <Button
                                    icon={"star"}
                                    text={"Starred"}
                                    onClick={toStarred}
                                />
                                <FilterPopover />
                                <Button
                                    icon={"settings"}
                                    text={"Settings"}
                                    onClick={toggleSettings}
                                />
                            </ButtonGroup>
                        </div>
                    </div>
                </div>
                <div className="centers">{content}</div>
            </div>
            <Settings isOpen={isSettingsOpen} setIsOpen={setSettingsOpen} />
        </div>
    );
}
