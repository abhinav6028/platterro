"use client"
import { Grid } from "@mui/material";
import Header from "./UI/Header";
import Footer from "./UI/Footer";
import LoginSignUp from "./LoginSignUp/LoginSignUp";
import { useEffect, useState } from "react";
import GetLocation from "./GetLocation";

import Cookies from 'js-cookie'

// Layout
export default function Layout({ children }) {

    const [showLogin, setShowLogin] = useState(true);
    const [Location, setLocation] = useState()

    const locationFromCookies = Cookies.get("locations")

    // const [loc,setLoc] = useState(Cookies.get("locations"))
    const [showLocationPopUp, setShowLocationPopUp] = useState(true) // for showing google map


    locationFromCookies == "undefined" ? setShowLocationPopUp(true) : showLocationPopUp;

    console.log("showLocationPopUp>>>>>><<<<<<",showLocationPopUp);


    return (
        <Grid container>

            <Header
                showLogin={showLogin}
                setShowLogin={setShowLogin}
                showLocationPopUp={showLocationPopUp}
                setShowLocationPopUp={setShowLocationPopUp}
            />

            <LoginSignUp showLogin={showLogin} setShowLogin={setShowLogin} />

        
            <GetLocation
            showLocationPopUp={showLocationPopUp}
            setShowLocationPopUp={setShowLocationPopUp}
            
            Location={Location}
            setLocation={setLocation}
            locationFromCookies={locationFromCookies}
        />



            <Grid container sx={{
                // mt: 30
            }}>

                {children}
            </Grid>

            <Footer />

        </Grid>


    )
}


// {showLocationPopUp &&

    // <GetLocation
    //     showLocationPopUp={showLocationPopUp}
    //     setShowLocationPopUp={setShowLocationPopUp}
    //     Location={Location}
    //     setLocation={setLocation}
    //     locationFromCookies={locationFromCookies}
    // />
    
// }
