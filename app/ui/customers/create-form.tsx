// 'use client';

// import { useFormStatus } from 'react-dom';
// import { Button } from '@/app/ui/button';
// import { useState } from 'react';

// // Add this to show loading state
// function SubmitButton() {
//   const { pending } = useFormStatus();
//   return (
//     <Button type="submit" aria-disabled={pending}>
//       {pending ? 'Creating...' : 'Create Customer'}
//     </Button>
//   );
// }

// export default function CreateCustomerForm() {
//   const [error, setError] = useState<string | null>(null);

//   async function handleSubmit(formData: FormData) {
//     setError(null);

//     // Basic validation
//     const name = formData.get('name') as string;
//     const email = formData.get('email') as string;

//     if (!name || !email) {
//       setError('Name and email are required');
//       return;
//     }

//     try {
//       const response = await fetch('/api/customers', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create customer');
//       }

//       // Redirect to customers page on success
//       window.location.href = '/dashboard/customers';
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Something went wrong');
//     }
//   }

//   return (
//     <form action={handleSubmit} className="rounded-md bg-gray-50 p-4 md:p-6">
//       {/* Error Display */}
//       {error && (
//         <div className="mb-4 rounded-md bg-red-50 p-4 text-red-600">
//           {error}
//         </div>
//       )}

//       {/* Name */}
//       <div className="mb-4">
//         <label htmlFor="name" className="mb-2 block text-sm font-medium">
//           Name
//         </label>
//         <input
//           id="name"
//           name="name"
//           type="text"
//           required
//           placeholder="Enter customer name"
//           className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
//         />
//       </div>

//       {/* Email */}
//       <div className="mb-4">
//         <label htmlFor="email" className="mb-2 block text-sm font-medium">
//           Email
//         </label>
//         <input
//           id="email"
//           name="email"
//           type="email"
//           required
//           placeholder="Enter customer email"
//           className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
//         />
//       </div>

//       {/* Submit Button */}
//       <div className="mt-6 flex justify-end gap-4">
//         <Button 
//           type="button" 
//           onClick={() => window.location.href = '/dashboard/customers'}
//           className="bg-gray-500"
//         >
//           Cancel
//         </Button>
//         <SubmitButton />
//       </div>
//     </form>
//   );
// } 


'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/app/ui/button';
import { useState } from 'react';
import Image from 'next/image';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

const ALLOWED_DOMAINS = [
  'images.pexels.com',
  'images.unsplash.com',
  'imgur.com',
  'i.imgur.com',
  'picsum.photos',
  'avatars.githubusercontent.com',
  'res.cloudinary.com'
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending}>
      {pending ? 'Creating...' : 'Create Customer'}
    </Button>
  );
}

export default function CreateCustomerForm() {
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isValidImage, setIsValidImage] = useState<boolean>(true);
  const [showDomainHelp, setShowDomainHelp] = useState<boolean>(false);

  const validateImageUrl = async (url: string): Promise<boolean> => {
    if (!url) return true; // Empty URL is valid (will use default)

    try {
      const urlObj = new URL(url);
      const isAllowedDomain = ALLOWED_DOMAINS.some(domain => urlObj.hostname === domain);
      
      if (!isAllowedDomain) {
        setError('Please use an image URL from the allowed domains');
        return false;
      }

      return new Promise((resolve) => {
        const img = document.createElement('img');
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });
    } catch {
      return false;
    }
  };

  const handleImageUrlChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageUrl(url);
    setError(null);
    
    if (url) {
      const isValid = await validateImageUrl(url);
      setIsValidImage(isValid);
      if (!isValid) {
        setError('Please provide a valid image URL from the allowed domains');
      }
    } else {
      setIsValidImage(true);
    }
  };

  async function handleSubmit(formData: FormData) {
    setError(null);

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const imageUrl = formData.get('image_url') as string;

    if (!name || !email) {
      setError('Name and email are required');
      return;
    }

    if (imageUrl && !isValidImage) {
      setError('Please provide a valid image URL from the allowed domains');
      return;
    }

    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create customer');
      }

      // Redirect to customers page on success
      window.location.href = '/dashboard/customers';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  return (
    <form action={handleSubmit} className="rounded-md bg-gray-50 p-4 md:p-6">
      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* Name */}
      <div className="mb-4">
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Enter customer name"
          className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Enter customer email"
          className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
        />
      </div>

      {/* Image URL */}
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <label htmlFor="image_url" className="mb-2 block text-sm font-medium">
            Profile Image URL (optional)
          </label>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setShowDomainHelp(!showDomainHelp);
            }}
            className="text-blue-500 hover:text-blue-600"
          >
            <InformationCircleIcon className="h-5 w-5" />
          </button>
        </div>
        
        {showDomainHelp && (
          <div className="mb-2 rounded-md bg-blue-50 p-3 text-sm text-blue-800">
            <p className="font-medium mb-1">Allowed image URL domains:</p>
            <ul className="list-disc pl-5 space-y-1">
              {ALLOWED_DOMAINS.map(domain => (
                <li key={domain}>{domain}</li>
              ))}
            </ul>
            <p className="mt-2 text-xs">
              Please use an image URL from one of these domains. If no image URL is provided, 
              a default avatar will be used.
            </p>
          </div>
        )}

        <input
          id="image_url"
          name="image_url"
          type="url"
          placeholder="https://images.unsplash.com/..."
          className={`block w-full rounded-md border ${
            !isValidImage && imageUrl ? 'border-red-500' : 'border-gray-200'
          } py-2 px-3 text-sm outline-2 placeholder:text-gray-500`}
          value={imageUrl}
          onChange={handleImageUrlChange}
        />
        
        {!isValidImage && imageUrl && (
          <p className="mt-1 text-sm text-red-500">
            Please provide a valid image URL from the allowed domains
          </p>
        )}
        
        {imageUrl && isValidImage && (
          <div className="mt-2">
            <div className="relative h-12 w-12">
              <Image
                src={imageUrl}
                alt="Profile preview"
                fill
                className="rounded-full object-cover"
              />
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex justify-end gap-4">
        <Button 
          type="button" 
          onClick={() => window.location.href = '/dashboard/customers'}
          className="bg-gray-500"
        >
          Cancel
        </Button>
        <SubmitButton />
      </div>
    </form>
  );
}



