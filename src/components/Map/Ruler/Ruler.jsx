import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "./Ruler.css";
import './rulerControl/leaflet-ruler'
// import "leaflet/dist/leaflet.css";

export function Ruler() {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        L.control.ruler().addTo(map);
    }, [map]);

    return null;
}
