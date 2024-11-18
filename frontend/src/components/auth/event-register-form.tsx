'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon, CheckIcon } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Backend } from '@/lib/helper'

const personalInfoSchema = z.object({
  last_name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  first_name: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  phone_number: z.string().min(10, "Le numéro de téléphone doit contenir au moins 10 chiffres").regex(/^[0-9]*$/, "Doit contenir uniquement des chiffres"),
  gender: z.enum(["Male", "Female"]),
  birth_date: z.date({
    required_error: "La date de naissance est requise"
  }),
  email: z.string().email({
    message: "Email invalide"
  })
})

const professionalInfoSchema = z.object({
  major: z.string().min(1, "Veuillez sélectionner un domaine d'études"),
  education_level: z.string().min(1, "Veuillez sélectionner un niveau d'études"),
  professional_interests: z.array(z.string()).nonempty("Veuillez sélectionner au moins un domaine d'intérêt"),
})

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>
type ProfessionalInfoFormData = z.infer<typeof professionalInfoSchema>

const majors = [
  "Informatique",
  "Génie Civil",
  "Médecine",
  "Droit",
  "Économie",
  "Sciences Politiques",
  "Psychologie",
  "Biologie",
  "Chimie",
  "Physique"
]

const educationLevels = [
  "Bac + 1",
  "Bac + 2",
  "Bac + 3",
  "Bac + 4",
  "Bac + 5"
]

const professionalInterests = [
  "Développement Web",
  "Intelligence Artificielle",
  "Cybersécurité",
  "Gestion de Projet",
  "Marketing Digital",
  "Finance",
  "Ressources Humaines",
  "Design Graphique",
  "Recherche Scientifique",
  "Entrepreneuriat"
]

export default function EventRegisterForm() {
  const [step, setStep] = useState(1)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoFormData | null>(null)

  const personalInfoForm = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      last_name: "",
      first_name: "",
      email: "",
      phone_number: "",
      gender: undefined,
      birth_date: undefined
    },
  })

  const professionalInfoForm = useForm<ProfessionalInfoFormData>({
    resolver: zodResolver(professionalInfoSchema),
    defaultValues: {
      major: "",
      education_level: "",
      professional_interests: []
  }

})

  const onSubmitPersonalInfo = (data: PersonalInfoFormData) => {
    // console.log("Personal Info Submitted:", data)
    setPersonalInfo(data)
    setStep(2)
  }

  const onSubmitProfessionalInfo = async (tdata: ProfessionalInfoFormData) => {
    const formattedDate = personalInfo?.birth_date
  ? new Date(personalInfo.birth_date).toLocaleDateString('en-CA') // Outputs 'YYYY-MM-DD'
  : null;
    try {
      // Construct the final data object
      const finalData = {
        last_name: personalInfo?.last_name || "",
        first_name: personalInfo?.first_name || "",
        phone_number: personalInfo?.phone_number || "",
        gender: personalInfo?.gender || "",
        birth_date: formattedDate,
        email: personalInfo?.email || "",
        major: tdata?.major || "",
        education_level: tdata?.education_level || "",
        professional_interests: tdata?.professional_interests || [], // Default to empty array
      };
  
      // Log final data for debugging
      console.log("Form submitted:", finalData);
  
      // Send data to the backend
      const response = await Backend.post("/students/", 
        {
          body: finalData
        }
      );
  
      if (response?.status === 200) {
        console.log("Submission successful:", response.data);
      } else {
        console.warn("Unexpected response status:", response.status);
      }
    } catch (error: any) {
      // Log error with detailed information
      console.error("Error submitting data:", error?.response?.data || error.message);
    }
  };
  
  
  return (
    <div className='h-full w-full bg-primary p-6'>
      <div className='mx-auto w-full max-w-6xl'>
        <div className="mb-4 mt-2">
          <Image src="/logo_form.png" alt="logo" width={200} height={50} className="text-white" />
        </div>

        <div className='grid md:grid-cols-[1fr,300px] gap-6'>
          <Card>
            <CardContent className='p-6'>
              <div className='flex items-center justify-center gap-4 mb-8'>
                <div className='flex items-center gap-2'>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center
                    ${step >= 1 ? "bg-primary text-white" : "bg-gray-200"}`}>
                    1
                  </div>
                  <span className="font-medium">Informations personnelles</span>
                </div>

                <div className='flex items-center gap-2'>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center
                    ${step >= 2 ? "bg-primary text-white" : "bg-gray-200"}`}>
                    2
                  </div>
                  <span className="font-medium">Informations professionnelles</span>
                </div>
              </div>
              { ( step === 1 ) ? (
                <Form {...personalInfoForm}>
                  <form onSubmit={personalInfoForm.handleSubmit(onSubmitPersonalInfo)} className='space-y-4'>
                    <h2 className='text-xl font-semibold'>
                      Veuillez saisir les informations suivantes
                    </h2>
                    <div className='grid md:grid-cols-2 gap-4'>
                      <FormField
                        control={personalInfoForm.control}
                        name="first_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prénom</FormLabel>
                            <FormControl>
                              <Input placeholder="Prénom" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={personalInfoForm.control}
                        name="last_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                              <Input placeholder="Nom" {...field} />
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
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Email" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={personalInfoForm.control}
                      name="phone_number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Numéro de téléphone</FormLabel>
                          <FormControl>
                            <Input placeholder="Numéro de téléphone" {...field} />
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
                                <SelectValue placeholder="Sélectionnez votre genre" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Male">Homme</SelectItem>
                              <SelectItem value="Female">Femme</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={personalInfoForm.control}
                      name="birth_date"
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
                                    <span>Choisissez une date</span>
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

                    

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      Continuer
                    </Button>
                  </form>
                </Form>
              ) : (
                <Form {...professionalInfoForm}>
                  <form onSubmit={professionalInfoForm.handleSubmit(onSubmitProfessionalInfo)} className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Parcours académique
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={professionalInfoForm.control}
                          name="major"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Domaine d&apos;études (Major)</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez votre domaine" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {majors.map((major) => (
                                    <SelectItem key={major} value={major}>{major}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={professionalInfoForm.control}
                          name="education_level"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Niveau d&apos;études</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez votre niveau" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {educationLevels.map((level) => (
                                    <SelectItem key={level} value={level}>{level}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className='hidden'>
                      <h3 className="text-lg font-medium mb-4">
                        Domaines d&apos;intérêt professionnel
                      </h3>
                      <FormField
                      control={professionalInfoForm.control}
                      name="professional_interests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel> Pros </FormLabel>
                          <FormControl>
                            <Input placeholder="Pros..." type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     
                    </div>
                    <div>
                        <h3 className="text-lg font-medium mb-4">
                          intérêt professionnel
                        </h3>
                        <FormField
                          control={professionalInfoForm.control}
                          name="professional_interests"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Domaine d&apos;intérêt</FormLabel>
                              <FormControl>
                                <div className="flex flex-wrap gap-2">
                                  {professionalInterests.map((interest) => (
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

                        </div>
                    
                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                      >
                        Retour
                      </Button>
                      <Button
                        type="submit"
                        className="bg-primary hover:bg-primary/90"
                      >
                        Soumettre
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-primary mb-4">
                À propos de nous
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Lorem ipsum is simply dummy text of the printing and typesetting
                industry. Lorem has been the industry&apos;s standard
              </p>
              <div className="flex justify-center">
                <Image
                  src="/logo_check.svg"
                  alt="Building illustration"
                  width={128}
                  height={128}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}