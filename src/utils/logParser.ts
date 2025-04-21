export function parseLogs(text: string): {
  results: { functionName: string; durationMs: number }[];
} {
  //cria um array com cada linha do log
  const lines = text.split("\n");
  //captura a data/hora, o nome da função e se é entrada ou saída
  const regex =
    /\[(\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}\.\d{3})\] (get[A-Z][a-zA-Z]+) (entrei|sai)/;

  const entries: Record<string, Date> = {};
  const results: { functionName: string; durationMs: number }[] = [];

  //para cada linha do lo, tenta capturar as informções
  for (const line of lines) {
    const match = line.match(regex);
    if (!match) continue;

    //descarta a linha linha inteira
    const [_, datetimeStr, functionName, action] = match;

    //coverta a strin para Date usando ISO8601
    const [datePart, timePart] = datetimeStr.split(" ");
    const [day, month, year] = datePart.split("/");
    const isoStr = `${year}-${month}-${day}T${timePart.replace(
      ".",
      ":"
    )}`.replace(/:(\d{3})$/, ".$1");
    const date = new Date(isoStr);

    //calcula o tempo de execução de cada função
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
