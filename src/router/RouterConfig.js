import { createBrowserRouter } from "react-router";
import { FaivoritePage } from "../pages/FaivoritePage";
import { HomePage } from "../pages/HomePage";
import { ResultPage } from "../pages/ResultPage";
import { TovarsPage } from "../pages/TovarsPage";
import { VacationPage } from "../pages/VacationPage";
import { AboutUsPage } from "../pages/AboutUs";
import { ContactPage } from "../pages/ContactPage";
import { TreshPage } from "../pages/TreshPage";
import { SearchPage } from "../pages/SearchPage";
import { App } from "../App";


export const router = createBrowserRouter ([
    {
        path: "/",
        Component: App,
        children: [
            { index: true, Component: HomePage},
            { path: "/aboutus", Component: AboutUsPage},
            { path: "/contact", Component: ContactPage},
            { path: "/faivorite", Component: FaivoritePage},
            { path: "/result", Component: ResultPage},
            { path: "/tovars", Component: TovarsPage},
            { path: "/tresh", Component: TreshPage},
            { path: "/vacation", Component: VacationPage},
            { path: "/search", Component: SearchPage}
        ]
    }
])