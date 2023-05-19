import {
  type ValidationSchemaForMessage,
  validationSchemaForCreateChatCompletion,
} from "@/server/api/validation-schemas/open-ai-chat-completion.schema";
import { OpenAiChatEntity } from "@/server/business-logic/open-ai-chat.entity";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  if (req.method !== "POST") return;

  const session = getAuth(req);
  if (!session?.userId) {
    return new NextResponse("Error", {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  const entity = new OpenAiChatEntity();

  const requestBody = validationSchemaForCreateChatCompletion.parse(
    await req.json()
  );

  const response: ValidationSchemaForMessage = await entity.call(requestBody);

  return NextResponse.json(response);
}
