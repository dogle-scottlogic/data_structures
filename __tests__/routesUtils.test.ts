import { normaliseUrl } from "@/app/utils/routes"

describe('normaliseUrl', () => {
    it('normalises a url', () => {
        const pathString = "Linked List"
        const result = normaliseUrl(pathString);
        expect(result).toBe("linkedlist")
    })
})