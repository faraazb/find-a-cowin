import './_app.scss';
import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import { resetSettings } from './features/settings/settingsSlice';
import {AvailableSlots} from "./features/finder/Finder";
import {BrowserRouter, NavLink, Route, Switch} from "react-router-dom";
import {FocusStyleManager, Alignment, Button, Classes, Navbar, NavbarDivider, NavbarGroup, 
    NavbarHeading} from "@blueprintjs/core";
import { Home } from './features/home/Home';


FocusStyleManager.onlyShowFocusOnTabs();

function App() {
    const dispatch = useDispatch();
    const initializeSettings = !localStorage.getItem('SETTINGS')

    const switchTheme = () => {
        const div = document.getElementById("app");
        if (div.classList.contains("bp3-dark")) {
            div.classList.remove("bp3-dark");
            setThemeButton({name: "Dark Theme", icon: "moon"});
        }
        else if (!div.classList.contains("bp3-dark")) {
            div.classList.add("bp3-dark");
            setThemeButton({name: "Light Theme", icon: "flash"});
        }
    }

    const useThemeDetector = () => {
        const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
        const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());

        const mqListener = (e => {
            setIsDarkTheme(e.matches);
        });
        
        useEffect(() => {
          const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
          darkThemeMq.addEventListener("change", mqListener);
          return () => darkThemeMq.removeEventListener("change", mqListener);
        }, []);
        return isDarkTheme;
    }

    const isDarkTheme = useThemeDetector()
    const [themeButton, setThemeButton] = useState(
        {
            name: isDarkTheme ? "Light Theme" : "Dark Theme", 
            icon: isDarkTheme ? "flash" : "moon"
        }
    );

    useEffect(() => {
        if (isDarkTheme) {
            const div = document.getElementById("app");
            div.classList.add("bp3-dark");
        }
    }, [isDarkTheme])

    useEffect(() => {
        if (initializeSettings) {
            console.log("Resetting settings")
            dispatch(resetSettings());
        }
    });

    return (
    <BrowserRouter>
        <div id="app">
            <Navbar>
                <NavbarGroup align={Alignment.LEFT}>
                    <NavLink to="/" id="find-a-cowin">
                        <NavbarHeading className="navigation-header">
                            <span className="bp3-heading">Find-a-CoWIN</span>
                        </NavbarHeading>
                    </NavLink>
                    <NavbarDivider />
                    <NavLink to="/about">
                        <Button className={Classes.MINIMAL} icon="info-sign" text="About" />
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
                <Switch>
                    <Route path="/about">
                        <Home />
                    </Route>

                    <Route path="/">
                        <AvailableSlots />
                    </Route>
                </Switch>
            </div>
        </div>
    </BrowserRouter>
    );
}

export default App;
