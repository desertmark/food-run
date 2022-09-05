export enum WeekDay {
  monday = "monday",
  tuesday = "tuesday",
  wedenesday = "wedenesday",
  thursday = "thursday",
  friday = "friday",
  saturday = "saturday",
  sunday = "sunday",
}
export type ISchedule = Record<WeekDay, boolean>;
const WEEK_DAYS = [
  WeekDay.sunday,
  WeekDay.monday,
  WeekDay.tuesday,
  WeekDay.wedenesday,
  WeekDay.thursday,
  WeekDay.friday,
  WeekDay.saturday,
];

export const getWeekDay = (): WeekDay => {
  const dayNumber = new Date().getDay();
  return WEEK_DAYS[dayNumber];
};

export enum OrderWindowStatusEnum {
  New = "new",
  Open = "open",
  Closed = "closed",
}

export interface IOrderWindow {
  status: OrderWindowStatusEnum;
  openDate: number;
  closeDate: number;
}
