import AurovilleLogo from '@/app/ui/auroville-logo';
// import LoginForm from '@/app/ui/login-form';
import { Suspense } from 'react';
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
          <AurovilleLogo />
        </div>
        <a href="/dashboard">pppppp</a>
        {/* <Suspense>
          <LoginForm />
        </Suspense> */}

      </div>
    </main>
  );
}


// import SignUpForm from '@/app/ui/auth/signup-form';
// import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Sign Up',
// };

// export default function SignUpPage() {
//   return (
//     <main className="flex items-center justify-center md:h-screen">
//       <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
//         <div className="flex h-full flex-1 rounded-lg bg-gray-50 p-6">
//           <SignUpForm />
//         </div>
//       </div>
//     </main>
//   );
// } 