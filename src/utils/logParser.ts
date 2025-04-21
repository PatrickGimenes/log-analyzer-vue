export function parseLogs(log: string) {
  const lines = log.split("\n");
  const timeRegex = /\[\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}\.\d{3}\]/;
  const entryRegex = /\[(.*?)\] (\w+) (.*?)$/;
  let slowLines: string[] = [];

  console.log(lines[0]);

  return { slowLines };
}
