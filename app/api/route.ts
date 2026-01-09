import { Structures } from "types/main";

const supportedStructures = ["Queue", "Stack", "Binary Tree", "Red Black Tree"];

export async function GET(): Promise<Response> {
  const structures: Structures = { structures: supportedStructures };
  return Response.json(structures);
}
