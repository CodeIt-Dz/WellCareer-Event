"use client"
import React from 'react'
import { X } from 'lucide-react';
import { z } from "zod"
import { getWilayaByCode, getWilayaList } from "@dzcode-io/leblad";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm , Controller  } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import cn from 'classnames';

import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
  Button,
  
} from "@nextui-org/react";

import Icon from "@mdi/react";
import { mdiFolderSearchOutline , mdiMapMarkerOutline  } from '@mdi/js';
import { Input } from "@nextui-org/react";
import { useRouter } from 'next/navigation';



interface ButtonGroupProps {
  options: string[]
  value: string[] 
  onChange: (value: string[]) => void 
}

interface CustomRadioButtonProps { 
  options : string []
  value : string
  onChange: (value: string) => void

}


const CustomRadioButton : React.FC<CustomRadioButtonProps> = ({options , value , onChange}) => {
  return (
  <div className="grid grid-cols-2 w-fit gap-2">
    {
      options.map((option) => (
        <button 
        key={option}
        onClick={() => onChange(value === option ? "" : option)} 
        className={cn(
          "px-4 py-2 text-sm w-fit h-fit font-medium rounded-full transition-colors",
          value === option 
          ? "bg-blue-600 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        )}
        >
          {option}
        </button>
      ))
    }


  </div>
  
)
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ options, value, onChange }) => {
  return (
    <div className="grid grid-cols-2 w-fit gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => {
            const newValue = value.includes(option)
              ? value.filter((v) => v !== option) 
              : [...value, option]; 
            onChange(newValue); 
          }}
          className={cn(
            "px-4 py-2 w-fit h-fit text-sm font-medium rounded-full transition-colors",
            value.includes(option)
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          
            )}
        >
          {option}
        </button>
      ))}
    </div>
  )
}



const formSchema = z.object({
  fonction: z.string().optional(),
  wilaya: z.string().optional(),
  contract_type:z.string().optional(),
  date_pub: z.number().optional(),
  job_level: z.string().optional(),
  salary_min: z.number().positive("The salary must be a positive number").optional(), 
    salary_max: z.number().positive("The salary must be a positive number").optional()
    
})



const contract_types = [
  "CDD",
  "CDI",
  "Mission"
]

const publication_dates = [
  {
    value: 0,
    label: "Pas de limite de temps"
  },
  {
    label : "Le mois dernier",
    value : 30
  },
  {
    label : "La semaine dernière",
    value : 7
  },
  {
    label : "Dernières 24 heures",
    value : 1
  }
 
]

const niveau_emploi = [
  "Débutant / junior",
  "Responsable / équipe",
  "Cadre dirigeant",
  "Stagiaire étudiant",
  "Manager / responsable departement",
  "Confirme experimente",
  "jeune diplome",
  "Test"
];


