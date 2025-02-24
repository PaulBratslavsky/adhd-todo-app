"use client"

import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

interface DatePickerInputProps {
  name: string
}

export function DatePickerInput({ name }: DatePickerInputProps) {
  const [date, setDate] = useState<Date | null>(null)

  return (
    <DatePicker
      selected={date}
      onChange={(date: Date | null) => setDate(date)}
      name={name}
      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      placeholderText="Select deadline date"
      dateFormat="yyyy-MM-dd"
    />
  )
}

