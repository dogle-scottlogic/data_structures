import Home from './home';
import { get } from './utils/rest';

export default async function HomeClient() {
  const structures = await get<Structures>("/api/").then(response => response.structures);
  return (
    <>
      <Home structures={structures} />
    </>
  );
}