// 'use client';

// import { useFormStatus } from 'react-dom';
// import { Button } from '@/app/ui/button';
// import { useState } from 'react';
// import Image from 'next/image';

// function SubmitButton() {
//   const { pending } = useFormStatus();
//   return (
//     <Button type="submit" aria-disabled={pending}>
//       {pending ? 'Creating...' : 'Create Customer'}
//     </Button>
//   );
// }

// export default function CreateCustomerForm() {
//   const [error, setError] = useState<string | null>(null);
//   const [imageUrl, setImageUrl] = useState<string>('');
//   const [isValidImage, setIsValidImage] = useState<boolean>(true);

//   const validateImageUrl = (url: string) => {
//     return new Promise((resolve) => {
//       const img = new Image();
//       img.onload = () => resolve(true);
//       img.onerror = () => resolve(false);
//       img.src = url;
//     });
//   };

//   const handleImageUrlChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const url = e.target.value;
//     setImageUrl(url);
    
//     if (url) {
//       const isValid = await validateImageUrl(url);
//       setIsValidImage(isValid);
//     } else {
//       setIsValidImage(true); // Reset validation if field is empty
//     }
//   };

//   async function handleSubmit(formData: FormData) {
//     setError(null);

//     const name = formData.get('name') as string;
//     const email = formData.get('email') as string;
//     const imageUrl = formData.get('image_url') as string;

//     if (!name || !email) {
//       setError('Name and email are required');
//       return;
//     }

//     if (imageUrl && !isValidImage) {
//       setError('Please provide a valid image URL');
//       return;
//     }

//     try {
//       const response = await fetch('/api/customers', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         const data = await response.json();
//         throw new Error(data.error || 'Failed to create customer');
//       }

//       // Redirect to customers page on success
//       window.location.href = '/dashboard/customers';
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Something went wrong');
//     }
//   }

//   return (
//     <form action={handleSubmit} className="rounded-md bg-gray-50 p-4 md:p-6">
//       {error && (
//         <div className="mb-4 rounded-md bg-red-50 p-4 text-red-600">
//           {error}
//         </div>
//       )}

//       {/* Name */}
//       <div className="mb-4">
//         <label htmlFor="name" className="mb-2 block text-sm font-medium">
//           Name
//         </label>
//         <input
//           id="name"
//           name="name"
//           type="text"
//           required
//           placeholder="Enter customer name"
//           className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
//         />
//       </div>

//       {/* Email */}
//       <div className="mb-4">
//         <label htmlFor="email" className="mb-2 block text-sm font-medium">
//           Email
//         </label>
//         <input
//           id="email"
//           name="email"
//           type="email"
//           required
//           placeholder="Enter customer email"
//           className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
//         />
//       </div>

//       {/* Image URL */}
//       <div className="mb-4">
//         <label htmlFor="image_url" className="mb-2 block text-sm font-medium">
//           Profile Image URL
//         </label>
//         <input
//           id="image_url"
//           name="image_url"
//           type="url"
//           placeholder="https://example.com/image.jpg (optional)"
//           className={`block w-full rounded-md border ${
//             !isValidImage ? 'border-red-500' : 'border-gray-200'
//           } py-2 px-3 text-sm outline-2 placeholder:text-gray-500`}
//           value={imageUrl}
//           onChange={handleImageUrlChange}
//         />
//         {!isValidImage && (
//           <p className="mt-1 text-sm text-red-500">
//             Please provide a valid image URL
//           </p>
//         )}
//         {imageUrl && isValidImage && (
//           <div className="mt-2">
//             <Image
//               src={imageUrl}
//               alt="Profile preview"
//               width={50}
//               height={50}
//               className="rounded-full object-cover"
//             />
//           </div>
//         )}
//       </div>

//       {/* Submit Button */}
//       <div className="mt-6 flex justify-end gap-4">
//         <Button 
//           type="button" 
//           onClick={() => window.location.href = '/dashboard/customers'}
//           className="bg-gray-500"
//         >
//           Cancel
//         </Button>
//         <SubmitButton />
//       </div>
//     </form>
//   );
// }