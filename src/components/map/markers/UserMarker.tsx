import { LatLngExpression, icon } from "leaflet";
import { Marker } from "react-leaflet";

const ICON = icon({
  iconUrl: "/cultur-map/icons/gps_blue.png",
  iconSize: [24, 24],
});

const UserMarker = (props: { position: LatLngExpression }) => {
  const { position } = props;

  return <Marker position={position} icon={ICON} key={0}></Marker>;
};
export default UserMarker;
