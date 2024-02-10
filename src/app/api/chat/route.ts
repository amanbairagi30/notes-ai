import { notesIndex } from "@/lib/db/pinecone";
import prisma from "@/lib/db/prisma";
import openai, { getEmbedding } from "@/lib/openai";
import { auth } from "@clerk/nextjs";
import { ChatCompletionMessage } from "openai/resources/index.mjs";
import {OpenAIStream , StreamingTextResponse} from "ai"

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const messages : ChatCompletionMessage[] = body.messages;

        const messageTruncated = messages.slice(-6);

        const embedding = await getEmbedding(
            messageTruncated.map((message)=>message.content).join("\n")
        )

        const {userId} = auth();
        
        const vectorQueryResponse = await notesIndex.query({
            vector : embedding,
            topK : 4,
            filter : {userId},
        });

        const relevantNotes = await prisma.note.findMany({
            where : {
                id : {
                    in : vectorQueryResponse.matches.map((match) => match.id),
                },
            },
        })

        console.log("Relevant Notes : ", relevantNotes);

        const systemMessage : ChatCompletionMessage = {
            role : "assistant",
            content :
            "You are an intelligent note taking app named NotesAI . You answer the user's question based on their existing notes . " +
            "the relevant rotes for this query are :\n" +
            relevantNotes.map((note) => `Title : ${note.title}\n\nContent:\n${note.content}`).join("\n\n"),
        };

        const response = await openai.chat.completions.create({
            model : "gpt-3.5-turbo",
            stream : true,
            messages : [systemMessage , ...messageTruncated]
        })

        const stream = OpenAIStream(response);
        return new StreamingTextResponse(stream);
    } catch (error) {
        console.log(error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}