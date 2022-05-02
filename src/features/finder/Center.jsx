import {Button, H5, Intent, Tag} from "@blueprintjs/core";
import React from "react";
import {SessionTable, SessionTags} from "./Session";
import {useDispatch, useSelector} from "react-redux";
import {selectStarredCenters, setStarredCenters} from "../starred-centers/starredCentersSlice";
import {setCalendarByCenterStatus} from "../cowin/cowinSlice";
import {AppToaster} from "../../App";

/*
* Defines the Blueprintjs Intent color to use with a particular fee type
*
* */
const feeType = {
    "Paid": Intent.WARNING,
    "Free": Intent.SUCCESS
}

/*
* CenterCard component renders a center and its Cowin using the Session component. Currently, every session
* is rendered a Tag, but it's not very good looking.
*
* */
function CenterCard(props) {
    const {center, loading = false, showStarButton = true} = props;
    // maybe lift viewType and starred to finder itself
    const viewType = useSelector((state => state.settings.calendarByDistrictView));
    const dispatch = useDispatch();
    const starred = useSelector(selectStarredCenters);

    if (loading) {
        return (
            <div key={center} className="center bp3-elevation-1">
                <div className="center-info-container">
                    <span className="center-name bp3-skeleton">Loading</span>
                    <Tag className="center-fee-type bp3-skeleton" intent={Intent.PRIMARY}>
                        Loading
                    </Tag>
                    <div className="vaccine-fee-tags">
                        <Tag key={1} className="fee-type bp3-skeleton">Loading</Tag>
                        <Tag key={1} className="fee-type bp3-skeleton">Loading</Tag>
                        <Tag key={1} className="fee-type bp3-skeleton">Loading</Tag>
                    </div>
                    <Button className={"bp3-skeleton"} icon={"star"}/>
                </div>
                <div className="center-info-container">
                    <span className="center-info bp3-skeleton">Loading</span>
                    <span className="center-info block-name bp3-skeleton">Loading</span>
                </div>
                <div className="sessions-skeleton bp3-skeleton">
                    Loading
                </div>
            </div>
        )
    }

    let content;
    if (viewType === "table") {
        content = <SessionTable sessions={center.sessions}/>
    } else if (viewType === "tags") {
        content = <SessionTags sessions={center.sessions}/>
    }

    const starCenter = (event, centerId) => {
        dispatch(setCalendarByCenterStatus({centerId: centerId, fetchStatus: "idle"}))
        dispatch(setStarredCenters({centers: [...starred, centerId]}));
        let starredNavLink = {
            href: `${process.env.PUBLIC_URL}/starred`,
            text: "See here"
        };
        AppToaster.show({
            message: "Center starred!",
            intent: Intent.SUCCESS,
            icon: "star",
            action: starredNavLink
        });
    }

    const unstarCenter = (event, centerId) => {
        const nextStarredCenters = starred.filter((val) => val !== centerId);
        dispatch(setStarredCenters({centers: nextStarredCenters}));
    }

    const starButton = (centerId) => {
        if (starred.includes(centerId)) {
            return <Button
                className="center-star-button"
                icon={"star"} text={"Remove"}
                onClick={(event) => unstarCenter(event, center.center_id)}
                small={true}
            />
        }
        return <Button
            className="center-star-button"
            icon={"star-empty"} text={"Star"}
            onClick={(event) => starCenter(event, center.center_id)}
            small={true}
        />
    }

    return (
        <div key={center.center_id} className="center bp3-elevation-1">
            <div className="center-info-container">
                <H5>{center.name}</H5>
            </div>
            <div className="center-info-container center-actions">
                <Tag className="center-fee-type" intent={feeType[center.fee_type]}>
                    {center.fee_type}
                </Tag>
                {center.vaccine_fees && center.vaccine_fees.map((vaccine_fee, id) => (
                    <Tag key={id} className="fee-type">
                        {vaccine_fee.vaccine}: ₹ {vaccine_fee.fee}
                    </Tag>
                ))}
                {
                    showStarButton && starButton(center.center_id)
                }
            </div>
            <div className="center-info-container">
                <span className="center-info">{center.address}</span>
                {center.block_name !== "Not Applicable" &&
                    <span className="center-info block-name">[Block: {center.block_name}]</span>
                }
            </div>
            <div className="sessions">
                {content}
            </div>
        </div>
    )
}

export {CenterCard};