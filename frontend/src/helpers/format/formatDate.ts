function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return date.toLocaleDateString("en-GB", options);
}

export function formatDateOnly(dateString: string): string {
  return new Date(dateString).toISOString().split("T")[0];
}

export default formatDate;
