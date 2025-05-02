import { Metadata } from 'next';
import CreateCustomerForm from '@/app/ui/customers/create-form';
import { lusitana } from '@/app/ui/fonts';

export const metadata: Metadata = {
  title: 'Add Customer',
};

export default function Page() {
  return (
    <main className="w-full">
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Add New Customer
      </h1>
      <CreateCustomerForm />
    </main>
  );
} 