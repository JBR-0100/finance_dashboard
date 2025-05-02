import Link from 'next/link';
import AurovilleLogo from '@/app/ui/auroville-logo';
import { lusitana } from '@/app/ui/fonts';
import { redirect } from 'next/navigation';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <div className="mb-8">
        <AurovilleLogo />
      </div>
      <h1 className={`${lusitana.className} mb-8 text-2xl text-gray-800`}>
        Welcome to Auroville Dashboard
      </h1>
      <Link href="/dashboard">
        <button className="rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow hover:bg-blue-700 transition">
          Dashboard
        </button>
      </Link>
    </main>
  );
}
