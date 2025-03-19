import { Paper, /*useSafeMantineTheme*/ } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { Element } from "./types/types";
import { useEffect, useRef, useState } from "react";

const TableDisplayer = (props: { data: Element[]; height: string }) => {
  const { data, height } = props;
  //console.log("TableDisplayer received data:", data); //DEBUG

  //const theme = useSafeMantineTheme();

  const batchSize = 100;
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState(data.slice(0, batchSize));
  const scrollViewportRef = useRef<HTMLDivElement>(null);

  let timeout: ReturnType<typeof setTimeout> | undefined;

  const loadMoreRecords = () => {
    if (records.length < data.length) {
      setLoading(true);
      timeout = setTimeout(() => {
        setRecords(data.slice(0, records.length + batchSize));
        setLoading(false);
      }, 1000);
    }
  };

  /*const reset = () => {
    setRecords(data.slice(0, batchSize));
    // Make sure to scroll to top after resetting records
    scrollViewportRef.current?.scrollTo(0, 0);
  };*/

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [timeout]);

  return (
    <Paper shadow={"sm"} radius={"md"} p={"sm"} withBorder h={height}>
      <DataTable
        striped
        withColumnBorders
        //borderColor={theme.colors.green[8]}
        //rowBorderColor={theme.colors.green[8]}
        fz={"sm"}
        fetching={loading}
        onScrollToBottom={loadMoreRecords}
        scrollViewportRef={scrollViewportRef}
        columns={[
          { accessor: "tags.name", title: "Nome" },
          { accessor: "tags.amenity", title: "Tipologia" },
          { accessor: "lat", title: "Latitudine" },
          { accessor: "lon", title: "Longitudine" },
        ]}
        records={records}
      />
    </Paper>
  );
};
export default TableDisplayer;
