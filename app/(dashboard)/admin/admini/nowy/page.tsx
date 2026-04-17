import AdminForm from "./components/admin-form";

const AddNewAdmin = () => {
  return (
    <section className="min-h-screen w-full flex pt-30 pb-20 px-8">
      <div className="max-w-[1440px] w-full mx-auto flex flex-col gap-10">
        <h2 className="">Nowy admin</h2>
        <AdminForm />
      </div>
    </section>
  );
};
export default AddNewAdmin;
