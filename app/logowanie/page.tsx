import Logo from "@/components/logo";
import LoginForm from "./components/login-form";

const LoginPage = () => {
  return (
    <section className="min-h-screen w-full flex pt-30 pb-20 px-8">
      <div className="max-w-[1440px] w-full mx-auto flex flex-col gap-10 items-center">
        <Logo />
        <h2 className="">Logowanie</h2>
        <LoginForm />
      </div>
    </section>
  );
};
export default LoginPage;
