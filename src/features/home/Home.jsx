import React from "react";
import { ReactComponent as Logo } from "../../find-a-cowin.svg";
import { Button, H3, Intent, TagInput } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import "./_home.scss";

export function Home() {
    return (
        <div id="home">
            <div className="home-container">
                <div className="home-content">
                    <Logo className="logo about-logo" />
                    <div className="home-description">
                        A slot finder/checker for the CoWIN vaccination platform
                        built using the CoWIN Public API.
                    </div>
                    <div className="home-links">
                        <a
                            href="https://github.com/faraazb/find-a-cowin"
                            target={"_blank"}
                            rel={"noreferrer"}
                        >
                            <Tooltip2
                                content={"Check out the source code"}
                                position="bottom"
                            >
                                <Button
                                    icon="git-branch"
                                    text={"GitHub"}
                                    minimal={true}
                                    intent={Intent.PRIMARY}
                                />
                            </Tooltip2>
                        </a>
                        <a
                            href="https://faraazbiyabani.me"
                            target={"_blank"}
                            rel={"noreferrer"}
                        >
                            <Button
                                text={"Faraaz Biyabani"}
                                minimal={true}
                                intent={Intent.PRIMARY}
                            />
                        </a>
                    </div>
                    <div className="home-help">
                        <H3 className="home-help-title">
                            Help regarding usage
                        </H3>
                        <table className="bp4-html-table bp4-html-table-bordered query-table">
                            <thead>
                                <tr>
                                    <th>Query</th>
                                    <th>Answer</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        Nothing happens when I type in the
                                        search bar..
                                    </td>
                                    <td>
                                        Press enter key! This is so that you can
                                        use multiple keywords. For e.g.{" "}
                                        <TagInput
                                            values={["Andheri", "Borivali"]}
                                        />{" "}
                                        to get all the centers that match for{" "}
                                        <b>either</b> Andheri or Borivali.
                                    </td>
                                </tr>
                                <tr>
                                    <td>What does the refresh button do?</td>
                                    <td>
                                        It fetches the data again, without
                                        refreshing the page or resetting your
                                        filters.
                                    </td>
                                </tr>
                                <tr>
                                    <td>Where are starred centers saved?</td>
                                    <td>
                                        These are stored in your browser's local
                                        storage and cannot sync across devices.
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        What does auto-refresh under Settings
                                        do?
                                    </td>
                                    <td>
                                        It regularly fetches new data for the
                                        selected district at the selected
                                        interval.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
