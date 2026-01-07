import Link from 'next/link'
import { get } from './utils/rest';
import { normaliseUrl } from './utils/routes';

export default async function Home() {
  const data = await get<Structures>("/api/").then(response => response.structures);
  return (
    <>
      <h1>Data Structures</h1>
      <ul>
        {data.map(d =>
          <li key={d}>
            <Link href={normaliseUrl(d)}>{d}</Link>
          </li>
        )}
      </ul>
    </>
  );
}
