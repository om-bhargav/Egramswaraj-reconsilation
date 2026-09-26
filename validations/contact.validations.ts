import {z} from "zod";
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name."),

  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10 digit mobile number."),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),

  message: z
    .string()
    .trim()
    .min(10, "Please enter at least 10 characters.")
    .max(2000, "Message cannot exceed 2000 characters."),

  screenshot: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      "Screenshot must be smaller than 5 MB.",
    )
    .refine(
      (file) => !file || file.type.startsWith("image/"),
      "Please select an image file.",
    ),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const defaultValues: ContactFormValues = {
  name: "",
  phone: "",
  email: "",
  message: "",
  screenshot: undefined,
};