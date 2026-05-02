"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { OctagonAlertIcon } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import {
  FieldGroup,
  FieldLabel,
  Field,
  FieldError,
} from "@/components/ui/field";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
});

export const SignInView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true);
    try {
      await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
          callbackURL: "/",
        },
        {
          onSuccess: () => {
            router.push("/");
          },
          onError: ({ error }) => {
            setError(error.message);
          },
        },
      );
    } finally {
      setPending(false);
    }
  };

  const onSocial = async (provider: "github" | "google") => {
    setError(null);
    setPending(true);

    try {
      await authClient.signIn.social(
        {
          provider: provider,
          callbackURL: "/",
        },
        {
          onError: ({ error }) => {
            setError(error.message);
          },
        },
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            id="form-login"
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-6 md:p-8"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your account
                </p>
              </div>
              <div className="grid gap-3">
                <FieldGroup>
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-login-email">
                          Email
                        </FieldLabel>
                        <Input
                          {...field}
                          id="form-login-email"
                          type="email"
                          placeholder="m@example.com"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </div>
              <div className="grid gap-3">
                <FieldGroup>
                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-login-password">
                          Password
                        </FieldLabel>
                        <Input
                          {...field}
                          id="form-login-password"
                          type="password"
                          placeholder="********"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </div>
              {!!error && (
                <Alert className="bg-destructive/10 border-none">
                  <OctagonAlertIcon className="h-4 w-4 text-destructive" />
                  <AlertTitle>{error}</AlertTitle>
                </Alert>
              )}
              <Button type="submit" className="w-full" disabled={pending}>
                Sign in
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  disabled={pending}
                  onClick={() => onSocial("google")}
                >
                  <FaGoogle />
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  disabled={pending}
                  onClick={() => onSocial("github")}
                >
                  <FaGithub />
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>

          <div className="bg-radial from-sidebar-accent to-sidebar relative hidden md:flex flex-col gap-y-4 items-center justify-center">
            <img src="/logo.svg" alt="Image" className="h-23 w-23" />
            <p className="text-2xl font-semibold text-white">Meet.AI</p>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs  *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>
      </div>
    </div>
  );
};
