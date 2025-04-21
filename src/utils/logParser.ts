export function parseLogs(text: string): {
  results: { functionName: string; durationMs: number }[];
} {
  const lines = text.split("\n");
  const regex =
    /\[(\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}\.\d{3})\] (get[A-Z][a-zA-Z]+) (entrei|sai)/;

  const entries: Record<string, Date> = {};
  const results: { functionName: string; durationMs: number }[] = [];

  for (const line of lines) {
    const match = line.match(regex);
    if (!match) continue;

    const [_, datetimeStr, functionName, action] = match;
    const [datePart, timePart] = datetimeStr.split(" ");
    const [day, month, year] = datePart.split("/");
    const isoStr = `${year}-${month}-${day}T${timePart.replace(
      ".",
      ":"
    )}`.replace(/:(\d{3})$/, ".$1");
    const date = new Date(isoStr);

    if (action === "entrei") {
      entries[functionName] = date;
    } else if (action === "sai" && entries[functionName]) {
      const duration = date.getTime() - entries[functionName].getTime();
      results.push({ functionName, durationMs: duration });
      delete entries[functionName];
    }
  }

  return { results };
}
