import Logo from "@/components/logo";
import FooterMenuCard from "./footer-menu-card";
import { NavLink } from "@/components/links";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <section id="footer" className="">
      <footer className="bg-gray-50 w-full px-8 pt-15 pb-5 flex">
        <div className="max-w-[1440px] w-full mx-auto space-y-20 flex flex-col">
          <div className="flex flex-col md:flex-row gap-10 justify-between">
            <div className="space-y-6">
              <Logo />
              <div className=""></div>
            </div>

            <div className="flex flex-col md:flex-row gap-10 lg:gap-20">
              <FooterMenuCard headline="Nawigacja">
                <li className="">
                  <NavLink href="/#onas">O nas</NavLink>
                </li>
                <li className="">
                  <NavLink href="/#kursy">Kursy</NavLink>
                </li>
                <li className="">
                  <NavLink href="/#poziomy">Poziomy</NavLink>
                </li>
                <li className="">
                  <NavLink href="/#faq">FAQ</NavLink>
                </li>
              </FooterMenuCard>
              <FooterMenuCard headline="Linki">
                <li className="">
                  <NavLink href="/blog">Blog</NavLink>
                </li>
                <li className="">
                  <NavLink href="/kontakt">Kontakt</NavLink>
                </li>
              </FooterMenuCard>
              <FooterMenuCard headline="Kontakt">
                <li className="group flex gap-3 text-sm items-center">
                  <MapPin
                    size={16}
                    className="text-background-muted group-hover:text-text-main"
                  />
                  <span className="">Aleja Edukacji 123 Warszawa 01-755</span>
                </li>
                <li className="group flex gap-3 text-sm items-center">
                  <Mail
                    size={16}
                    className="text-background-muted group-hover:text-text-main"
                  />
                  <span className="">kontakt@houses.pl</span>
                </li>
                <li className="group flex gap-3 text-sm items-center">
                  <Phone
                    size={16}
                    className="text-background-muted group-hover:text-text-main"
                  />
                  <span className="">+48 123 456 789</span>
                </li>
              </FooterMenuCard>
            </div>
          </div>
          <div className="text-xs text-center">
            <p className="">2026 Houses</p>
          </div>
        </div>
      </footer>
    </section>
  );
};
export default Footer;
