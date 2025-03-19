import { Box, Button, Flex, Paper, Slider } from "@mantine/core";

const SearchBar = (props: {
  height: string;
  min: number;
  max: number;
  value: number;
  onValueChange: (value: number) => void;
  reload: () => void;
}) => {
  const { height, min, max, value, onValueChange, reload } = props;

  return (
    <Paper shadow={"sm"} radius={"md"} p={"sm"} withBorder h={height}>
      <Flex
        gap={"md"}
        justify={"center"}
        align={"flex-end"}
        direction={"row"}
        wrap={"nowrap"}
      >
        <Box maw={400} style={{ width: "100%" }}>
          <Slider
            w={"100%"}
            size={"md"}
            radius={"md"}
            marks={[
              { value: min, label: `${min} m` },
              { value: 100, label: `100 m` },
              { value: 250, label: `250 m` },
              { value: 500, label: `500 m` },
              { value: 750, label: `750 m` },
              { value: max, label: `${max} m` },
            ]}
            min={min}
            max={max}
            step={10}
            value={value}
            onChangeEnd={onValueChange as (value: number) => void}
            label={(value) => `${value} m`}
            restrictToMarks
          />
        </Box>
        <Button variant={"filled"} onClick={reload} radius={"md"}>
          Search
        </Button>
      </Flex>
    </Paper>
  );
};
export default SearchBar;
