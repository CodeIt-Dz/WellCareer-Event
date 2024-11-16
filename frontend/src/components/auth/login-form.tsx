"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app"
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { LoginSchema } from "@/schema";
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
import { login } from "@/actions/auth/login";
import { Checkbox } from "@/components/ui/checkbox";
import { Button as ShadCnButton } from "@/components/ui/button";
import { Button } from "@nextui-org/react";
import Icon from "@mdi/react";
import { mdiEye, mdiEyeClosed, mdiEyeOff } from "@mdi/js";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    console.log(values)

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data.success);
            router.push("/");
          }
          //? if email verification is added un-comment this
          // if (data?.success) {
          //   form.reset();
          //   setSuccess(data.success);
          // }

          //? if 2fa is added un-comment this
          // if (data?.twoFactor) {
          //   setShowTwoFactor(true);
          // }
        })
        .catch((e) => {
          console.error(e);
          setError("Something went wrong");
        });
    });
  };
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );
  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  return (
    <CardWrapper
      headerLabel=""
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      headerTitle="Login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* 
            //? 2fa verification 
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="123456"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )} */}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username or email *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="john.doe@example.com"
                          type="text"
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
                            disabled={isPending}
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
                            <Icon size={1} path={passwordType !== "password" ? mdiEye : mdiEyeOff} />
                          </Button>
                        </div>
                      </FormControl>
                      <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row items-center gap-2">
                          <Checkbox id="remember-me" />
                          <label
                            htmlFor="remember-me"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#445681]"
                          >
                            Remember me
                          </label>
                        </div>
                        <ShadCnButton
                          size="sm"
                          variant="link"
                          className="px-0 font-normal text-white"
                        >
                          <Link href="/auth/reset">Forgot password?</Link>
                        </ShadCnButton>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button
            isLoading={isPending}
            type="submit"
            color="primary"
            className="w-full"
          >
            {showTwoFactor ? "Confirm" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
