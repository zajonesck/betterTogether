const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function newBDate(clientBirthDay) {
  console.log("we are in");
  if (clientBirthDay.length == 0) {
    return "No birthday on file.";
  } else {
    const date = clientBirthDay.split("-");
    const day = date[2].split("", 2).toString().replaceAll(",", "");
    const month = months[+date[1] - 1];
    const stringDate = month + " " + day + ", " + date[0];
    return stringDate;
  }
}
