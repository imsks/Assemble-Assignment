import moment, { Moment } from 'moment';
import * as VisitorsData from '../data.json';
import { MeuseumVisitorData } from '../interfaces';

// 1. Get visitors by month
export const getVisitorsByMonth = (dateInMilliseconds: Moment) => {
  return VisitorsData.data.find(visitorData => {
    const { month } = visitorData;
    const monthData = moment(month);

    return (
      moment(monthData).format('L') === moment(dateInMilliseconds).format('L')
    );
  });
};

// 2. Get highest visitor value
export const getHighestVisitors = (
  visitorDataForMonth: object,
): MeuseumVisitorData => {
  const [highestVisitorCount, highestVisitorIndex] = Object.values(
    visitorDataForMonth,
  ).reduce((a, b, index) => (parseInt(a) < parseInt(b) ? [b, index] : a));

  const highestVisitorData: MeuseumVisitorData = {
    museum: Object.keys(visitorDataForMonth)[highestVisitorIndex],
    visitors: highestVisitorCount,
  };

  return highestVisitorData;
};

// 3. Get lowest visitor value
export const getLowestVisitors = (visitorDataForMonth: object): Array<any> => {
  return Object.values(visitorDataForMonth).reduce((a, b, index) =>
    parseInt(a) < parseInt(b) ? [b, index] : a,
  );
};

// 4. Get ignored visitor value
export const getIgnoredVisitors = (
  ignore: string,
  visitorDataForMonth: object,
): MeuseumVisitorData => {
  return {
    museum: ignore,
    visitors: visitorDataForMonth[ignore],
  };
};
