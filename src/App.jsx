import "./_app.scss";
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { ReactComponent as Logo } from "./find-a-cowin.svg";
import { useDispatch } from "react-redux";
import { resetSettings } from "./features/settings/settingsSlice";
import { Finder } from "./features/finder/Finder";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import {
    FocusStyleManager,
    Alignment,
    Button,
    Classes,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
} from "@blueprintjs/core";
import { Home } from "./features/home/Home";
import { FourOFour } from "./features/FourOFour";
import { StarredCenters } from "./features/starred-centers/StarredCenters";
import { Toaster } from "@blueprintjs/core";

/** Singleton toaster instance. A div has been manually added to index.html*/
export let AppToaster;
const container = document.getElementById("toaster");
createRoot(container).render(
    <Toaster
        ref={(instance) => {
            AppToaster = instance;
        }}
    />
);

FocusStyleManager.onlyShowFocusOnTabs();

function App() {
    const dispatch = useDispatch();
    const initializeSettings = !localStorage.getItem("SETTINGS");

    const switchTheme = () => {
        const div = document.getElementById("app");
        if (div.classList.contains("bp4-dark")) {
            div.classList.remove("bp4-dark");
            setThemeButton({ name: "Dark Theme", icon: "moon" });
        } else if (!div.classList.contains("bp4-dark")) {
            div.classList.add("bp4-dark");
            setThemeButton({ name: "Light Theme", icon: "flash" });
        }
    };

    const useThemeDetector = () => {
        const getCurrentTheme = () =>
            window.matchMedia("(prefers-color-scheme: dark)").matches;
        const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());

        const mqListener = (e) => {
            setIsDarkTheme(e.matches);
        };

        useEffect(() => {
            const darkThemeMq = window.matchMedia(
                "(prefers-color-scheme: dark)"
            );
            darkThemeMq.addEventListener("change", mqListener);
            return () => darkThemeMq.removeEventListener("change", mqListener);
        }, []);
        return isDarkTheme;
    };

    const isDarkTheme = useThemeDetector();
    const [themeButton, setThemeButton] = useState({
        name: isDarkTheme ? "Light Theme" : "Dark Theme",
        icon: isDarkTheme ? "flash" : "moon",
    });

    useEffect(() => {
        if (isDarkTheme) {
            const div = document.getElementById("app");
            div.classList.add("bp4-dark");
        }
    }, [isDarkTheme]);

    useEffect(() => {
        if (initializeSettings) {
            // console.log("Resetting settings")
            dispatch(resetSettings());
        }
    });

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div id="app">
                <Navbar>
                    <NavbarGroup align={Alignment.LEFT}>
                        <NavLink to="/" id="find-a-cowin">
                            <NavbarHeading className="navigation-header">
                                <Logo className="logo" />
                            </NavbarHeading>
                        </NavLink>
                        <NavbarDivider className="navigation-divider" />
                        <NavLink to="/about">
                            <Button
                                className={Classes.MINIMAL}
                                icon="info-sign"
                                text="About"
                            />
                        </NavLink>
                    </NavbarGroup>
                    <NavbarGroup align={Alignment.RIGHT}>
                        <Button
                            className={Classes.MINIMAL}
                            icon={themeButton.icon}
                            text={themeButton.name}
                            onClick={switchTheme}
                        />
                    </NavbarGroup>
                </Navbar>
                <div className="app-route">
                    <Routes>
                        <Route path="starred" element={<StarredCenters />} />
                        <Route path="about" element={<Home />} />
                        <Route exact path="/" element={<Finder />} />
                        <Route path="*" element={<FourOFour />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
