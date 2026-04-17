"use client";

import { AnimatePresence, motion } from "motion/react";
import { useActionState, useEffect, useState } from "react";
import { login } from "../actions/login";
import { PrimaryButton } from "@/components/buttons";

const LoginForm = () => {
  interface FormState {
    success: boolean;
    errors: {
      email?: string[];
      password?: string[];
      general?: string[];
    };
  }

  const initialState: FormState = {
    success: false,
    errors: {},
  };

  const [state, formAction, isPending] = useActionState(login, initialState);

  useEffect(() => {
    console.log(state);
  }, [state]);

  const [localErrors, setLocalErrors] = useState(state?.errors);

  useEffect(() => {
    setLocalErrors(state?.errors);
  }, [state]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const field = e.target.name;
    setLocalErrors((prev: any) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  };

  return (
    <form
      action={formAction}
      className="max-w-md w-full h-full flex flex-col gap-6"
    >
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-3">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="imie.nazwisko@email.com"
          onFocus={handleFocus}
          className={`${localErrors?.email ? "border-red-500" : ""}`}
        />
        <AnimatePresence>
          {localErrors?.email && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden mt-2"
            >
              <p className="text-red-500 text-xs">* {localErrors.email[0]}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className="mb-3">
          Hasło
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="hasło"
          onFocus={handleFocus}
          className={`${localErrors?.password ? "border-red-500" : ""}`}
        />
        <AnimatePresence>
          {localErrors?.password && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden mt-2"
            >
              <p className="text-red-500 text-xs">
                * {localErrors.password[0]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {localErrors?.general && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden mt-2"
          >
            <p className="text-red-500 text-xs text-center">
              {localErrors.general[0]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <PrimaryButton className="mt-6" type="submit" disabled={isPending}>
        {isPending ? "Logowanie..." : "Wyślij"}
      </PrimaryButton>
    </form>
  );
};
export default LoginForm;
