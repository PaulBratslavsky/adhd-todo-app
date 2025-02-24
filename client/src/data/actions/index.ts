"use server"

// import { generateText } from "ai"
// import { openai } from "@ai-sdk/openai"
import { revalidatePath } from "next/cache"
import * as z from "zod"

const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  deadline: z.string().min(1, "Deadline is required"),
  priority: z.enum(["low", "medium", "high"]),
  consequence: z.enum(["minor", "moderate", "severe"]),
  consequenceDescription: z.string().min(1, "Consequence description is required"),
  description: z.string().min(1, "Description is required"),
})

type FormData = z.infer<typeof todoSchema>

export type FormErrors = {
  [K in keyof FormData]?: string[]
}

export type FormState = {
  errors: FormErrors
  message: string
}

export async function createTodo(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = todoSchema.safeParse({
    title: formData.title,
    deadline: formData.deadline,
    priority: formData.priority,
    consequence: formData.consequence,
    consequenceDescription: formData.consequenceDescription,
    description: formData.description,
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please fix the errors below.",
    }
  }

  const todo = validatedFields.data

  // Use AI to analyze the todo
  // const { text: analysis } = await generateText({
  //   model: openai("gpt-4o"),
  //   prompt: `Analyze this todo: ${JSON.stringify(todo)}. Suggest any improvements to the priority, consequence level, or deadline based on the description and consequence description. Also, suggest any tags or categories for this todo.`,
  // })

  // console.log("AI Analysis:", analysis)

  // TODO: Parse the AI analysis and update the todo accordingly

  // TODO: Save the enhanced todo to the database

  console.log("Creating todo:", todo)

  revalidatePath("/")
  return { errors: {}, message: "Todo created successfully!" }
}

