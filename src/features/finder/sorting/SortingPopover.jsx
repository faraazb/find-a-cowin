import { Checkbox, Alignment, Button, Intent, H6 } from "@blueprintjs/core";
import { Classes, Popover2 } from "@blueprintjs/popover2";

export function SortingPopover() {
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
                            onChange={(event) =>
                                handleVaccineChange(event, "COVAXIN")
                            }
                            alignIndicator={Alignment.RIGHT}
                        />
                        <Checkbox
                            className="filter-item"
                            label={"Covishield"}
                            checked={vaccineFilter.covishield.checked}
                            onChange={(event) =>
                                handleVaccineChange(event, "COVISHIELD")
                            }
                            alignIndicator={Alignment.RIGHT}
                        />
                        <Checkbox
                            className="filter-item"
                            label={"Sputnik V"}
                            checked={vaccineFilter.sputnik.checked}
                            onChange={(event) =>
                                handleVaccineChange(event, "SPUTNIK V")
                            }
                            alignIndicator={Alignment.RIGHT}
                        />
                    </div>
                    <div className="filter-group">
                        <H6>Age</H6>
                        <Checkbox
                            className="filter-item"
                            id="age-18-above"
                            label={"18 and above"}
                            checked={ageCategoryChecked.eighteenAbove}
                            onChange={handleAgeCategoryChange}
                            alignIndicator={Alignment.RIGHT}
                        />
                        <Checkbox
                            className="filter-item"
                            id="age-18-44"
                            label={"18 to 44"}
                            checked={ageCategoryChecked.eighteenFortyFour}
                            onChange={handleAgeCategoryChange}
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
                    <Button
                        intent={Intent.DANGER}
                        className={Classes.POPOVER2_DISMISS}
                        text="Close"
                        fill={true}
                    />
                </div>
            }
            popoverClassName={Classes.POPOVER2_CONTENT_SIZING}
            interactionKind="click"
            isOpen={isOpen}
            onInteraction={(state) => setIsOpen(state)}
            placement="bottom"
        >
            <Button icon="filter-list" text="Filters" />
        </Popover2>
    );
}
