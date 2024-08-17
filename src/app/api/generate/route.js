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
  // only accessible if logged in
    const session = await auth();
    console.log(session)
    if (!session) {
      return new NextResponse.JSON({ error: "Unauthorized to generate flashcards"}, { status: 401 })
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
    console.log(flashcards.flashcards)
    return new NextResponse(flashcards.flashcards)
}
