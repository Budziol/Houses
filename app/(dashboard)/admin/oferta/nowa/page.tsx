import OfferForm from "../components/offer-form";

const NewOfferPage = () => {
  return (
    <section className="min-h-screen w-full flex pt-30 pb-20 px-8">
      <div className="max-w-[1440px] w-full mx-auto flex flex-col gap-10">
        <h2 className="">Nowa oferta</h2>
        <OfferForm />
      </div>
    </section>
  );
};
export default NewOfferPage;
