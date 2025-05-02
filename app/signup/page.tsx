import SignUpForm from '@/app/ui/auth/signup-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default function SignUpPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-full flex-1 rounded-lg bg-gray-50 p-6">
          <SignUpForm />
        </div>
      </div>
    </main>
  );
} 