import moment, { Moment } from 'moment';

export class DateHelper {
  static IsoFormat(date?: string | Date | Moment): string {
    if (date) return moment(date).toISOString();
    else return moment().toISOString();
  }

  static addDays(date: Date | Moment, numDays: number): String {
    return moment(date).add(numDays, 'days').toISOString();
  }

  static getAge(date: Moment | Date): number {
    const today = moment();
    return today.diff(moment(date), 'years');
  }
}
