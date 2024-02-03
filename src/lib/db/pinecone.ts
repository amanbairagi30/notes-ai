import { Pinecone } from "@pinecone-database/pinecone"
const apiKey = process.env.PINECONE_API_KEY

if (!apiKey) {
    throw new Error("Pinecone Api key is not present")
}

const pinecone = new Pinecone({
    environment : "gcp-starter",
    apiKey
})

export const notesIndex = pinecone.Index("notes-ai");