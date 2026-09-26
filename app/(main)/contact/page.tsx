"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { contactSchema,ContactFormValues,defaultValues } from "@/validations/contact.validations";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  CheckCircle2,
  ImagePlus,
  Mail,
  MessageSquare,
  Phone,
  User,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  EMAIL,
  EMAIL_HREF,
  PHONE,
  PHONE_HREF,
} from "@/components/home/site-data";

const ABOUT_POINTS = [
  {
    title: "Built for Gram Panchayat reconciliation",
    detail:
      "The software logs into eGramSwaraj, works through each record for a Gram Panchayat, reconciles it against the bank statement, and closes the day book or month book for you.",
  },
  {
    title: "Runs on your own computer",
    detail:
      "It is a desktop utility, not a web service. Your login details and panchayat data stay on the machine where you install it.",
  },
  {
    title: "48 hour trial, then a one-time purchase",
    detail:
      "Install the trial and run the full workflow on your own data. Once you are satisfied, the licence is activated for that machine.",
  },
  {
    title: "Support directly from the developer",
    detail:
      "Questions about installation, a panchayat that behaves differently, or a change you need — you speak to the person who wrote the software.",
  },
];

const REASONS = [
  "Trial installation or setup help",
  "Buying the full version",
  "A record or panchayat that did not reconcile",
  "A change or feature you need",
];


type Status = "idle" | "error" | "sent";

