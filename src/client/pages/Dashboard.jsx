import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getUserAutogpts from '@wasp/queries/getUserAutogpts';

export function Dashboard() {
  const { data: autogpts, isLoading, error } = useQuery(getUserAutogpts);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {autogpts.map((autogpt) => (
        <div
          key={autogpt.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{autogpt.description}</div>
          <div>{autogpt.isExpired ? 'Expired' : 'Active'}</div>
          <div>
            <button
              onClick={() => expireAutogpt({ autogptId: autogpt.id })}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            >
              Expire
            </button>
            <Link
              to={`/autogpt/${autogpt.id}`}
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'
            >
              Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}