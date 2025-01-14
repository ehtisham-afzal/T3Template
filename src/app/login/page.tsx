import { LoginForm } from "@/components/LogInForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center bg-background p-3 py-4 sm:p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm />
      </div>
    </div>
  );
}
