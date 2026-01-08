import { Structures } from 'types/main';

export async function GET(): Promise<Response> {
  const structures: Structures = { structures: ['Queue', 'Stack'] };
  return Response.json(structures);
}
