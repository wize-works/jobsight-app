import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-6 bg-base-200">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-base-content/70 mt-2">Join Wize Works to manage your job sites</p>
        </div>
        <div className="bg-base-100 rounded-lg shadow-lg p-6">
          <SignUp 
            appearance={{
              elements: {
                formButtonPrimary: "bg-primary hover:bg-primary-focus text-primary-content",
                card: "bg-transparent shadow-none",
              }
            }} 
          />
        </div>
      </div>
    </div>
  );
}