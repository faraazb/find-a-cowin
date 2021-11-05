import { Button, Classes, H1 } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import React from "react";
import { NavLink } from "react-router-dom";
import "./_four-o-four.scss"

export function FourOFour() {
    return (
        <div id="four-o-four">
            <div className="four-o-four-container">
				<div className="four-o-four-content">
					<H1 className="four-o-four-title big">404</H1>
                    <H1 className="four-o-four-title">Not Found</H1>
					<span>Please visit any of the below links.</span>
					<div className="four-o-four-links">
						<NavLink to="/">
                            <Button className={Classes.MINIMAL} icon="search" text="Slot Finder" />
						</NavLink>
						<NavLink to="/about">
                            <Button className={Classes.MINIMAL} icon="info-sign" text="About" />
						</NavLink>
					</div>
				</div>
            </div>
        </div>
    );
}
