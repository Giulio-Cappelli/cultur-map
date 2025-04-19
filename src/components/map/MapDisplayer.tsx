"use client";

import { Paper, useSafeMantineTheme } from "@mantine/core";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import MapMarker from "./markers/MapMarker";
import UserMarker from "./markers/UserMarker";
import { Element } from "../../types/types";

const selectMarkers = (data: Element[]) => {
  return <MapMarker data={data} />;
};

const MapDisplayer = (props: {
  data: Element[];
  height: string;
  userPosition: LatLngExpression;
}) => {
  const { data, height, userPosition } = props;

  const theme = useSafeMantineTheme();

  return (
    <Paper shadow={"sm"} radius={"md"} p={"sm"} withBorder h={height}>
      <MapContainer
        center={userPosition}
        zoom={16}
        style={{ height: "100%", width: "100%", borderRadius: theme.radius.md }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <UserMarker position={userPosition} />
        {selectMarkers(data)}
      </MapContainer>
    </Paper>
  );
};
export default MapDisplayer;
