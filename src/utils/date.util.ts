import moment from "moment";

export function formatToDate(date: string, format: string): Date {
  return new Date(moment(date).format(format))
}

export function formatToString(date: Date, format?: string): string {
  return moment(date).format(format)
}

export function addHours(date: Date, qtd: number) {
  date.setHours(date.getHours() + 2)
  return date
}
