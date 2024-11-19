'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon, CheckIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const personalInfoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  gender: z.enum(["male", "female", "other"]),
  dateOfBirth: z.date({
    required_error: "Please select a date",
    invalid_type_error: "That's not a date!",
  }),
})

const professionalInfoSchema = z.object({
  major: z.string().min(2, "Major must be at least 2 characters"),
  educationLevel: z.string().min(2, "Education level must be at least 2 characters"),
  interests: z.array(z.string()).min(1, "Please select at least one interest"),
  workEnvironment: z.string().min(2, "Work environment must be at least 2 characters"),
})

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>
type ProfessionalInfoFormData = z.infer<typeof professionalInfoSchema>

export default function Component() {
  const [step, setStep] = useState(1)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoFormData | null>(null)

  const personalInfoForm = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      gender: undefined,
      dateOfBirth: undefined,
    },
  })

  const professionalInfoForm = useForm<ProfessionalInfoFormData>({
    resolver: zodResolver(professionalInfoSchema),
    defaultValues: {
      major: "",
      educationLevel: "",
      interests: [],
      workEnvironment: "",
    },
  })

  const interests = [
    "Vente et Marketing",
    "Sécurité et Sûreté",
    "Ingénierie et Technique",
    "Administration et Support",
    "Finance et Comptabilité",
  ]

  const onSubmitPersonalInfo = (data: PersonalInfoFormData) => {
    setPersonalInfo(data)
    setStep(2)
  }

  const onSubmitProfessionalInfo = (data: ProfessionalInfoFormData) => {
    const finalData = { ...personalInfo, ...data }
    console.log("Form submitted:", finalData)
    // Here you would typically send the data to your backend
  }

  return (
    <div className="min-h-screen bg-[#6C5CE7] p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <img src="/placeholder.svg" alt="Well Career" className="h-8" />
        </div>
        <div className="grid md:grid-cols-[1fr,300px] gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    step >= 1 ? "bg-[#6C5CE7] text-white" : "bg-gray-200"
                  }`}>
                    1
                  </div>
                  <span className="font-medium">informations personnelles</span>
                </div>
                <div className="h-px flex-1 bg-gray-200" />
                <div className="flex items-center gap-2">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    step >= 2 ? "bg-[#6C5CE7] text-white" : "bg-gray-200"
                  }`}>
                    2
                  </div>
                  <span className="font-medium">intérêt professionnel</span>
                </div>
              </div>

              {step === 1 ? (
                <Form {...personalInfoForm}>
                  <form onSubmit={personalInfoForm.handleSubmit(onSubmitPersonalInfo)} className="space-y-6">
                    <h2 className="text-xl font-semibold">
                      Please enter following informations
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={personalInfoForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Enter your first name</FormLabel>
                            <FormControl>
                              <Input placeholder="Rayan" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={personalInfoForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Enter your last name</FormLabel>
                            <FormControl>
                              <Input placeholder="Melzi" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={personalInfoForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Enter your email address</FormLabel>
                          <FormControl>
                            <Input placeholder="rayanmelzi@gmail.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={personalInfoForm.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Genre</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={personalInfoForm.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date de naissance</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        className="bg-[#6C5CE7] hover:bg-[#5A4BD1]"
                      >
                        Continue
                      </Button>
                    </div>
                  </form>
                </Form>
              ) : (
                <Form {...professionalInfoForm}>
                  <form onSubmit={professionalInfoForm.handleSubmit(onSubmitProfessionalInfo)} className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        parcours académique
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={professionalInfoForm.control}
                          name="major"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Domaine d&apos;études (Major)</FormLabel>
                              <FormControl>
                                <Input placeholder="Computer Science" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={professionalInfoForm.control}
                          name="educationLevel"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Niveau le plus élevé</FormLabel>
                              <FormControl>
                                <Input placeholder="Bachelor" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        intérêt professionnel
                      </h3>
                      <FormField
                        control={professionalInfoForm.control}
                        name="interests"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Domaine d&apos;intérêt</FormLabel>
                            <FormControl>
                              <div className="flex flex-wrap gap-2">
                                {interests.map((interest) => (
                                  <Badge
                                    key={interest}
                                    variant={field.value.includes(interest) ? "default" : "outline"}
                                    className={cn(
                                      "cursor-pointer",
                                      field.value.includes(interest)
                                        ? "bg-[#6C5CE7] hover:bg-[#5A4BD1]"
                                        : "hover:bg-[#6C5CE7] hover:text-white"
                                    )}
                                    onClick={() => {
                                      const updatedInterests = field.value.includes(interest)
                                        ? field.value.filter((i: string) => i !== interest)
                                        : [...field.value, interest]
                                      field.onChange(updatedInterests)
                                    }}
                                  >
                                    {interest}
                                    {field.value.includes(interest) && (
                                      <CheckIcon className="ml-1 h-3 w-3" />
                                    )}
                                  </Badge>
                                ))}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={professionalInfoForm.control}
                        name="workEnvironment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Environnement de travail préféré</FormLabel>
                            <FormControl>
                              <Input placeholder="on-site" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="bg-[#6C5CE7] hover:bg-[#5A4BD1]"
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-[#6C5CE7] mb-4">
                About US
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Lorem ipsum is simply dummy text of the printing and typesetting
                industry. Lorem has been the industry&apos;s standard
              </p>
              <div className="flex justify-center">
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt="Building illustration"
                  className="w-32 opacity-50"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}