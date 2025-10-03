import { generateText } from "ai"

export const maxDuration = 60

export async function POST(request: Request) {
  try {
    const { code, language, reviewType } = await request.json()

    if (!code || !language) {
      return Response.json({ error: "Code and language are required" }, { status: 400 })
    }

    const reviewPrompts = {
      comprehensive: `You are an expert code reviewer. Analyze the following ${language} code and provide a comprehensive review covering:
1. Code Quality & Best Practices
2. Potential Bugs & Issues
3. Performance Optimization Opportunities
4. Security Concerns
5. Maintainability & Readability
6. Specific Recommendations

Format your response in clear sections with actionable feedback.`,
      security: `You are a security expert. Analyze the following ${language} code for security vulnerabilities including:
- SQL injection risks
- XSS vulnerabilities
- Authentication/authorization issues
- Data exposure risks
- Input validation problems
Provide specific recommendations to fix each issue.`,
      performance: `You are a performance optimization expert. Analyze the following ${language} code for:
- Time complexity issues
- Memory usage problems
- Inefficient algorithms
- Database query optimization
- Caching opportunities
Provide specific optimization recommendations.`,
      style: `You are a code style expert. Review the following ${language} code for:
- Naming conventions
- Code organization
- Documentation quality
- Consistency with best practices
- Readability improvements
Provide specific style improvement suggestions.`,
    }

    const prompt = reviewPrompts[reviewType as keyof typeof reviewPrompts] || reviewPrompts.comprehensive

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt: `${prompt}\n\nCode to review:\n\`\`\`${language}\n${code}\n\`\`\``,
      temperature: 0.7,
      maxTokens: 2000,
    })

    return Response.json({
      review: text,
      language,
      reviewType,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Code review error:", error)
    return Response.json({ error: "Failed to generate code review" }, { status: 500 })
  }
}
