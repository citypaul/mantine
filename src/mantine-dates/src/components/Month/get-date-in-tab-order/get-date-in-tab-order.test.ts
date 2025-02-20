import dayjs from 'dayjs';
import { getMonthDays } from '../get-month-days/get-month-days';
import { getDateInTabOrder } from './get-date-in-tab-order';

const defaultDates = getMonthDays(new Date(2010, 5, 1));
const defaultMinDate = new Date(2000, 0);
const defaultMaxDate = new Date(2100, 0);
const defaultSelectedDate = new Date(2010, 5, 5);
const defaultControlProps = () => ({});
const defaultExcludeDate = () => false;

describe('@mantine/dates/get-date-in-tab-order', () => {
  it('returns selected date', () => {
    expect(
      getDateInTabOrder(
        defaultDates,
        defaultMinDate,
        defaultMaxDate,
        (date) => ({
          selected: dayjs(date).isSame(defaultSelectedDate, 'date'),
        }),
        defaultExcludeDate
      )
    ).toStrictEqual(defaultSelectedDate);
  });

  it('returns current day', () => {
    expect(
      getDateInTabOrder(
        getMonthDays(new Date()),
        defaultMinDate,
        defaultMaxDate,
        defaultControlProps,
        defaultExcludeDate
      )
    ).toStrictEqual(
      new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
    );
  });

  it('returns first non-disabled day in month', () => {
    expect(
      getDateInTabOrder(
        getMonthDays(new Date(2010, 1, 1)),
        defaultMinDate,
        defaultMaxDate,
        defaultControlProps,
        defaultExcludeDate
      )
    ).toStrictEqual(new Date(2010, 1, 1));
    expect(
      getDateInTabOrder(
        defaultDates,
        new Date(2010, 5, 5),
        defaultMaxDate,
        defaultControlProps,
        defaultExcludeDate
      )
    ).toStrictEqual(new Date(2010, 5, 5));
  });

  it('handles excluded date', () => {
    expect(
      getDateInTabOrder(
        getMonthDays(new Date(2010, 1, 1)),
        defaultMinDate,
        defaultMaxDate,
        defaultControlProps,
        (date) => dayjs(new Date(2010, 1, 1)).isSame(date, 'date')
      )
    ).toStrictEqual(new Date(2010, 1, 2));
  });
});
