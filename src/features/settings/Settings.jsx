import React from "react";
import { Button, Card, Dialog, Icon, Switch } from "@blueprintjs/core";
import { useDispatch, useSelector } from "react-redux";
import {
    setCalendarByDistrictAutoRefreshInterval,
    setCalendarByDistrictView,
} from "./settingsSlice";
import "./_settings.scss";

function Settings(props) {
    const dispatch = useDispatch();
    const { isOpen, setIsOpen } = props;
    const view = useSelector((state) => state.settings.calendarByDistrictView);
    const autoRefresh = useSelector(
        (state) => state.settings.calendarByDistrictAutoRefresh
    );
    const autoRefreshInt = useSelector(
        (state) => state.settings.calendarByDistrictAutoRefreshInterval
    );

    const nickDisplayMap = {
        table: "Table",
        tags: "Tags",
        4000: "4 Seconds",
        5000: "5 Seconds",
        6000: "6 Seconds",
        10000: "10 Seconds",
    };

    const handleClose = () => setIsOpen(false);

    const handleViewTypeChange = (event) => {
        // event.preventDefault();
        dispatch(setCalendarByDistrictView({ viewName: event.target.value }));
    };

    // viewOptions items must exactly be the same as the nicknames for the settings used in settingsSlice
    const viewOptions = ["tags", "table"];

    const refreshOptions = [4000, 5000, 6000, 10000];

    const handleAutoRefreshChange = (event) => {
        if (event.target.checked) {
            dispatch(
                setCalendarByDistrictAutoRefreshInterval({ interval: 5000 })
            );
        } else {
            dispatch(
                setCalendarByDistrictAutoRefreshInterval({ interval: null })
            );
        }
    };

    const handleAutoRefreshValueChange = (event) => {
        dispatch(
            setCalendarByDistrictAutoRefreshInterval({
                interval: event.target.value,
            })
        );
    };

    // const isAutoRefreshEnabled = () => calByDist.autoRefresh;

    return (
        <Dialog
            id="settings"
            className="bp4-dialog settings-dialog"
            isOpen={isOpen}
            canOutsideClickClose={true}
            onClose={handleClose}
            usePortal={false}
        >
            <div className="bp4-dialog-header">
                <h4 className="bp4-heading">Settings</h4>
                <Button
                    aria-label="Close"
                    className="bp4-dialog-close-button bp4-button bp4-minimal"
                    icon={"cross"}
                    onClick={handleClose}
                ></Button>
            </div>
            <div className="bp4-dialog-body settings-body">
                <Card className="settings-item-group">
                    <div className="settings-item">
                        <span>Appointments View</span>
                        <div className="bp4-html-select">
                            <select
                                onChange={handleViewTypeChange}
                                value={view}
                            >
                                {viewOptions &&
                                    viewOptions.map((option, id) => (
                                        <option key={id} value={option}>
                                            {nickDisplayMap[option]}
                                        </option>
                                    ))}
                            </select>
                            <Icon icon={"double-caret-vertical"} />
                        </div>
                    </div>
                </Card>
                <Card className="settings-item-group">
                    <div className="settings-item">
                        <label>Auto-refresh</label>
                        <Switch
                            checked={autoRefresh}
                            onChange={handleAutoRefreshChange}
                        />
                    </div>
                    <div className="settings-item bp4-large">
                        <span>Auto-refresh Interval</span>
                        <div className="bp4-html-select">
                            <select
                                onChange={handleAutoRefreshValueChange}
                                value={autoRefreshInt || ""}
                                disabled={!autoRefresh}
                            >
                                {refreshOptions &&
                                    refreshOptions.map((option, id) => (
                                        <option key={id} value={option}>
                                            {nickDisplayMap[option]}
                                        </option>
                                    ))}
                            </select>
                            <Icon icon={"double-caret-vertical"} />
                        </div>
                    </div>
                </Card>
            </div>
        </Dialog>
    );
}

export default Settings;
