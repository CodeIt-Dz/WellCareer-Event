"use client";

import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema } from "@/schema";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { register } from "@/actions/auth/register";
import { login } from "@/actions/auth/login";
import { Button as ShadCnButton } from "@/components/ui/button";
import { Button } from "@nextui-org/react";
import Icon from "@mdi/react";
import { mdiEye } from "@mdi/js";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {},
  });
  useEffect(() => {
    const values = form.watch();
  }, [form]);

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    
    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );
  const [passwordConfirmationType, setPasswordConfirmationType] = useState<
    "password" | "text"
  >("password");

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };
  const togglePasswordConfirmationVisibility = () => {
    setPasswordConfirmationType(
      passwordConfirmationType === "password" ? "text" : "password"
    );
  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      headerTitle="Register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4 grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending || isLoading}
                      placeholder="john.doe@example.com"
                      type="email"
                      className="bg-[#2a3038] text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        disabled={isPending || isLoading}
                        placeholder="******"
                        role="register"
                        type={passwordType}
                        className="bg-[#2a3038] text-white"
                      />
                      <Button
                        isIconOnly
                        variant="light"
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-400"
                        onClick={togglePasswordVisibility}
                      >
                        <Icon size={1} path={mdiEye} />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Confirmation</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        disabled={isPending || isLoading}
                        placeholder="******"
                        type={passwordConfirmationType}
                        className="bg-[#2a3038] text-white"
                      />
                      <Button
                        isIconOnly
                        variant="light"
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-400"
                        onClick={togglePasswordConfirmationVisibility}
                      >
                        <Icon size={1} path={mdiEye} />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending || isLoading}
                      placeholder="John Doe"
                      className="bg-[#2a3038] text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending || isLoading}
                      placeholder="John Doe"
                      className="bg-[#2a3038] text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending || isLoading}
                      placeholder="John Doe"
                      className="bg-[#2a3038] text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending || isLoading}>
                      <SelectTrigger className="bg-[#2a3038] text-white">
                        <SelectValue placeholder="Selectionner un genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Genre</SelectLabel>
                          <SelectItem key="Homme" value="Homme">
                            Homme
                          </SelectItem>
                          <SelectItem key="Femme" value="Femme">
                            Femme
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tel</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      disabled={isPending || isLoading}
                      placeholder="John Doe"
                      className="bg-[#2a3038] text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birth_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de naissance</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <ShadCnButton
                            variant={"outline"}
                            className={cn(
                              "w-full bg-[#2a3038] text-white pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </ShadCnButton>
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="current_situation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Situation</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending || isLoading}>
                      <SelectTrigger className="bg-[#2a3038] text-white">
                        <SelectValue placeholder="Selectionner une situation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Genre</SelectLabel>
                          <SelectItem key="En Fin de Contrat" value="En Fin de Contrat">
                            En Fin de Contrat
                          </SelectItem>
                          <SelectItem key="En Poste" value="En Poste">
                            En Poste
                          </SelectItem>
                          <SelectItem key="Sans Emploi" value="Sans Emploi">
                            Sans Emploi
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            isLoading={isPending || isLoading}
            type="submit"
            className="w-full"
            color="primary"
          >
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
