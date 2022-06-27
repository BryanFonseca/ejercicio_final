export const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear() + "";
  const month = (date.getMonth() + 1 + "").padStart(2, "0");
  const day = (date.getDate() + "").padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getCurrentTime = () => {
  const date = new Date();
  const hours = (date.getHours() + "").padStart(2, "0");
  const minutes = (date.getMinutes() + 1 + "").padStart(2, "0");
  return `${hours}:${minutes}`;
};
