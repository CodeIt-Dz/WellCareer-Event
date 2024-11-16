import * as z from "zod";
export const LoginSchema = z.object({
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z.string().min(1, {
    message: "Password must be at least 1 character",
  }),
});
enum CurrentSituation {
  CONTRACT_END = "En Fin de Contrat",
  EMPLOYED = "En Poste",
  UNEMPLOYED = "Sans Emploi",
}

export const SearchSchema = z.object({
  motCle: z.string().optional(),
  wilaya: z.string().optional(),
});

export const RegisterSchema = z
  .object({
    first_name: z.string().min(2, {
      message: "First name must be at least 2 characters",
    }),
    last_name: z.string().min(2, {
      message: "Last name must be at least 2 characters",
    }),
    phone_number: z
      .string()
      .min(10, {
        message: "Phone number must be at least 10 characters",
      })
      .regex(/^[0-9]*$/, {
        message: "Phone number must contain only digits",
      }),
    address: z.string().min(5, {
      message: "Address must be at least 5 characters",
    }),
    birth_date: z.date().refine(
      (value) => {
        const date = new Date(value);
        return date < new Date();
      },
      {
        message: "Birth date must be in the past",
      }
    ),

    current_situation: z.enum([
      CurrentSituation.CONTRACT_END,
      CurrentSituation.EMPLOYED,
      CurrentSituation.UNEMPLOYED,
    ]),
    gender: z.enum(["Homme", "Femme"]),
    email: z.string().email({
      message: "Invalid email",
    }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters",
      })
      .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/, {
        message:
          "Password must contain at least one uppercase letter, one special character, one digit, and be at least 8 characters long",
      }),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
  });

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters",
    })
    .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/, {
      message:
        "Password must contain at least one uppercase letter, one special character, one digit, and be at least 8 characters long",
    }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Invalid email",
  }),
});
