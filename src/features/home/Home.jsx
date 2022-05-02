import React from "react";
import {ReactComponent as Logo} from "../../find-a-cowin.svg";
import { Button, Classes, H3, TagInput } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import "./_home.scss"


export function Home() {
    return (
        <div id="home">
            <div className="home-container">
				<div className="home-content">
					<Logo className="logo about-logo"/>
					<span>A slot finder/checker for the CoWIN vaccination platform</span>
					<span>built using the CoWIN Public API.</span>
					<div className="home-links">
						<a href="https://faraaz.tech/contact">
							<Tooltip2 content={"Get in touch"} position={"bottom"}>
								<Button className={Classes.MINIMAL} icon="user" text="faraaz.tech" />
							</Tooltip2>
						</a>
						<a href="https://github.com/faraazb/find-a-cowin">
							<Tooltip2 content={"Check out the source code"} position="bottom">
								<Button className={Classes.MINIMAL} icon="git-branch" text="GitHub" />
							</Tooltip2>
						</a>
					</div>
					<H3 className="home-help-title">Help regarding usage</H3>
					<div className="home-help"> 
						<table className="bp3-html-table bp3-html-table-bordered query-table">
							<thead>
								<tr>
								<th>Query</th>
								<th>Answer</th>
								</tr>
							</thead>
							<tbody>
								<tr>
								<td>Nothing happens when I type in the search bar..</td>
								<td>Press enter key! This is so that you can use multiple keywords. 
									For e.g. <TagInput values={["Andheri", "Borivali"]}/> to get all the centers 
									that match for <b>either</b> Andheri or Borivali.</td>
								</tr>
								<tr>
								<td>What does the refresh button do?</td>
								<td>It fetches the data again, without refreshing the page or resetting your filters.</td>
								</tr>
								<tr>
								<td>Where are starred centers saved?</td>
								<td>These are stored in your browser's local storage and cannot sync across devices.</td>
								</tr>
								<tr>
								<td>What does auto-refresh under Settings do?</td>
								<td>It regularly fetches new data for the selected district at the selected interval.</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
            </div>
        </div>
    );
}
