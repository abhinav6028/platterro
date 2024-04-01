
import { useEffect, useRef } from "react";
import Cookies from 'js-cookie';
import { Grid } from "@mui/material";

const GetLocation = ({ showLocationPopUp, setShowLocationPopUp, locationFromCookies }) => {
    const mapRef = useRef(null);
    const searchInputRef = useRef(null);
    const googleMap = useRef(null); // Store the reference to the Google map object

    locationFromCookies ? setShowLocationPopUp(!showLocationPopUp) : ''

    console.log(("showLocationPopUp from GetLocation???", showLocationPopUp))
    



    useEffect(() => {

        const loadGoogleMaps = async () => {
            if (!window.google) {
                await new Promise((resolve, reject) => {
                    const script = document.createElement("script");
                    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD8L237G-BLrf0hQtqaTdTiezwwqEzoq4A&libraries=places`;
                    script.async = true;
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
            }
            initMap();
        };

        const initMap = () => {
            const myLatlng = { lat: -25.363, lng: 131.044 };

            const map = new window.google.maps.Map(mapRef.current, {
                zoom: 4,
                center: myLatlng,
            });

            const searchBox = new window.google.maps.places.SearchBox(searchInputRef.current);

            map.addListener("bounds_changed", () => {
                searchBox.setBounds(map.getBounds());
            });

            searchBox.addListener("places_changed", () => {
                const places = searchBox.getPlaces();

                if (places.length === 0) {
                    return;
                }

                const locations = places[0].address_components.map(data => data.long_name);

                setShowLocationPopUp(!showLocationPopUp)
                Cookies.set("locations", JSON.stringify(locations)).then(() => alert("?????????????"))

                // console.log("locations", locations);

                const bounds = new window.google.maps.LatLngBounds();

                places.forEach(place => {
                    if (!place.geometry || !place.geometry.location) {
                        console.log("Returned place contains no geometry");
                        return;
                    }

                    const marker = new window.google.maps.Marker({
                        map,
                        title: place.name,
                        position: place.geometry.location,
                    });

                    bounds.extend(place.geometry.location);

                    marker.addListener("click", () => {
                        const infoWindow = new window.google.maps.InfoWindow({
                            content: place.name,
                        });
                        infoWindow.open(map, marker);
                    });
                });

                map.fitBounds(bounds);
            });

            // Store the Google map object in the ref
            googleMap.current = map;
        };

        loadGoogleMaps();

        return () => {
            // Clear event listeners only if the mapRef is not null
            if (mapRef.current && googleMap.current) {
                window.google.maps.event.clearInstanceListeners(googleMap.current);
            }
        };
    }, []);

    return (

        <Grid container sx={{
            zIndex: 400, position: 'fixed', top: 0, left: 0,
            backgroundColor: 'rgba(10, 0, 0, 0.4)',
            height: '100vh', justifyContent: 'center', alignItems: 'center',
            display: locationFromCookies ? 'none' : 'flex'
        }}>
            <Grid container xs={11} sm={6} md={5} lg={4.5} sx={{ bgcolor: '' }}>
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search for places..."
                    style={{ background: '', height: "40px", width: "100%" }}
                />
                <Grid
                    id="map"
                    ref={mapRef}
                    sx={{ width: "100%", height: "300px", borderRadius: "10px" }}
                ></Grid>
            </Grid>
        </Grid>
    );
}

export default GetLocation;