export default function ContactPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imagePreview, setImagePreview] = useState("");
  const [imageName, setImageName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      clearImage();
      return;
    }

    // Store the actual File in react-hook-form
    setValue("screenshot", file, {
      shouldValidate: true,
      shouldDirty: true,
    });

    // Revoke the previous preview URL
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImageName(file.name);
    setImagePreview(URL.createObjectURL(file));

    setStatus("idle");
    setError("");
  }

  function clearImage() {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImageName("");
    setImagePreview("");

    setValue("screenshot", undefined, {
      shouldValidate: true,
      shouldDirty: true,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function onSubmit(values: ContactFormValues) {
    setError("");
    setStatus("idle");

    try {
      console.log("Contact form values:", values);

       const formData = new FormData();
       
        formData.append("name", values.name);
        formData.append("phone", values.phone);
        formData.append("email", values.email);
        formData.append("message", values.message);
       
        if (values.screenshot) {
          formData.append("screenshot", values.screenshot);
        }
       
        await fetch("/api/contact", {
          method: "POST",
          body: formData,
        });


      setStatus("sent");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  function handleReset() {
    reset(defaultValues);
    clearImage();
    setStatus("idle");
    setError("");
  }

  return (

      <main className="flex-1 mt-8 md:mt-16">
        <div className="mx-auto w-full max-w-350 px-5 py-12 sm:px-6 md:py-16">
          <div className="max-w-165">
            <p className="text-[13px] font-semibold tracking-[0.08em] text-green uppercase">
              Contact
            </p>

            <h1 className="mt-3 text-[clamp(1.9rem,4vw,2.6rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-navy">
              Talk to the developer directly.
            </h1>

            <p className="mt-4 text-subtle">
              Send your question using the form below, or call if it is urgent.
              If a record or a screen is not behaving as expected, attach a
              screenshot — it usually explains the problem faster than words do.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
            {/* ------------------------------ FORM ------------------------------ */}

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="rounded-xl border border-line bg-surface p-6 sm:p-8"
            >
              <h2 className="text-lg font-bold tracking-[-0.01em] text-navy">
                Send a request
              </h2>

              <p className="mt-1 text-sm text-subtle">
                All fields are required except the screenshot.
              </p>

              {/* ------------------------------ NAME / PHONE ------------------------------ */}

              <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-navy">
                    <User className="size-3.5 text-faint" />
                    Name
                  </Label>

                  <Input
                    id="name"
                    autoComplete="name"
                    placeholder="Your full name"
                    {...register("name")}
                    className="h-10"
                    aria-invalid={!!errors.name}
                  />

                  {errors.name && (
                    <p className="text-xs font-medium text-brand-red">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone" className="text-navy">
                    <Phone className="size-3.5 text-faint" />
                    Phone number
                  </Label>

                  <Input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="10 digit mobile number"
                    {...register("phone")}
                    className="h-10"
                    aria-invalid={!!errors.phone}
                  />

                  {errors.phone && (
                    <p className="text-xs font-medium text-brand-red">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* ------------------------------ EMAIL ------------------------------ */}

              <div className="mt-5 grid gap-2">
                <Label htmlFor="email" className="text-navy">
                  <Mail className="size-3.5 text-faint" />
                  Email address
                </Label>

                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className="h-10"
                  aria-invalid={!!errors.email}
                />

                {errors.email && (
                  <p className="text-xs font-medium text-brand-red">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* ------------------------------ MESSAGE ------------------------------ */}

              <div className="mt-5 grid gap-2">
                <Label htmlFor="message" className="text-navy">
                  <MessageSquare className="size-3.5 text-faint" />
                  Message
                </Label>

                <textarea
                  id="message"
                  rows={6}
                  placeholder="Tell us which panchayat or step is involved, and what you expected to happen."
                  {...register("message")}
                  aria-invalid={!!errors.message}
                  className="w-full resize-y rounded-lg border border-input bg-transparent px-3 py-2.5 text-[15px] leading-relaxed transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                />

                <div className="flex items-start justify-between gap-3">
                  {errors.message ? (
                    <p className="text-xs font-medium text-brand-red">
                      {errors.message.message}
                    </p>
                  ) : (
                    <span />
                  )}

                  <span className="text-xs text-faint">
                    Maximum 2000 characters
                  </span>
                </div>
              </div>

              {/* ----------------------------- SCREENSHOT ----------------------------- */}

              <div className="mt-5 grid gap-2">
                <Label htmlFor="screenshot" className="text-navy">
                  <ImagePlus className="size-3.5 text-faint" />
                  Screenshot
                  <span className="font-normal text-faint">
                    (optional)
                  </span>
                </Label>

                <input
                  ref={fileInputRef}
                  id="screenshot"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="sr-only"
                />

                {imagePreview ? (
                  <div className="flex items-center gap-3 rounded-lg border border-line bg-paper p-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreview}
                      alt="Selected screenshot"
                      className="size-14 flex-none rounded-md border border-line object-cover"
                    />

                    <span className="min-w-0 flex-1 truncate text-sm text-subtle">
                      {imageName}
                    </span>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={clearImage}
                      aria-label="Remove screenshot"
                      className="text-faint hover:text-brand-red"
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                ) : (
                  <label
                    htmlFor="screenshot"
                    className="flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-line-strong bg-paper px-4 py-7 text-center transition-colors hover:border-green hover:bg-green-soft/40"
                  >
                    <ImagePlus className="size-5 text-faint" />

                    <span className="text-sm font-medium text-navy">
                      Click to attach an image
                    </span>

                    <span className="text-[13px] text-faint">
                      A PNG or JPG of the screen you are asking about
                    </span>
                  </label>
                )}

                {errors.screenshot && (
                  <p className="text-xs font-medium text-brand-red">
                    {errors.screenshot.message}
                  </p>
                )}
              </div>

              {/* ------------------------------ STATUS ------------------------------ */}

              {status === "error" && error ? (
                <p
                  role="alert"
                  className="mt-5 text-sm font-medium text-brand-red"
                >
                  {error}
                </p>
              ) : null}

              {status === "sent" ? (
                <p
                  role="status"
                  className="mt-5 flex items-start gap-2 rounded-lg border border-green/25 bg-green-soft px-4 py-3 text-sm font-medium text-green-dark"
                >
                  <CheckCircle2 className="mt-0.5 size-4 flex-none" />

                  Thanks, your request has been noted. Nothing leaves this
                  page yet, the form is not connected to the server.
                </p>
              ) : null}

              {/* ------------------------------ ACTIONS ------------------------------ */}

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="h-11 bg-green text-white hover:bg-green-dark sm:px-7"
                >
                  {isSubmitting ? "Sending..." : "Send request"}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="lg"
                  onClick={handleReset}
                  disabled={isSubmitting}
                  className="h-11 text-subtle"
                >
                  Reset
                </Button>
              </div>
            </form>

            {/* -------------------------- DETAILS AND REASONS -------------------------- */}

            <aside className="grid gap-6">
              <div className="rounded-xl border border-line bg-surface p-6">
                <h2 className="text-base font-bold tracking-[-0.01em] text-navy">
                  Reach us directly
                </h2>

                <dl className="mt-4 grid gap-3 text-[15px]">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-sm text-subtle">Developer</dt>
                    <dd className="m-0 font-semibold text-navy">
                      Om Bhargav
                    </dd>
                  </div>

                  <div className="flex items-baseline justify-between gap-4 border-t border-line pt-3">
                    <dt className="text-sm text-subtle">Phone</dt>

                    <dd className="m-0 font-semibold">
                      <a
                        href={PHONE_HREF}
                        className="border-b border-line-strong text-navy no-underline hover:border-green hover:text-green"
                      >
                        {PHONE}
                      </a>
                    </dd>
                  </div>

                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-line pt-3">
                    <dt className="text-sm text-subtle">Email</dt>

                    <dd className="m-0 min-w-0 font-semibold break-words">
                      <a
                        href={EMAIL_HREF}
                        className="border-b border-line-strong text-navy no-underline hover:border-green hover:text-green"
                      >
                        {EMAIL}
                      </a>
                    </dd>
                  </div>

                  <div className="flex items-baseline justify-between gap-4 border-t border-line pt-3">
                    <dt className="text-sm text-subtle">Hours</dt>

                    <dd className="m-0 font-semibold text-navy">
                      Mon to Sat, 10 AM – 7 PM
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-xl border border-line bg-surface p-6">
                <h2 className="text-base font-bold tracking-[-0.01em] text-navy">
                  What people usually write about
                </h2>

                <ul className="mt-4 grid list-none gap-2.5 p-0 text-[15px] text-subtle">
                  {REASONS.map((reason) => (
                    <li key={reason} className="flex gap-2.5">
                      <CheckCircle2 className="mt-1 size-4 flex-none text-green" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          {/* ------------------------- MORE ABOUT THE SOFTWARE ------------------------- */}

          <section className="mt-16 border-t border-line pt-12">
            <div className="max-w-[660px]">
              <h2 className="text-[clamp(1.5rem,2.8vw,2.1rem)] leading-[1.2] font-extrabold tracking-[-0.015em] text-navy">
                About the software
              </h2>

              <p className="mt-4 text-subtle">
                eGramSwaraj Automation is an independent desktop utility that
                carries out bank reconciliation for each Gram Panchayat, so
                work that takes an afternoon by hand finishes on its own.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
              {ABOUT_POINTS.map((point) => (
                <div
                  key={point.title}
                  className="rounded-xl border border-line bg-surface p-6"
                >
                  <h3 className="text-base font-bold tracking-[-0.01em] text-navy">
                    {point.title}
                  </h3>

                  <p className="mt-2 text-[15px] leading-relaxed text-subtle">
                    {point.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 rounded-xl border border-line bg-surface px-6 py-5">
              <p className="min-w-0 flex-1 text-[15px] text-subtle">
                Want to see the workflow before you ask anything? The trial
                runs the whole process on your own data.
              </p>

              <Button
                size="lg"
                className="h-10 bg-navy text-white hover:bg-navy/90"
                nativeButton={false}
                render={<Link href="/#trial" />}
              >
                See the trial
              </Button>
            </div>
          </section>
        </div>
      </main>
  );
}
