export class ChatbotService {
  async prompt(
    id: string,
    language: string,
    context: string,
    onChunk: (id: string, chunk: string) => void,
  ) {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/chatbot/prompt`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, context }),
      },
    );

    const reader = res.body!.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      let boundary;
      while ((boundary = buffer.indexOf('\n')) !== -1) {
        const line = buffer.slice(0, boundary);
        buffer = buffer.slice(boundary + 1);

        try {
          const json = JSON.parse(line);
          if (json.response) {
            onChunk(id, json.response);
          }
        } catch {
          // ignore
        }
      }
    }
  }
}
