"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'

const VerifyEmail = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const token = searchParams.get('token')
  console.log(token)
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
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>{error ? error : message}</div>;
};

export default VerifyEmail;
