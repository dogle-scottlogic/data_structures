export async function get<T>(path: string): Promise<T> {
  return await fetch(process.env.URL + path, { method: "GET" }).then(
    async (response) => await response.json()
  );
}
