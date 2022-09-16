import { parseISO, format } from "date-fns";

export const dateHandler = (date: string) => {
  const d = parseISO(date);
  if (!isNaN(d.getDate())) {
    return format(d, "LLLL d, Y");
  } else {
    return "N/A";
  }
}

export const tagHandler = (tags: Array<string>) => {
  return tags.join(", ").replaceAll("-", " ").toLowerCase();
}