const Filter = () => {
  
  const wilayats = getWilayaList(['name'])
  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fonction: undefined, 
      wilaya: "",    
      contract_type: "",
      date_pub: 0,  
      job_level: "",
      salary_min: undefined, 
      salary_max: undefined,  
    },
  });
  
  

  const router = useRouter()

  
 

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)

    router.push(`/offer?${new URLSearchParams(values as any).toString()}`)
  }

  const { reset } = form

  const handleReset = () => {
    reset() 
    router.push('/offer') 
    router.refresh() 
  }

  return (
    <div className="flex flex-col gap-16">
      <div className="flex items-center gap-12">
        <span className="text-[28px]">Filtrez par</span>
        <span
        onClick={handleReset}
        className="flex font-light p-1 text-xs rounded-md 
         items-center bg-[#F2F2F2] text-[#919191] cursor-pointer ">
          <X size={12} />
          Reinitialiser
        </span>
      </div>

      <Form {...form}  >
        <form className='flex flex-col gap-12' onSubmit={form.handleSubmit(onSubmit)}  >
        <FormField
          control={form.control}
          name="fonction"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='job_label' >Métier / Fonction</FormLabel>
              <FormControl>
                <Input 
                placeholder="Métier, mots-clés, ou entreprise" 
                
                {...field}
                startContent={
                  <Icon path={mdiFolderSearchOutline} className="text-primary" size={1} />
                }
                className='bg-white placeholder-gray-400'
                />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />


      <FormField
          control={form.control}
          name="wilaya"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='job_label' >Wilaya</FormLabel>
              <FormControl>
              <>
                  <Autocomplete
                    
                    onSelectionChange={(value) => {
                      const wilayaName = getWilayaByCode(parseInt(value?.toString() || "")+1).name;
                      form.setValue("wilaya", wilayaName ? wilayaName?.toString() : "");
                    }}
                    classNames={{
                      base: "bg-[#F4F4F5] rounded-xl",
                      clearButton: "bg-transparent",
                    }}
                    placeholder="Région, wilaya, ou “à distance”"
                    {...field}
                    variant="bordered"
                    startContent={
                      <Icon
                        path={mdiMapMarkerOutline}
                        className="text-primary"
                        size={1}
                      />
                    }
                  >
                    <AutocompleteSection title="Région">
                      {wilayats.map((wilayat, index) => (
                        <AutocompleteItem key={index} value={wilayat.name}>
                          {wilayat.name}
                        </AutocompleteItem>
                      ))}
                    </AutocompleteSection>
                  </Autocomplete>
                </>
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />

      <FormField
            control={form.control}
            name="contract_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='job_label' >Type de contrat</FormLabel>
                <FormControl>
                  <Controller
                    name="contract_type"
                    control={form.control}
                    render={({ field }) => (
                      <CustomRadioButton
                        options={contract_types}
                        value={field.value || ""} 
                        onChange={field.onChange}
                      />
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="date_pub"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='date_pub' >Date de publication</FormLabel>
                <FormControl>
                  <Controller
                    name="date_pub"
                    control={form.control}
                    render={({ field }) => (
                      <CustomRadioButton
                        options={publication_dates.map((date) => date.label)}
                        value={
                          field.value
                            ? publication_dates.find((date) => date.value?.toString() === field.value?.toString())?.label || "0"
                            : "0"
                        }
                        onChange={ (value) => 
                          { value ? field.onChange(publication_dates.find((date) => date.label === value)?.value) : field.onChange(null) }}
                      />
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="job_level"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='job_label' >Niveau d’emploi</FormLabel>
                <FormControl>
                  <Controller
                    name="job_level"
                    control={form.control}
                    render={({ field }) => (
                      <CustomRadioButton
                        options={niveau_emploi}
                        value={field.value || ""} 
                        onChange={(selectedValues) => field.onChange(selectedValues)}
                      />
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />    



<FormField
  control={form.control}
  name="salary_min"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="job_label">Salaire Min</FormLabel>
      <FormControl>
        <Input
          placeholder="Min"
          type="number"
          step={1000}
          min={0}
          value={field.value !== undefined ? String(field.value) : "0"}
          onChange={(e) => field.onChange(Number(e.target.value))}
          className="bg-white placeholder-gray-400"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


    <FormField
      control={form.control}
      name="salary_max"
      render={({ field }) => (
        <FormItem>
          <FormLabel className='job_label'>Salaire Max</FormLabel>
          <FormControl>
            <Input
              placeholder="Max"
              type="number"
              step={1000}
              min={0} 
              value={field.value !== undefined ? String(field.value) : "0"}
              onChange={(e) => field.onChange(Number(e.target.value))}
              
              className='bg-white placeholder-gray-400'
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />



          <Button
          type="submit"
          variant="shadow"
          color="primary"
          className="px-12"
          
        >
          <p>Recherche</p>
        </Button>


        
        
        
             

        </form>

      </Form>
    </div>
  );
};

export default Filter;
