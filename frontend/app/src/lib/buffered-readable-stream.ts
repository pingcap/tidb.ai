export function bufferedReadableStreamTransformer (): TransformStream<any, string> {
  const decoder = new TextDecoder();
  const buffer: string[] = [];

  const appendTextChunk = (chunk: string) => {
    if (buffer.length > 0 && !buffer[buffer.length - 1].endsWith('\n')) {
      buffer[buffer.length - 1] += chunk;
    } else {
      buffer.push(chunk);
    }
  };

  const extractLines = () => {
    const lines: string[] = [];
    while (true) {
      const data = buffer.shift();
      if (data == null) break;

      if (buffer.length > 0) {
        // This branch might be never executed.
        lines.push(...data.split('\n'));
      } else {
        let start = 0, end: number = 0;

        while (start < data.length) {
          end = data.indexOf('\n', start);
          if (end === -1) {
            break;
          }

          lines.push(data.slice(start, end));
          start = end + 1;
        }

        if (start < data.length) {
          buffer.push(data.slice(start));
        }

        break;
      }
    }

    return lines;
  };

  return new TransformStream<any, string>({
    transform (chunk, controller) {
      const textChunk = decoder.decode(chunk, { stream: true });
      appendTextChunk(textChunk);
      extractLines().forEach(line => controller.enqueue(line));
    },
    flush (controller) {
      const lines = extractLines();
      lines.forEach(line => controller.enqueue(line));
      if (buffer.length > 0) {
        console.error('Stream is not finished, ignoring last chunk', buffer[0]);
      }
    },
  });
}
