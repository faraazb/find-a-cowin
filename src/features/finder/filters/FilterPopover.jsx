import { useState } from "react";
import "./_filter-popover.scss";
import {Checkbox, Alignment, Button, Intent, H6, NumericInput, ControlGroup} from "@blueprintjs/core";
import { Classes, Popover2 } from "@blueprintjs/popover2"
import { useSelector } from "react-redux";
import { selectAgeFilter, selectVaccineFilter, setAgeFilter, setVaccineFilter } from "../../cowin/cowinSlice";
import { useDispatch } from "react-redux";
import { FeeTypeFilters } from "./FeeTypeFilters";

export function FilterPopover() {
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(false);
	const vaccineFilter = useSelector(selectVaccineFilter);
	const {minAge, maxAge} = useSelector(selectAgeFilter);

	const handleVaccineChange = (event, vaccine) => {
		dispatch(setVaccineFilter({vaccine: vaccine, value: event.target.checked}));
	}

	const handleAgeValueChange = (valueAsNum, valueAsStr, inputEl) => {
		let changedValue = valueAsNum
		let min = minAge;
		let max = maxAge;
		// if value is removed, then set the new value as empty string
		if (valueAsStr === "") {
			changedValue = valueAsStr
		}
		switch (inputEl.id) {
			case "filter-min-age":
				min = changedValue;
				break;
			case "filter-max-age":
				max = changedValue;
				break;
			default:
				break;
		}
		dispatch(setAgeFilter({minAge: min, maxAge: max}));
	}

	return (
		<Popover2
			content={
				<div>
					<div className="filter-group is-hidden-desktop">
						<H6>Fee Type</H6>
						<FeeTypeFilters alignmentVertical={true} />
					</div>
					<div className="filter-group">
						<H6>Vaccines</H6>
						<Checkbox
							className="filter-item"
							label={"Covishield"}
							checked={vaccineFilter.covishield.checked}
							onChange={(event) => handleVaccineChange(event, "COVISHIELD")}
							alignIndicator={Alignment.RIGHT}
						/>
						<Checkbox
							className="filter-item"
							label={"Covaxin"}
							checked={vaccineFilter.covaxin.checked}
							onChange={(event) => handleVaccineChange(event, "COVAXIN")}
							alignIndicator={Alignment.RIGHT}
						/>
						<Checkbox
							className="filter-item"
							label={"Covovax"}
							checked={vaccineFilter.covovax.checked}
							onChange={(event) => handleVaccineChange(event, "COVOVAX")}
							alignIndicator={Alignment.RIGHT}
						/>
						<Checkbox
							className="filter-item"
							label={"Corbevax"}
							checked={vaccineFilter.corbevax.checked}
							onChange={(event) => handleVaccineChange(event, "CORBEVAX")}
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
					<div className="filter-group">
						<H6>Age</H6>
						<ControlGroup vertical={true}>
							<div className="filter-input">
								<span>Min.</span>
								<NumericInput
									id="filter-min-age"
									className="filter-input-field"
									onValueChange={handleAgeValueChange}
									fill={true}
									clampValueOnBlur={true}
									value={minAge}
									min={12}
									max={45}
									selectAllOnFocus={true}
								/>
							</div>
							<div className="filter-input">
								<span>Max.</span>
								<NumericInput
									id="filter-max-age"
									className="filter-input-field"
									onValueChange={handleAgeValueChange}
									fill={true}
									value={maxAge}
									min={12}
									max={45}
									selectAllOnFocus={true}
								/>
							</div>
						</ControlGroup>
					</div>
					<Button intent={Intent.DANGER} className={Classes.POPOVER2_DISMISS} text="Close" fill={true}/>
				</div>
			}
			popoverClassName={Classes.POPOVER2_CONTENT_SIZING}
			interactionKind="click"
			isOpen={isOpen}
			onInteraction={state => setIsOpen(state)}
			placement="bottom-end"
		>
			<Button icon="filter-list" text="Filters" />
		</Popover2>
	);
}
