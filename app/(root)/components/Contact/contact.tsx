import ContactForm from "@/components/contact-form";
import { Mail, MapPin, Phone } from "lucide-react";
import ContactCard from "./contact-card";
import { RevealContainer } from "@/utils/Anim/reveal-container";
import { RevealItem } from "@/utils/Anim/reveal-item";

const Contact = () => {
  return (
    <RevealContainer>
      <section id="contact" className="min-h-screen w-full px-8 py-30 flex">
        <div className="max-w-[1440px] w-full m-auto space-y-20 flex flex-col">
          <div className="flex flex-col lg:flex-row gap-30">
            <div className="w-full flex flex-col gap-6">
              <div className="">
                <RevealItem>
                  <h3 className="mt-2 uppercase text-[clamp(var(--text-lg),5vw,var(--text-2xl))] font-semiBold leading-none">
                    masz pytania?
                  </h3>
                </RevealItem>
                <RevealItem>
                  <h2 className="uppercase text-[clamp(var(--text-3xl),5vw,var(--text-4xl))] font-bold leading-none">
                    Skontaktuj się z nami
                  </h2>
                </RevealItem>
              </div>
              <div className="flex flex-col gap-6">
                <RevealItem>
                  <p className="">
                    Chcesz uzyskać bardziej szczegółową ofertę? Opisz co Cię
                    interesuje, a my wrócimy z rozwiązaniem dostosowanym do
                    Twoich potrzeb.
                  </p>
                </RevealItem>
                <RevealItem>
                  <ContactCard icon={<Mail />} title={"Email"}>
                    <p className="">info@houses.pl</p>
                  </ContactCard>
                </RevealItem>
                <RevealItem>
                  <ContactCard icon={<Phone />} title={"Telefon"}>
                    <p className="">+48 123 456 789</p>
                    <p className="">+48 123 456 789</p>
                  </ContactCard>
                </RevealItem>
                <RevealItem>
                  <ContactCard icon={<MapPin />} title={"Adres"}>
                    <p className="">Houses Sp. z o.o</p>
                    <p className="">ul. Modułowa 12, 00-001 Warszawa</p>
                  </ContactCard>
                </RevealItem>
              </div>
            </div>
            <div className="w-full min-h-[621px] lg:py-20">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </RevealContainer>
  );
};
export default Contact;
