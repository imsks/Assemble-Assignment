import { Request, Response } from 'express';
import moment from 'moment';
import {
  getVisitorsByMonth,
  getHighestVisitors,
  getLowestVisitors,
  getIgnoredVisitors,
} from '../utils';

// 1. Get status of the API
export const getStatus = async (
  request: Request,
  response: Response,
): Promise<void> => {
  response.status(200).json({
    status: true,
  });
};

type GetVisitorsQuery = {
  date: string;
  ignore: string;
};

export const getVisitors = async (
  request: Request,
  response: Response,
): Promise<void> => {
  const { date, ignore } = request.query as GetVisitorsQuery;

  if (!date || date == '' || !ignore || ignore == '') {
    response.status(400).json({
      status: true,
      message: 'Wrong parameters passed. Please input correct parameters',
    });
    return;
  }

  // Get date from milliseconds
  const dateInMilliseconds = moment(parseInt(date));

  // Get month and year from date
  const [month, year] = dateInMilliseconds.format('MMM YYYY').split(' ');

  // Get visitors by month
  const visitorDataForMonth = getVisitorsByMonth(dateInMilliseconds);

  if (visitorDataForMonth) {
    // Get highest and lowest visitor count and inde
    const highestVisitorData = getHighestVisitors(visitorDataForMonth);
    const lowestVisitorData = getLowestVisitors(visitorDataForMonth);

    // Get ignored data
    const ignoredData = getIgnoredVisitors(ignore, visitorDataForMonth);

    const totalVisitors = Object.values(visitorDataForMonth)
      .slice(1)
      .reduce((a, b) => parseInt(a) + parseInt(b));

    response.status(200).json({
      status: true,
      data: {
        attendance: {
          month,
          year,
        },
        highest: highestVisitorData,
        lowest: lowestVisitorData,
        ignore: ignoredData.museum && ignoredData,
      },
      total: totalVisitors,
    });
    return;
  }

  response.status(400).json({
    status: true,
    message: 'No data found',
  });
};
