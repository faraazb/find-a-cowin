import React from "react";
import {Button, Card, ControlGroup, Dialog, Icon, Switch} from "@blueprintjs/core";
import {useDispatch, useSelector} from "react-redux";
import { setCalendarByDistrictAutoRefreshInterval, setCalendarByDistrictView} from "./settingsSlice";
import "./_settings.scss"

function Settings(props) {
    const dispatch = useDispatch();
    const { isOpen, setIsOpen } = props;
    const view = useSelector(state => state.settings.calendarByDistrictView);
    const autoRefresh = useSelector(state => state.settings.calendarByDistrictAutoRefresh);
    const autoRefreshInt = useSelector(state => state.settings.calendarByDistrictAutoRefreshInterval);

    const nickDisplayMap = {
        "table": "Table",
        "tags": "Tags",
        4000: "4 Seconds",
        5000: "5 Seconds",
        6000: "6 Seconds",
        10000: "10 Seconds",
    }

    const handleClose = () => setIsOpen(false);

    const handleViewTypeChange = (event) => {
        // event.preventDefault();
        dispatch(setCalendarByDistrictView({viewName: event.target.value}));
    }

    // viewOptions items must exactly be the same as the nicknames for the settings used in settingsSlice
    const viewOptions = ["tags", "table"];

    const refreshOptions = [4000, 5000, 6000, 10000]

    const handleAutoRefreshChange = (event) => {
        if (event.target.checked) {
            dispatch(setCalendarByDistrictAutoRefreshInterval({interval: 5000}));
        }
        else {
            dispatch(setCalendarByDistrictAutoRefreshInterval({interval: null}));
        }
    }

    const handleAutoRefreshValueChange = (event) => {
        dispatch(setCalendarByDistrictAutoRefreshInterval({interval: event.target.value}));
    }

    // const isAutoRefreshEnabled = () => calByDist.autoRefresh;
    
    return (
        <Dialog id="settings" className="bp3-dialog settings-dialog"
                isOpen={isOpen}
                canOutsideClickClose={true}
                onClose={handleClose}
                usePortal={false}
        >
            <div className="bp3-dialog-header">
                <h4 className="bp3-heading">Settings</h4>
                <Button
                    aria-label="Close"
                    className="bp3-dialog-close-button bp3-button bp3-minimal"
                    icon={"cross"}
                    onClick={handleClose}
                >
                </Button>
            </div>
            <div className="bp3-dialog-body">
                <Card className="settings-item">
                    <ControlGroup vertical={true}>
                        <div className="settings-caption-vertical">
                            View appointments of a Center as
                        </div>
                        <div className="bp3-html-select">
                            <select onChange={handleViewTypeChange} value={view}>
                                {
                                    viewOptions && viewOptions.map((option, id) => (
                                        <option key={id} value={option}>{nickDisplayMap[option]}</option>
                                    ))
                                }
                            </select>
                            <Icon icon={"double-caret-vertical"} />
                        </div>
                    </ControlGroup>
                </Card>
                <Card className="settings-item">
                    <ControlGroup fill={true}>
                        <Switch
                            label={"Auto refresh data"}
                            checked={autoRefresh}
                            onChange={handleAutoRefreshChange}
                            alignIndicator={"right"}
                        />
                        <div className="settings-caption-horizontal">
                            Auto-refresh Interval
                        </div>
                        <div className="bp3-html-select">
                            <select onChange={handleAutoRefreshValueChange}
                                    value={autoRefreshInt || ""}
                                    disabled={!autoRefresh}
                            >
                                {
                                    refreshOptions && refreshOptions.map((option, id) => (
                                        <option key={id} value={option}>{nickDisplayMap[option]}</option>
                                    ))
                                }
                            </select>
                            <Icon icon={"double-caret-vertical"} />
                        </div>
                    </ControlGroup>
                </Card>
            </div>
        </Dialog>
    )
}

export default Settings;