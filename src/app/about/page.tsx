"use client";

import {
  ActionIcon,
  AppShell,
  Flex,
  Paper,
  Space,
  Text,
  Title,
  useSafeMantineTheme,
} from "@mantine/core";
import { IconHome } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const About = () => {
  const router = useRouter();
  const theme = useSafeMantineTheme();

  const height = 60;

  const handleHomeClick = () => {
    router.push("/");
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
            onClick={handleHomeClick}
            style={{ position: "absolute", right: theme.spacing.md }}
          >
            <IconHome />
          </ActionIcon>
        </Flex>
      </AppShell.Header>

      <AppShell.Main>
        <Paper shadow={"sm"} radius={"md"} p={"sm"} withBorder>
          <Text>
            Data provided by{" "}
            <a href={"https://www.openstreetmap.org/"} title={"OpenStreetMap"}>
              OpenStreetMap
            </a>{" "}
            with{" "}
            <a href={"https://overpass-turbo.eu/"} title={"OverpassAPI"}>
              OverpassAPI
            </a>
          </Text>
        </Paper>
        <Space h={"md"} />
        <Paper shadow={"sm"} radius={"md"} p={"sm"} withBorder>
          <Text>
            Icons made by{" "}
            <a
              href={"https://www.flaticon.com/authors/hqrloveq"}
              title={"hqrloveq"}
            >
              hqrloveq
            </a>{" "}
            from{" "}
            <a href={"https://www.flaticon.com/"} title={"Flaticon"}>
              Flaticon
            </a>
          </Text>
        </Paper>
      </AppShell.Main>
    </AppShell>
  );
};
export default About;
