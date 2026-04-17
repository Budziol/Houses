import GlobalLoader from "@/components/global-loader";
import Navbar from "./components/Navbar/navbar";
import Footer from "./components/Footer/footer";
import { SectionSnapProvider } from "@/utils/sectionSnap";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navbar />
      <main className="">
        <GlobalLoader />
        {/* <SectionSnapProvider> */}
        {children}
        {/* </SectionSnapProvider> */}
      </main>
      <Footer />
    </>
  );
};
export default layout;
