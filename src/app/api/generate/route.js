import { NextResponse } from "next/server";
import OpenAI from "openai";
import { auth } from "@/auth";

const systemPrompt = `
You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long.
You should return in the following JSON format:
{
 "flashcards":[
   {
     "front": "Front of the card",
     "back": "Back of the card"
   }
 ]
}
`

export async function POST(req) {
    const session = await auth();
    if (session && session.user) {
        session.user = {
            name: session.user.name,
            email: session.user.email,
        }
      } else {
        return new NextResponse 
        // stopped here to push to GH so yall con see if you want, still working on this
      }
    const openai = new OpenAI()
    const data = await req.text()
    const completion = await openai.chat.completions.create({
        messages: [
            {role: 'system', content: systemPrompt},
            {role: 'user', content: data},
        ],
        model: 'gpt-4o',
        response_format: {type: 'json_object'},
    })
    const flashcards = JSON.parse(completion.choices[0].message.content)
    return new NextResponse(flashcards.flashcards)
}
