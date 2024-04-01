
// import { useEffect, useRef } from "react";
// import Cookies from 'js-cookie';
// import { Grid } from "@mui/material";

// const GetLocation = ({ showLocationPopUp, setShowLocationPopUp, locationFromCookies }) => {
//     const mapRef = useRef(null);
//     const searchInputRef = useRef(null);
//     const googleMap = useRef(null); // Store the reference to the Google map object

//     locationFromCookies ? setShowLocationPopUp(!showLocationPopUp) : ''

//     console.log("showLocationPopUp>>>>>>>>>>>>", showLocationPopUp);



//     useEffect(() => {

//         const loadGoogleMaps = async () => {
//             if (!window.google) {
//                 await new Promise((resolve, reject) => {
//                     const script = document.createElement("script");
//                     script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD8L237G-BLrf0hQtqaTdTiezwwqEzoq4A&libraries=places`;
//                     script.async = true;
//                     script.onload = resolve;
//                     script.onerror = reject;
//                     document.head.appendChild(script);
//                 });
//             }
//             initMap();
//         };

//         const initMap = () => {
//             const myLatlng = { lat: 20.5937, lng: 78.9629 };

//             const map = new window.google.maps.Map(mapRef.current, {
//                 zoom: 4,
//                 center: myLatlng,
//             });

//             const searchBox = new window.google.maps.places.SearchBox(searchInputRef.current);

//             map.addListener("bounds_changed", () => {
//                 searchBox.setBounds(map.getBounds());
//             });

//             searchBox.addListener("places_changed", () => {
//                 const places = searchBox.getPlaces();

//                 if (places.length === 0) {
//                     return;
//                 }

//                 const locations = places[0].address_components.map(data => data.long_name);

//                 // setShowLocationPopUp(!showLocationPopUp)

//                 // Cookies.set("locations", JSON.stringify(locations)).then(() => alert("?????????????"))

//                 const bounds = new window.google.maps.LatLngBounds();

//                 places.forEach(place => {
//                     if (!place.geometry || !place.geometry.location) {
//                         console.log("Returned place contains no geometry");
//                         return;
//                     }

//                     const marker = new window.google.maps.Marker({
//                         map,
//                         title: place.name,
//                         position: place.geometry.location,
//                     });

//                     bounds.extend(place.geometry.location);

//                     marker.addListener("click", () => {
//                         const infoWindow = new window.google.maps.InfoWindow({
//                             content: place.name,
//                         });
//                         infoWindow.open(map, marker);
//                     });
//                 });

//                 map.fitBounds(bounds);
//             });

//             // Store the Google map object in the ref
//             googleMap.current = map;
//         };

//         loadGoogleMaps();

//         return () => {
//             // Clear event listeners only if the mapRef is not null
//             if (mapRef.current && googleMap.current) {
//                 window.google.maps.event.clearInstanceListeners(googleMap.current);
//             }
//         };
//     }, []);

//     return (

//         <Grid container sx={{
//             zIndex: 400, position: 'fixed', top: 0, left: 0,
//             backgroundColor: 'rgba(10, 0, 0, 0.4)',
//             height: '100vh', justifyContent: 'center', alignItems: 'center',
//             display: locationFromCookies ? 'none' : 'flex'
//         }}>
//             <Grid container xs={11} sm={6} md={5} lg={4.5} sx={{ bgcolor: '' }}>
//                 <input
//                     ref={searchInputRef}
//                     type="text"
//                     placeholder="Search for places..."
//                     style={{ background: '', height: "40px", width: "100%" }}
//                 />
//                 <Grid
//                     id="map"
//                     ref={mapRef}
//                     sx={{ width: "100%", height: "300px", borderRadius: "10px" }}
//                 >




//                 </Grid>
//             </Grid>
//         </Grid>
//     );
// }

// export default GetLocation;












import { useState, useEffect, useRef } from "react";
import Cookies from 'js-cookie';
import { Grid, Typography } from "@mui/material";
import { POPUP_FONT, PRIMARY_BGCOLOUR } from "@/utils";

const GetLocation = ({ showLocationPopUp, setShowLocationPopUp, locationFromCookies }) => {
    const mapRef = useRef(null);
    const searchInputRef = useRef(null);
    const googleMap = useRef(null);
    const [searchedLocationMarker, setSearchedLocationMarker] = useState(null); // State to store the marker for the searched location

    const [one, setOne] = useState()

    locationFromCookies ? setShowLocationPopUp(!showLocationPopUp) : '';



    const cookieStore = () => {

        setShowLocationPopUp(!showLocationPopUp)
        Cookies.set("locations", one).then(() => alert("?????????????"))
    }

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
            const myLatlng = { lat: 20.5937, lng: 78.9629 };

            const map = new window.google.maps.Map(mapRef.current, {
                zoom: 4,
                center: myLatlng,
            });

            const searchBox = new window.google.maps.places.SearchBox(searchInputRef.current);

            map.addListener("bounds_changed", () => {
                searchBox.setBounds(map.getBounds());
            });

            map.addListener("click", (event) => {
                // Convert clicked coordinates to address using Geocoder
                const geocoder = new window.google.maps.Geocoder();
                geocoder.geocode({ location: event.latLng }, (results, status) => {
                    if (status === "OK") {
                        if (results[0]) {
                            console.log("Clicked Position Address>>>>>>>>>>>>>>>>>>>>>>>>>>>>:", results[0].formatted_address);
                            // setShowLocationPopUp(!showLocationPopUp)
                            // Cookies.set("locations", JSON.stringify(one)).then(() => alert("?????????????"))
                            // Cookies.set("locations", JSON.stringify(locations)).then(() => alert("?????????????"))
                            setOne(results[0].formatted_address)
                        } else {
                            console.log("No results found");
                        }
                    } else {
                        console.log("Geocoder failed due to: " + status);
                    }
                });
            });

            searchBox.addListener("places_changed", () => {
                const places = searchBox.getPlaces();

                if (places.length === 0) {
                    return;
                }

                const bounds = new window.google.maps.LatLngBounds();

                places.forEach(place => {
                    if (!place.geometry || !place.geometry.location) {
                        console.log("Returned place contains no geometry");
                        return;
                    }

                    // Create a marker for the searched location
                    const marker = new window.google.maps.Marker({
                        map,
                        title: place.name,
                        position: place.geometry.location,
                    });

                    // Add click event listener to the marker to display info window
                    marker.addListener("click", () => {
                        console.log("Searched Location Address:", place.formatted_address);
                    });

                    // Extend bounds to include the searched location
                    bounds.extend(place.geometry.location);

                    // Set the searched location marker state
                    setSearchedLocationMarker(marker);
                });

                // Fit the map to the bounds including the searched location
                map.fitBounds(bounds);
            });

            googleMap.current = map;
        };

        loadGoogleMaps();

        return () => {
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
                />

                <Grid container onClick={cookieStore} sx={{ bgcolor: PRIMARY_BGCOLOUR, my: 1, justifyContent: 'center', borderRadius: 2, cursor: 'pointer' }}>
                    <Typography sx={{
                        py: 2, color: '#FFF', fontWeight: "bold",
                        fontFamily: POPUP_FONT
                    }}>Delever To this Location</Typography>
                </Grid>

            </Grid>


        </Grid>
    );
}

export default GetLocation;
