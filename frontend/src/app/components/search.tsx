"use client";

import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
import { Input } from "@nextui-org/react";
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
  Button,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchSchema } from "@/schema";
import Icon from "@mdi/react";
import { mdiMagnify, mdiMapMarkerOutline } from "@mdi/js";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getWilayaList , getWilayaByCode} from "@dzcode-io/leblad";
const Search = () => {

  const wilayats = getWilayaList(['name'])
  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      motCle: "",
      wilaya: "",
    },
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = (values: z.infer<typeof SearchSchema>) => {
    setIsLoading(true);
    router.push(`/offer?q=${values.motCle}&wilaya=${values.wilaya}`);
  };
  const { formState } = form;
  const checkErrors = () => {
    console.log(formState.errors);
    if (formState.errors.motCle || formState.errors.wilaya) {
      toast.error("Veuillez remplir les champs correctement");
    }
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 items-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-row gap-4 ">
          <FormField
            name="motCle"
            control={form.control}
            render={({ field }) => (
              <Input
                {...field}
                disabled={isLoading}
                type="text"
                placeholder="Métier, mots-clés, ou entreprise"
                className="w-full"
                variant="bordered"
                classNames={{
                  inputWrapper: "bg-[#F4F4F5]",
                }}
                startContent={
                  <Icon path={mdiMagnify} className="text-primary" size={1} />
                }
              />
            )}
          />
          <FormField
            name="wilaya"
            control={form.control}
            render={({ field }) => (
              <FormControl>
                <>
                  <Autocomplete
                    isDisabled={isLoading}
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
            )}
          />
        </div>
        <Button
          isLoading={isLoading}
          type="submit"
          variant="shadow"
          color="primary"
          className="px-12"
          onPress={checkErrors}
        >
          <p>Recherche</p>
        </Button>
      </form>
    </Form>
  );
};

export default Search;
