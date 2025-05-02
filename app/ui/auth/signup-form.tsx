'use client';

import { lusitana } from '@/app/ui/fonts';
import { Button } from '@/app/ui/button';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      {pending ? 'Creating account...' : 'Sign up'}
    </Button>
  );
}

export default function SignUpForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account');
      }

      setSuccess('Account created successfully! Redirecting to login...');
      
      // Clear form
      const form = document.querySelector('form') as HTMLFormElement;
      form?.reset();

      // Redirect to login page after a short delay
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);

    } catch (err) {
      console.error('Signup error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  return (
    <div className="flex-1 px-6 pb-4 pt-8">
      <h1 className={`${lusitana.className} mb-3 text-2xl`}>
        Create an account
      </h1>
      <div className="text-sm text-gray-600 mb-4">
        Already have an account? {' '}
        <Link href="/login" className="text-blue-600 hover:text-blue-500">
          Sign in
        </Link>
      </div>

      <form action={handleSubmit}>
        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-md bg-green-50 p-4 text-green-600">
            {success}
          </div>
        )}

        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-medium"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            id="name"
            type="text"
            name="name"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-medium"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-medium"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            id="password"
            type="password"
            name="password"
            placeholder="Enter password (min. 6 characters)"
            required
            minLength={6}
          />
        </div>

        <SubmitButton />
      </form>
    </div>
  );
} 