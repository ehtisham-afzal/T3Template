import { SignUpForm } from "@/components/SignUpForm"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background p-3 py-4 sm:p-6 md:p-10 w-full" >
      <div className="w-full max-w-sm md:max-w-4xl">
        <SignUpForm />
      </div>
    </div>
  )
}
