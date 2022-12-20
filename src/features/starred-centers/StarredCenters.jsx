import React from "react";
import { Button, H3 } from "@blueprintjs/core";
import "./_starred-centers.scss";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectStarredCenters } from "./starredCentersSlice";
import { StarredCenterCard } from "../finder/Center";
import { formatDate } from "../../utils/date-utils";

export const StarredCenters = () => {
    const starred = useSelector(selectStarredCenters);

    let date = new Date();
    date = formatDate(date, "-");

    return (
        <div className="starred-centers">
            <div className="header-container">
                <div className="header">
                    <NavLink to={"/"}>
                        <Button icon={"arrow-left"} minimal={true} />
                    </NavLink>
                    <H3 className="heading">Starred Centers</H3>
                </div>
            </div>
            <div className="centers">
                {starred.length === 0 && (
                    <div className="bp4-callout bp4-intent-warning">
                        <h4 className="bp4-heading">No starred centers!</h4>
                        Mark centers as starred using the{" "}
                        <Button
                            small={true}
                            outlined={true}
                            icon={"star"}
                            text={"Star"}
                        />{" "}
                        button.
                    </div>
                )}
                {starred.length > 0 &&
                    starred.map((centerId, _id) => (
                        <StarredCenterCard
                            key={centerId}
                            id={centerId}
                            date={date}
                        />
                    ))}
            </div>
        </div>
    );
};
