"use client";

import { PrimaryButton } from "@/components/buttons";
import { AnimatePresence, motion } from "motion/react";
import { useActionState, useEffect, useState } from "react";
import { createAdmin } from "../../actions/createAdmin";

interface FormState {
  success: boolean;
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
    general?: string[];
  };
}

const initialState: FormState = {
  success: false,
  errors: {},
};

const AdminForm = () => {
  const [localErrors, setLocalErrors] = useState<any>({});

  const [state, formAction, isPending] = useActionState(
    createAdmin,
    initialState,
  );

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
    <form action={formAction} className="w-full h-full flex flex-col gap-6">
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-3">
          Imie i nazwisko
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="np. Jan Kowalski"
          onFocus={handleFocus}
          className={`${localErrors?.name ? "border-red-500" : ""}`}
        />
        <AnimatePresence>
          {localErrors?.name && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden mt-2"
            >
              <p className="text-text-sub text-xs">* {localErrors.name[0]}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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
              <p className="text-text-sub text-xs">* {localErrors.email[0]}</p>
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
          placeholder="HasłoMasło123"
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
              <p className="text-text-sub text-xs">
                * {localErrors.password[0]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <PrimaryButton className="mt-6" type="submit" disabled={isPending}>
        {isPending ? "Logowanie..." : "Stwórz"}
      </PrimaryButton>
    </form>
  );
};
export default AdminForm;
