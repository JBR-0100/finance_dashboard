// import { fetchFilteredCustomers } from '@/app/lib/data';
// import CustomersTable from '@/app/ui/customers/table';
// import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Customers',
// };

// export default async function Page(props: {
//   searchParams?: Promise<{
//     query?: string;
//     page?: string;
//   }>;
// }) {
//   const searchParams = await props.searchParams;
//   const query = searchParams?.query || '';
//   const customers = await fetchFilteredCustomers(query);
//   return (
//     <main className="w-full">
//       <CustomersTable customers={customers} />
//     </main>
//   );
// }


import { fetchFilteredCustomers } from '@/app/lib/data';
import CustomersTable from '@/app/ui/customers/table';
import { Metadata } from 'next';
import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const customers = await fetchFilteredCustomers(query);

  return (
    <main className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
        
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers..." />
        <Link href="/dashboard/customers/create">
          <Button>Add Customer</Button>
        </Link>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <CustomersTable customers={customers} />
      </Suspense>
    </main>
  );
}