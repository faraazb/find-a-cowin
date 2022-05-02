import {Alignment, Checkbox, ControlGroup} from "@blueprintjs/core";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectFeeFilters, setFeeFilter} from "../../cowin/cowinSlice";

/*
* Free/Paid fee type filtering checkbox component.
* It dispatches the setFeeFilter action whenever checkbox state changes.
* See cowinSlice as to how the filtering works
* */
function FeeTypeFilters(props) {
    const dispatch = useDispatch();
    const feeFilter = useSelector(selectFeeFilters);
    const { alignmentVertical } = props;

    // @param {String} feeTypeVal Free or Paid
    // Update feeFilter[feeTypeVal] state in store by NOT(current value)
    // See cowinSlice for "filter" object structure
    const feeTypeChange = (event, feeTypeVal) => {
        dispatch(setFeeFilter({feeType: feeTypeVal, typeSelected: !feeFilter[feeTypeVal]}));
    }

    return (
        <ControlGroup
            className="fee-types"
            fill={true}
            vertical={alignmentVertical}
        >
            <Checkbox
                className="fee-type-checkbox"
                label={"Free"}
                checked={feeFilter["Free"]}
                onChange={(event) => feeTypeChange(event, "Free")}
                alignIndicator={Alignment.RIGHT}
            />
            <Checkbox
                className="fee-type-checkbox"
                label={"Paid"}
                checked={feeFilter["Paid"]}
                onChange={(event) => feeTypeChange(event, "Paid")}
                alignIndicator={Alignment.RIGHT}
            />
        </ControlGroup>
    )
}

export { FeeTypeFilters };
