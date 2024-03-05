import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { StoredRecord, alcoTrackerDB, storedRecordsValidator } from "../db/db";

import * as converter from "json-2-csv";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { ReadableStream } from "stream/web";
import { useRecordsStore } from "../stores/recordsStore";

const download = (content: any, fileName: string, contentType: string) => {
  var a = document.createElement("a");
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
};

export function Data() {
  const recordsCount = useRecordsStore((state) => state.recordsCount);
  const setRecordsCount = useRecordsStore((state) => state.setRecordsCount);

  const [isDeleteable, setIsDeletable] = useState<boolean>(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const toast = useToast();
  const filesRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    checkRecordsCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkRecordsCount = async () => {
    setRecordsCount(await alcoTrackerDB.count("records"));
  };

  const handleExport = async (type: "json" | "csv") => {
    const jsonData = await alcoTrackerDB.getAll("records");
    if (type === "json")
      return download(
        JSON.stringify(jsonData),
        "alcotracker-export.json",
        "text/json"
      );
    if (type === "csv") {
      const csv = await converter.json2csv(jsonData, {});
      return download(csv, "alcotracker-export.csv", "text/plain");
    }
  };

  const handleDelete = async () => {
    try {
      await alcoTrackerDB.clear("records");
      checkRecordsCount();

      toast({
        title: `All data cleared.`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setIsDeletable(false);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleImport = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      if (!files) return;
      const file = files[0];

      const fileContentStream = file.stream() as unknown as ReadableStream;
      const readableStream = fileContentStream.getReader();
      const chunk = await readableStream.read();
      const dataStr = new TextDecoder("utf-8").decode(chunk.value);
      const data: StoredRecord[] = JSON.parse(dataStr);

      if (!storedRecordsValidator(data))
        throw new Error("Bad format of JSON import");

      const tx = alcoTrackerDB.transaction("records", "readwrite");
      await Promise.all([
        ...data.map((d) => {
          return tx.store.add(d);
        }),
        tx.done,
      ]);
      setFiles(null);
      filesRef.current?.reset();

      checkRecordsCount();

      toast({
        title: `Your data was imported.`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <Box maxWidth={"lg"}>
      <Heading as="h1" m={4}>
        Your data
      </Heading>
      <Card m={4}>
        <CardHeader pb={1}>
          <Heading>Export data</Heading>
        </CardHeader>
        <CardBody pt={0}>
          <Text mb={4}>
            You can export your data. Use JSON if you want to import it again
            later.
          </Text>
          <Button
            onClick={() => handleExport("json")}
            isDisabled={recordsCount <= 0}
            mr={2}
          >
            Export data as JSON
          </Button>
          <Button
            onClick={() => handleExport("csv")}
            isDisabled={recordsCount <= 0}
          >
            Export data as CSV
          </Button>
        </CardBody>
      </Card>

      <Card m={4}>
        <CardHeader pb={1}>
          <Heading>Clear all data</Heading>
        </CardHeader>
        <CardBody pt={0}>
          {!isDeleteable && (
            <Button
              onClick={() => setIsDeletable(true)}
              isDisabled={recordsCount <= 0}
            >
              Delete all data
            </Button>
          )}
          {isDeleteable && (
            <>
              <Button onClick={() => handleDelete()} colorScheme="red">
                Click again to delete all data
              </Button>
              <Button variant="ghost" onClick={() => setIsDeletable(false)}>
                cancel
              </Button>
            </>
          )}
        </CardBody>
      </Card>

      <Card m={4}>
        <CardHeader pb={1}>
          <Heading>Import JSON data</Heading>
        </CardHeader>
        <CardBody pt={0}>
          <Text mb={4}>
            You can import previously exported data again. Handy if you need to
            change phone or such.
          </Text>
          <form
            encType="multipart/form-data"
            onSubmit={(e) => handleImport(e)}
            ref={filesRef}
          >
            <input
              type="file"
              id="upload-file"
              onChange={(e) => setFiles(e.target.files)}
            />
            <Button type="submit">Upload</Button>
          </form>
        </CardBody>
      </Card>
    </Box>
  );
}
