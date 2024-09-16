// "use client"; // Ensure this is at the top of the file

// import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';

// const VerifyEmail = () => {
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const searchParams = useSearchParams(); // useSearchParams is client-side only
//   const token = searchParams.get('token');

//   useEffect(() => {
//     const verifyEmail = async () => {
//       if (!token) {
//         setMessage('Invalid verification link.');
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch(`/api/verifyemail?token=${encodeURIComponent(token)}`, {
//           method: 'GET',
//         });

//         if (!response.ok) {
//           throw new Error('Failed to verify email.');
//         }

//         const data = await response.json();
//         setMessage(data.message);
//       } catch (error) {
//         setError('An error occurred while verifying your email.');
//         console.error("Error verifying email:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (token) {
//       verifyEmail();
//     }
//   }, [token]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return <div>{error ? error : message}</div>;
// };

// export default VerifyEmail;
"use client";
import React from "react";

const VerifyEmail = () => {
  return <div>VerifyEmail</div>;
};

export default VerifyEmail;
