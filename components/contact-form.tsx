"use client";

import { submitContact } from "@/app/actions/contact";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { PrimaryButton } from "./buttons";
import { RevealContainer } from "@/utils/Anim/reveal-container";
import { RevealItem } from "@/utils/Anim/reveal-item";

const ContactForm = () => {
  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState(false);

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = e.target.name;

    setErrors((prev: any) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  };

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const res = await submitContact(formData);

    if (!res.success) {
      setErrors(res.errors);
      setSuccess(false);
    } else {
      setErrors({});
      setSuccess(true);
    }
  }

  return success ? (
    <RevealContainer>
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-accent">Dziękujemy za kontakt!</h2>
          <p className="">Odpowiemy najszybciej jak to mozliwe.</p>
        </div>
      </div>
    </RevealContainer>
  ) : (
    <RevealContainer>
      <form
        onSubmit={handleSubmit}
        className="w-full h-full flex flex-col gap-6 justify-between"
      >
        <RevealItem>
          <div className="w-full flex flex-col">
            <label htmlFor="name" className="mb-3">
              Imie i nazwisko
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="twoje imie i nazwisko"
              onFocus={handleFocus}
              className={`${errors.name ? "border-red-500" : ""}`}
            />
            <AnimatePresence>
              {errors.name && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="overflow-hidden mt-2"
                >
                  <p className="text-text-sub text-xs">* {errors.name[0]}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </RevealItem>
        <RevealItem>
          <div className="w-full flex flex-col">
            <label htmlFor="email" className="mb-3">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="imie.nazwisko@email.com"
              onFocus={handleFocus}
              className={`${errors.email ? "border-red-500" : ""}`}
            />
            <AnimatePresence>
              {errors.email && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="overflow-hidden mt-2"
                >
                  <p className="text-text-sub text-xs">* {errors.email[0]}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </RevealItem>
        <RevealItem>
          <div className="w-full flex flex-col">
            <label htmlFor="phone" className="mb-3">
              Telefon
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              placeholder="123456789"
              onFocus={handleFocus}
              className={`${errors.phone ? "border-red-500" : ""}`}
            />
            <AnimatePresence>
              {errors.phone && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="overflow-hidden mt-2"
                >
                  <p className="text-text-sub text-xs">* {errors.phone[0]}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </RevealItem>
        <RevealItem>
          <div className="w-full flex flex-col">
            <label htmlFor="message" className="mb-3">
              Wiadomość
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Co ci chodzi po głowie?"
              onFocus={handleFocus}
              className={`resize-none overflow-auto ${errors.message ? "border-red-500" : ""}`}
            />
            <AnimatePresence>
              {errors.message && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="overflow-hidden mt-2"
                >
                  <p className="text-text-sub text-xs">* {errors.message[0]}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </RevealItem>
        <RevealItem>
          <PrimaryButton className="" type="submit">
            Wyślij
          </PrimaryButton>
        </RevealItem>
      </form>
    </RevealContainer>
  );
};
export default ContactForm;
