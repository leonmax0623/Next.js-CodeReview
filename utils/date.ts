const monthsThreeLetterAbbr = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "june",
  "july",
  "aug",
  "sept",
  "oct",
  "nov"
];

export const isDate = (input: string) => {
  const monthOnly = input.split(" ")[1]?.toLowerCase();
  return monthsThreeLetterAbbr.includes(monthOnly);
};
