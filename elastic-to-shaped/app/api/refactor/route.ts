import { type NextRequest, NextResponse } from "next/server"
import { Anthropic } from '@anthropic-ai/sdk';
import { MessageParam } from "@anthropic-ai/sdk/resources/messages.mjs";
import { systemPrompt } from "@/app/api/refactor/constants";

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()
    const anthropic = new Anthropic();

    if (!code) {
      return NextResponse.json({ error: "No code provided" }, { status: 400 })
    }

    // TODO: Replace this with your actual refactoring API call
    const system = systemPrompt

    const prompt = `
    ## Input Code: 
    \`\`\`
    ${code}
    \`\`\``

    const messages:MessageParam[] = [
      {"role": "user", "content": prompt}
    ]

    const tokens = await anthropic.messages.countTokens({
      model: "claude-haiku-4-5-20251001",
      messages,
      system,
    })
    console.log({tokens});
    if (tokens.input_tokens < 100000) {
      const response = await anthropic.messages.create({
        model: "claude-sonnet-4-5-20250929",
        max_tokens: 1024,
        messages,
        system: system
      })
      console.log({response})
      const contentBlock = response.content[0];
      // Mock refactoring for demonstration
      const refactoredCode = (typeof contentBlock === 'object' && 'text' in contentBlock)
        ? contentBlock.text
        : JSON.stringify(contentBlock, null, 2);
  
      return NextResponse.json({ refactoredCode })
    } else {
      return NextResponse.json({refactoredCode: "Input too long. Please reach out to our team for a consultation!"})
    }
  } catch (error) {
    console.error("Error in refactor API:", error)
    return NextResponse.json({ error: "Failed to refactor code - internal server error" }, { status: 500 })
  }
}