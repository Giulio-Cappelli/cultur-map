import { LatLngExpression } from "leaflet";
import { OverpassData } from "../types/types";

const fetchData = async (
  coords: LatLngExpression,
  radius: number
): Promise<OverpassData> => {
  const query2 = `[out:json][timeout:25];
    (
      way["historic"="yes"]["building"](around:${radius},${coords.toString()});
      way["tourism"~"attraction|museum"]["building"](around:${radius},${coords.toString()});
    );
    out center;
  `;

  const response = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" }, // Specifica il tipo di contenuto
    body: "data=" + encodeURIComponent(query2),
  });

  const data = await response.json();
  return data;
};
export default fetchData;
