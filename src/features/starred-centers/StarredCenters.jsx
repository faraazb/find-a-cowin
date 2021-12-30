import React, {useEffect} from "react";
import {Button, H1, H3, Icon, Intent, NonIdealState, Spinner} from "@blueprintjs/core";
import "./_starred-centers.scss";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {resetStarredCenters, selectStarredCenters} from "./starredCentersSlice";
import {fetchCalendarByCenter, selectCalendarByCenter} from "../cowin/cowinSlice";
import {formatDate} from "../../utils/DateUtilities";
import {CenterCard} from "../finder/Center";

export const StarredCenters = (props) => {
    const dispatch = useDispatch();
    const initializeStarred = !localStorage.getItem("starred");
    const starred = useSelector(selectStarredCenters);
    const centers = useSelector(selectCalendarByCenter);
    const fetchStatus = useSelector((state) => state.cowin.status.calendarByCenter);

    useEffect(() => {
        if (initializeStarred) {
            dispatch(resetStarredCenters());
        }
    })

    useEffect(() => {
        let date = new Date();
        date = formatDate(date, '-');
        console.log(fetchStatus)
        for (let centerId of starred) {
            if (fetchStatus[centerId] === "idle") {
                dispatch(fetchCalendarByCenter({centerId: centerId, date: date}))
            }
        }
    }, [starred, fetchStatus, dispatch]);

    const getCenterContent = (centerId) => {
        let content;
        if (fetchStatus[centerId] === "idle") {
            let date = new Date();
            date = formatDate(date, '-');
            dispatch(fetchCalendarByCenter({centerId: centerId, date: date}))
            content = <CenterCard key={centerId} center={null} loading={true}/>
        }
        else if (fetchStatus[centerId] === "loading") {
            content = <Spinner className={"centers-loading-spinner"} intent={Intent.PRIMARY} size={50} />
        }
        else if (fetchStatus[centerId] === "succeeded") {
            let center = centers[centerId]
            content = <CenterCard key={centerId} center={center} />
        }
        return content;
    }

    return (
        <div className="starred-centers">
            <div className="header-container">
                <div className="header">
                    <NavLink to={"/"}>
                        <Button icon={"arrow-left"} minimal={true}/>
                    </NavLink>
                    <H3 className="heading">
                        Starred Centers
                    </H3>
                </div>
            </div>
            <div className="centers">
                {
                    starred.map((centerId, id) => (
                    getCenterContent(centerId)
                    ))
                }
            </div>
        </div>
    )
}