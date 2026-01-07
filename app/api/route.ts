export async function GET(): Promise<Response> {
    const structures: Structures =        
    { "structures": [
        "Linked List",
        "Stack"
    ]}
    return Response.json(structures)
}