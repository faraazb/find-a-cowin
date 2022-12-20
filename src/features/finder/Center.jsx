import { Button, H5, Intent, Tag } from "@blueprintjs/core";
import React from "react";
import { SessionTable, SessionTags } from "./Session";
import { useDispatch, useSelector } from "react-redux";
import {
    selectStarredCenters,
    setStarredCenters,
} from "../starred-centers/starredCentersSlice";
import { cowinApi } from "../cowin/cowinSlice";
import { AppToaster } from "../../App";

/*
 * Defines the Blueprintjs Intent color to use with a particular fee type
 *
 * */
const feeType = {
    Paid: Intent.WARNING,
    Free: Intent.SUCCESS,
};

/*
 *
 * CenterCard component renders a center and its sessions using the Session component.
 *
 * */
function CenterCard(props) {
    const { center, loading = false, showStarButton = true } = props;

    // maybe lift viewType and starred to finder itself
    const viewType = useSelector(
        (state) => state.settings.calendarByDistrictView
    );
    const dispatch = useDispatch();
    const starred = useSelector(selectStarredCenters);

    if (loading) {
        return (
            <div key={center.center_id} className="center bp4-elevation-1">
                <div className="center-info-container">
                    <span className="center-name bp4-skeleton">Loading</span>
                    <Tag
                        className="center-fee-type bp4-skeleton"
                        intent={Intent.PRIMARY}
                    >
                        Loading
                    </Tag>
                    <div className="vaccine-fee-tags">
                        <Tag key={1} className="fee-type bp4-skeleton">
                            Loading
                        </Tag>
                        <Tag key={2} className="fee-type bp4-skeleton">
                            Loading
                        </Tag>
                        <Tag key={3} className="fee-type bp4-skeleton">
                            Loading
                        </Tag>
                    </div>
                    <Button className={"bp4-skeleton"} icon={"star"} />
                </div>
                <div className="center-info-container">
                    <span className="center-info bp4-skeleton">Loading</span>
                    <span className="center-info block-name bp4-skeleton">
                        Loading
                    </span>
                </div>
                <div className="sessions-skeleton bp4-skeleton">Loading</div>
            </div>
        );
    }

    let content;
    if (viewType === "table") {
        content = <SessionTable sessions={center ? center.sessions : []} />;
    } else if (viewType === "tags") {
        content = <SessionTags sessions={center ? center.sessions : []} />;
    }

    const starCenter = (_event, centerId) => {
        dispatch(setStarredCenters({ centers: [...starred, centerId] }));
        let starredNavLink = {
            href: `${process.env.PUBLIC_URL}/starred`,
            text: "See here",
        };
        AppToaster.show({
            message: "Center starred!",
            intent: Intent.SUCCESS,
            icon: "star",
            action: starredNavLink,
        });
    };

    const unstarCenter = (_event, centerId) => {
        const nextStarredCenters = starred.filter((val) => val !== centerId);
        dispatch(setStarredCenters({ centers: nextStarredCenters }));
    };

    const starButton = (centerId) => {
        if (starred.includes(centerId)) {
            return (
                <Button
                    className="center-star-button"
                    icon={"star"}
                    text={"Remove"}
                    onClick={(event) => unstarCenter(event, center.center_id)}
                    small={true}
                />
            );
        }
        return (
            <Button
                className="center-star-button"
                icon={"star-empty"}
                text={"Star"}
                onClick={(event) => starCenter(event, center.center_id)}
                small={true}
            />
        );
    };

    return (
        <div key={center.center_id} className="center bp4-elevation-1">
            <div className="center-info-container">
                <H5>{center.name}</H5>
            </div>
            <div className="center-info-container center-actions">
                <Tag
                    className="center-fee-type"
                    intent={feeType[center.fee_type]}
                >
                    {center.fee_type}
                </Tag>
                {center.vaccine_fees &&
                    center.vaccine_fees.map((vaccine_fee, id) => (
                        <Tag key={id} className="fee-type">
                            {vaccine_fee.vaccine}: ₹ {vaccine_fee.fee}
                        </Tag>
                    ))}
                {showStarButton && starButton(center.center_id)}
            </div>
            <div className="center-info-container">
                <span className="center-info">{center.address}</span>
                {center.block_name !== "Not Applicable" && (
                    <span className="center-info block-name">
                        [Block: {center.block_name}]
                    </span>
                )}
            </div>
            <div className="sessions">{content}</div>
        </div>
    );
}

/*
 *
 * Like CenterCard component but uses a separate endpoint for a single center.
 * CenterCard exists so that filtering/sorting can be performed
 *
 * */
function StarredCenterCard(props) {
    const { id, date } = props;

    const { data: center, isLoading } = cowinApi.useGetCalendarByCenterQuery({
        id: id,
        date: date,
    });

    return (
        <>
            {isLoading ? (
                <CenterCard center={{ center_id: id }} loading={true} />
            ) : (
                <CenterCard center={center} />
            )}
        </>
    );
}

export { CenterCard, StarredCenterCard };
