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
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Backend } from '@/lib/helper'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const personalInfoSchema = z.object({
  last_name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  first_name: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  phone_number: z.string().min(10, "Le numéro de téléphone doit contenir au moins 10 chiffres").regex(/^[0-9]*$/, "Doit contenir uniquement des chiffres"),
  gender: z.enum(["Male", "Female"]),
  birth_date: z.object({
    day: z.string(),
    month: z.string(),
    year: z.string(),
  }),
  email: z.string().email({
    message: "Email invalide"
  })
})

const professionalInfoSchema = z.object({
  major: z.string().min(1, "Veuillez sélectionner un domaine d'études"),
  education_level: z.string().min(1, "Veuillez sélectionner un niveau d'études"),
  professional_interests: z.array(z.string()).nonempty("Veuillez sélectionner au moins un domaine d'intérêt"),
  cv: z.instanceof(File).optional().refine((file) => {
    if (file) {
      return file.size <= 5 * 1024 * 1024; // 5MB limit
    }
    return true;
  }, "Le fichier CV ne doit pas dépasser 5MB"),
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

  const router = useRouter()

  const personalInfoForm = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      last_name: "",
      first_name: "",
      email: "",
      phone_number: "",
      gender: undefined,
      birth_date: {
        day: "",
        month: "",
        year: "",
      },
    },
  })

  const professionalInfoForm = useForm<ProfessionalInfoFormData>({
    resolver: zodResolver(professionalInfoSchema),
    defaultValues: {
      major: "",
      education_level: "",
      professional_interests: [],
      cv: undefined,
    }
  })

  const onSubmitPersonalInfo = (data: PersonalInfoFormData) => {
    setPersonalInfo(data)
    setStep(2)
  }

  const onSubmitProfessionalInfo = async (tdata: ProfessionalInfoFormData) => {
    const formattedDate = personalInfo?.birth_date
      ? `${personalInfo.birth_date.year}-${personalInfo.birth_date.month.padStart(2, '0')}-${personalInfo.birth_date.day.padStart(2, '0')}`
      : null;
      console.log("Formatted Date", formattedDate )
    try {
      const finalData = new FormData();
      finalData.append('last_name', personalInfo?.last_name || "");
      finalData.append('first_name', personalInfo?.first_name || "");
      finalData.append('phone_number', personalInfo?.phone_number || "");
      finalData.append('gender', personalInfo?.gender || "");
      finalData.append('birth_date', formattedDate || "");
      finalData.append('email', personalInfo?.email || "");
      finalData.append('major', tdata?.major || "");
      finalData.append('education_level', tdata?.education_level || "");
      tdata?.professional_interests.forEach((interest, index) => {
        finalData.append(`professional_interests[${index}]`, interest);
      });
      if (tdata.cv) {
        finalData.append('cv', tdata.cv);
      }

      console.log("Form submitted:", Object.fromEntries(finalData));

      const response = await Backend.post("/students/", 
        {
          body: finalData
        }
      );

      router.push('/')
      if (response?.status === 200) {
        console.log("Submission successful:", response.data);
        router.push('/')
      } else {
        console.warn("Unexpected response status:", response.status);
      }
    } catch (error: any) {
      router.push('/')
    }
  };

  return (
    <div className='h-full w-full bg-primary p-6'>
      <div className='mx-auto w-full max-w-6xl'>
        <div className="mb-4 mt-2">
          <Link href="/">
            <Image src="/logo_form.png" alt="logo" width={200} height={50} className="text-white" />
          </Link>
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
                          <div className="grid grid-cols-3 gap-2">
                            <Select onValueChange={(value) => field.onChange({ ...field.value, day: value })}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Jour" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                                  <SelectItem key={day} value={day.toString()}>{day}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Select onValueChange={(value) => field.onChange({ ...field.value, month: value })}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Mois" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                                  <SelectItem key={month} value={month.toString()}>{month}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Select onValueChange={(value) => field.onChange({ ...field.value, year: value })}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Année" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
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
                        <div className='hidden'>

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
                    </div>

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

                    <FormField
                      control={professionalInfoForm.control}
                      name="cv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CV (PDF, max 5MB)</FormLabel>
                          <FormControl>
                            <Input 
                              type="file" 
                              accept=".pdf"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  field.onChange(file);
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
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
              Informations importantes
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Une fois le site finalisé, vous recevrez un email avec toutes les informations nécessaires, y compris vos comptes personnels. Merci de votre patience et de votre confiance.
            </p>
            <div className="flex justify-center">
              <Image
                src="/logo_check.svg"
                alt="Illustration"
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