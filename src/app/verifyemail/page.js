"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const VerifyEmail = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setMessage('Invalid verification link.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/verifyemail?token=${encodeURIComponent(token)}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Failed to verify email.');
        }

        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        setError('An error occurred while verifying your email.');
        console.error("Error verifying email:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-xl text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className={`max-w-md w-full p-6 rounded-lg shadow-md text-center ${error ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
        <h1 className="text-2xl font-bold mb-4">{error ? 'Verification Failed' : 'Email Verified!'}</h1>
        <p className="mb-4">{error ? error : message}</p>
        <a href="/" className="mt-4 inline-block text-blue-600 hover:underline">Go to Home</a>
      </div>
    </div>
  );
};

const VerifyEmailWithSuspense = () => (
  <Suspense fallback={<div className="flex items-center justify-center h-screen bg-gray-100"><div className="text-xl text-gray-700">Loading verification process...</div></div>}>
    <VerifyEmail />
  </Suspense>
);

export default VerifyEmailWithSuspense;
