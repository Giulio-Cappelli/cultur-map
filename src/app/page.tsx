"use client";

import {
  ActionIcon,
  AppShell,
  Center,
  Flex,
  Loader,
  Space,
  Title,
  useSafeMantineTheme,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { LatLngExpression } from "leaflet";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import { Element, OverpassData } from "../types/types";
import { useRouter } from "next/navigation";
import fetchData from "../functions/fetchData";

const MapDisplayer = dynamic(() => import("../components/map/MapDisplayer"), {
  ssr: false,
});

const Home = () => {
  const router = useRouter();
  const theme = useSafeMantineTheme();

  const height = 60;

  const [radius, setRadius] = useState<number>(100);
  const [reload, setReload] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const center = useMemo(
    () => [46.0649489, 11.1233195] as LatLngExpression,
    []
  ); // Trento
  const [userPosition, setUserPosition] = useState<LatLngExpression | null>(
    null
  ); //My position
  const [data, setData] = useState<Element[] | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          setUserPosition([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          console.error("Error getting user position:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }
  }, []);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      try {
        const apiData: OverpassData = await fetchData(
          userPosition ? userPosition : center,
          radius
        );
        setData(apiData.elements);
        setReload(false);
        console.log("Data fetched correctly: ", apiData); //DEBUG
      } catch (error) {
        console.error("Error fetching data:", error); //DEBUG
      } finally {
        setLoading(false);
      }
    };

    if (userPosition || reload) {
      fetchDataAsync();
    }
  }, [userPosition, reload]);

  const handleReload = () => {
    setReload(true);
  };

  const handleInfoClick = () => {
    router.push("/about");
  };

  return (
    <AppShell header={{ height: height }} padding={"md"}>
      <AppShell.Header>
        <Flex
          h={height}
          bg={"orange"}
          gap={"md"}
          justify={"center"}
          align={"center"}
          direction={"row"}
          wrap={"nowrap"}
          style={{ position: "relative" }}
        >
          <Title order={1} style={{ flex: 1, textAlign: "center" }}>
            CulturMap
          </Title>
          <ActionIcon
            variant={"outline"}
            color={"black"}
            radius={"md"}
            size={"md"}
            onClick={handleInfoClick}
            style={{ position: "absolute", right: theme.spacing.md }}
          >
            <IconInfoCircle />
          </ActionIcon>
        </Flex>
      </AppShell.Header>

      <AppShell.Main>
        <SearchBar
          height={"10vh"}
          min={50}
          max={1000}
          value={radius}
          onValueChange={setRadius}
          reload={handleReload}
        />
        <Space h={"md"} />
        {!loading && data ? (
          <MapDisplayer
            data={data}
            height={"78vh"}
            userPosition={userPosition ? userPosition : center}
          />
        ) : (
          <Center>
            <Loader />
          </Center>
        )}
      </AppShell.Main>
    </AppShell>
  );
};
export default Home;
