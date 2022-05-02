import { React, useState } from "react";
import "./_filter-popover.scss";
import { Checkbox, Alignment, Button, Intent, H6 } from "@blueprintjs/core";
import { Classes, Popover2 } from "@blueprintjs/popover2"
import { useSelector } from "react-redux";
import { selectAgeFilter, selectVaccineFilter, setAgeFilter, setVaccineFilter } from "../../cowin/cowinSlice";
import { useDispatch } from "react-redux";
import { FeeTypeFilters } from "./FeeTypeFilters";

export function FilterPopover() {
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(false);
	const vaccineFilter = useSelector(selectVaccineFilter);
	const ageCategoryChecked = useSelector(selectAgeFilter)

	const handleVaccineChange = (event, vaccine) => {
		// console.log(vaccine, event.target.checked);
		dispatch(setVaccineFilter({vaccine: vaccine, value: event.target.checked}));
	}

	const handleAgeCategoryChange = (event) => {
		dispatch(setAgeFilter({age: event.target.id, value: event.target.checked}));
	}

	return (
		<Popover2
			content={
				<div>
					<div className="filter-group">
						<H6>Vaccines</H6>
						<Checkbox
							className="filter-item"
							label={"Covaxin"}
							checked={vaccineFilter.covaxin.checked}
							onChange={(event) => handleVaccineChange(event, "COVAXIN")}
							alignIndicator={Alignment.RIGHT}
						/>
						<Checkbox
							className="filter-item"
							label={"Covishield"}
							checked={vaccineFilter.covishield.checked}
							onChange={(event) => handleVaccineChange(event, "COVISHIELD")}
							alignIndicator={Alignment.RIGHT}
						/>
						<Checkbox
							className="filter-item"
							label={"Sputnik V"}
							checked={vaccineFilter.sputnik.checked}
							onChange={(event) => handleVaccineChange(event, "SPUTNIK V")}
							alignIndicator={Alignment.RIGHT}
						/>
					</div>
					<div className="filter-group is-hidden-desktop">
						<H6>Fee Type</H6>
						<FeeTypeFilters alignmentVertical={true} />
					</div>
					<div className="filter-group">
						<H6>Age</H6>
						<Checkbox
							className="filter-item"
							id="age-15-above"
							label={"15 and above"}
							checked={ageCategoryChecked.fifteenAbove}
							onChange={handleAgeCategoryChange}
							alignIndicator={Alignment.RIGHT}
						/>
						<Checkbox
							className="filter-item"
							id="age-18-44"
							label={"18 to 44"}
							checked={ageCategoryChecked.eighteenFortyFour}
							onChange={(handleAgeCategoryChange)}
							alignIndicator={Alignment.RIGHT}
						/>
						<Checkbox
							className="filter-item"
							id="age-45-above"
							label={"45 and above"}
							checked={ageCategoryChecked.fortyFiveAbove}
							onChange={handleAgeCategoryChange}
							alignIndicator={Alignment.RIGHT}
						/>
					</div>
					<Button intent={Intent.DANGER} className={Classes.POPOVER2_DISMISS} text="Close" fill={true}/>
				</div>
			}
			popoverClassName={Classes.POPOVER2_CONTENT_SIZING}
			interactionKind="click"
			isOpen={isOpen}
			onInteraction={state => setIsOpen(state)}
			placement="bottom"
		>
			<Button icon="filter-list" text="Filters" />
		</Popover2>
	);
}
