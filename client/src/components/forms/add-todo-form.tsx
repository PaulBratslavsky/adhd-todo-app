"use client"

import { startTransition, useActionState } from "react"
import { createTodo, type FormState } from "@/data/actions"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DatePickerInput } from "@/components/custom/date-picker-input"

const initialState: FormState = {
  errors: {},
  message: "",
}

export function AddTodoForm() {
  const [state, formAction] = useActionState(createTodo, initialState)

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Add New Todo</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={async (e) => {
          e.preventDefault()
          const form = e.currentTarget as HTMLFormElement
          const formDataObj = {
            title: (form.elements.namedItem('title') as HTMLInputElement).value,
            deadline: (form.elements.namedItem('deadline') as HTMLInputElement).value,
            priority: (form.elements.namedItem('priority') as HTMLSelectElement).value,
            consequence: (form.elements.namedItem('consequence') as HTMLSelectElement).value,
            consequenceDescription: (form.elements.namedItem('consequenceDescription') as HTMLTextAreaElement).value,
            description: (form.elements.namedItem('description') as HTMLTextAreaElement).value
          }
          const typedFormData = {
            ...formDataObj,
            priority: formDataObj.priority as "low" | "medium" | "high",
            consequence: formDataObj.consequence as "minor" | "moderate" | "severe"
          }
          startTransition(() => {
            formAction(typedFormData)
          })
        }} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <Input id="title" name="title" className="mt-1" />
            {state.errors.title && <p className="mt-1 text-sm text-red-600">{state.errors.title[0]}</p>}
          </div>

          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
              Deadline
            </label>
            <DatePickerInput name="deadline" />
            {state.errors.deadline && <p className="mt-1 text-sm text-red-600">{state.errors.deadline[0]}</p>}
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                Priority Level
              </label>
              <Select name="priority" defaultValue="medium">
                <SelectTrigger>
                  <SelectValue placeholder="Select priority level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              {state.errors.priority && <p className="mt-1 text-sm text-red-600">{state.errors.priority[0]}</p>}
            </div>

            <div className="flex-1">
              <label htmlFor="consequence" className="block text-sm font-medium text-gray-700">
                Consequence Level
              </label>
              <Select name="consequence" defaultValue="moderate">
                <SelectTrigger>
                  <SelectValue placeholder="Select consequence level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minor">Minor</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="severe">Severe</SelectItem>
                </SelectContent>
              </Select>
              {state.errors.consequence && <p className="mt-1 text-sm text-red-600">{state.errors.consequence[0]}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="consequenceDescription" className="block text-sm font-medium text-gray-700">
              Consequence Description
            </label>
            <Textarea
              id="consequenceDescription"
              name="consequenceDescription"
              placeholder="Describe what will happen if this todo is not completed"
              className="mt-1"
            />
            {state.errors.consequenceDescription && (
              <p className="mt-1 text-sm text-red-600">{state.errors.consequenceDescription[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <Textarea id="description" name="description" placeholder="Enter todo description" className="mt-1" />
            {state.errors.description && <p className="mt-1 text-sm text-red-600">{state.errors.description[0]}</p>}
          </div>

          <Button type="submit">Add Todo</Button>
        </form>
        {state.message && <p className="mt-4 text-sm text-green-600">{state.message}</p>}
      </CardContent>
    </Card>
  )
}

