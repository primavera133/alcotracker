import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Icon,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { endOfWeek, format, getDay, startOfWeek, subWeeks } from "date-fns";
import { useEffect, useState } from "react";
import { MdExpandCircleDown } from "react-icons/md";
import { StoredRecord } from "../db/db";
import {
  AdvancedStatistics,
  queryGetAdvancedStatistics,
} from "../db/getAdvancedStatistics";
import { queryGetDateInterval } from "../db/getDateInterval";
import { useRecordsStore } from "../stores/recordsStore";
import { ListRecords } from "./ListRecords";

export function Statistics() {
  const [recordsThisWeek, setRecordsThisWeek] = useState<StoredRecord[]>();
  const [detailsThisWeek, setDetailsThisWeek] = useState<boolean>(false);
  const [recordsLastWeek, setRecordsLastWeek] = useState<StoredRecord[]>();
  const [detailsLastWeek, setDetailsLastWeek] = useState<boolean>(false);
  const [weeklyAverage, setWeeklyAverage] = useState<AdvancedStatistics>();
  const setRecords = useRecordsStore((state) => state.setRecords);

  const now = new Date();

  const getStatistics = async () => {
    setRecordsThisWeek(
      await queryGetDateInterval(
        startOfWeek(now, { weekStartsOn: 1 }),
        endOfWeek(now, { weekStartsOn: 1 })
      )
    );
    setRecordsLastWeek(
      await queryGetDateInterval(
        startOfWeek(subWeeks(now, 1), { weekStartsOn: 1 }),
        endOfWeek(subWeeks(now, 1), { weekStartsOn: 1 })
      )
    );

    setWeeklyAverage(await queryGetAdvancedStatistics());
  };

  useEffect(() => {
    getStatistics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This week
  const thisWeekStartDate = format(startOfWeek(now), "d/M");
  const thisWeekEndDate = format(endOfWeek(now), "d/M");
  const unitsThisWeek = (
    recordsThisWeek?.reduce((acc, curr) => (acc += curr.units), 0) || 0
  ).toFixed(2);
  const daysOfDrinkingThisWeek = recordsThisWeek?.reduce(
    (acc: string[], curr: StoredRecord) => {
      const day = format(new Date(curr.date), "yyyy-MM-dd");
      if (!acc.includes(day)) acc.push(day);
      return acc;
    },
    []
  ).length;
  const dayThisWeekSoFar = getDay(now);
  const averagePerDayThisWeek = (
    parseFloat(unitsThisWeek) / dayThisWeekSoFar
  ).toFixed(2);

  // Last week
  const lastWeekStartDate = format(startOfWeek(subWeeks(now, 1)), "d/M");
  const lastWeekEndDate = format(endOfWeek(subWeeks(now, 1)), "d/M");
  const unitsLastWeek = (
    recordsLastWeek?.reduce((acc, curr) => (acc += curr.units), 0) || 0
  ).toFixed(2);
  const daysOfDrinkingLastWeek = recordsLastWeek?.reduce(
    (acc: string[], curr: StoredRecord) => {
      const day = format(new Date(curr.date), "yyyy-MM-dd");
      if (!acc.includes(day)) acc.push(day);
      return acc;
    },
    []
  ).length;
  const averagePerDayLastWeek = (parseFloat(unitsLastWeek) / 7).toFixed(2);

  const handleDetailsThisWeek = () => {
    setDetailsLastWeek(false);
    if (!detailsThisWeek && recordsThisWeek) {
      setRecords(recordsThisWeek);
    }
    setDetailsThisWeek(!detailsThisWeek);
  };

  const handleDetailsLastWeek = () => {
    setDetailsThisWeek(false);
    if (!detailsLastWeek && recordsLastWeek) {
      setRecords(recordsLastWeek);
    }
    setDetailsLastWeek(!detailsLastWeek);
  };

  return (
    // this week
    // Last week
    // Weekly average since first
    // Weekly average last 3 months
    // days of alcohol intake last 3 months

    <Box id="statistics" maxWidth={"lg"}>
      <Heading as="h1" m={4}>
        Your statistics
      </Heading>

      <Card bgColor={"#555"} m={4}>
        <CardHeader pb={1}>
          <Heading>Weekly average</Heading>
        </CardHeader>
        <CardBody pt={0}>
          <List>
            <ListItem key="since0">
              since start: {weeklyAverage?.weeklyAverage.toFixed(2)}
            </ListItem>
            <ListItem key="since1">
              last month: {weeklyAverage?.weeklyAverageLastMonth.toFixed(2)}
            </ListItem>
            <ListItem key="since2" mb={2}>
              last 3 months :{" "}
              {weeklyAverage?.weeklyAverageLastThreeMonths.toFixed(2)}
            </ListItem>
          </List>
        </CardBody>
      </Card>

      <Card bgColor={"#555"} m={4}>
        <CardHeader pb={1}>
          <Heading>Days of alcohol</Heading>
        </CardHeader>
        <CardBody pt={0}>
          <List>
            <ListItem key="days">
              Total: {weeklyAverage?.daysOfAlcohol}
            </ListItem>
            <ListItem key="daysLastMonth">
              Last month: {weeklyAverage?.daysOfAlcoholLastMonth}
            </ListItem>
            <ListItem key="daysLastThreeMonths">
              Last 3 months: {weeklyAverage?.daysOfAlcoholLastThreeMonths}
            </ListItem>
          </List>
        </CardBody>
      </Card>

      <Card bgColor={"#555"} m={4}>
        <CardHeader pb={1}>
          <Flex alignItems="center" justifyContent="space-between">
            <Heading>
              <Flex alignItems="baseline">
                This week
                <Text fontSize="lg" pl={2}>
                  {thisWeekStartDate} - {thisWeekEndDate}
                </Text>
              </Flex>
            </Heading>
            <Icon
              as={MdExpandCircleDown}
              boxSize={6}
              onClick={handleDetailsThisWeek}
              style={(() => {
                return detailsThisWeek
                  ? {
                      transform: "rotate(180deg)",
                    }
                  : {};
              })()}
            />
          </Flex>
        </CardHeader>
        <CardBody pt={0}>
          <List>
            <ListItem key="units">Units: {unitsThisWeek}</ListItem>
            <ListItem key="num">
              Days of drinking: {daysOfDrinkingThisWeek} out of{" "}
              {dayThisWeekSoFar}
            </ListItem>
            <ListItem>Average per day: {averagePerDayThisWeek}</ListItem>
          </List>
          {detailsThisWeek && (
            <Box mt={4}>
              <ListRecords onClose={getStatistics} />
            </Box>
          )}
        </CardBody>
      </Card>

      <Card bgColor={"#555"} m={4}>
        <CardHeader pb={1}>
          <Flex alignItems="center" justifyContent="space-between">
            <Heading>
              <Flex alignItems="baseline">
                Last week
                <Text fontSize="lg" pl={2}>
                  {lastWeekStartDate} - {lastWeekEndDate}
                </Text>
              </Flex>
            </Heading>
            <Icon
              as={MdExpandCircleDown}
              boxSize={6}
              onClick={handleDetailsLastWeek}
              style={(() => {
                return detailsLastWeek
                  ? {
                      transform: "rotate(180deg)",
                    }
                  : {};
              })()}
            />
          </Flex>
        </CardHeader>
        <CardBody pt={0}>
          <List>
            <ListItem key="units">Units: {unitsLastWeek}</ListItem>
            <ListItem key="num">
              Days of drinking: {daysOfDrinkingLastWeek} out of 7
            </ListItem>
            <ListItem>Average per day: {averagePerDayLastWeek}</ListItem>
          </List>
          {detailsLastWeek && (
            <Box pt={4}>
              <ListRecords onClose={getStatistics} />
            </Box>
          )}
        </CardBody>
      </Card>
    </Box>
  );
}
