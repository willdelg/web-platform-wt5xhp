import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getAutogpt from '@wasp/queries/getAutogpt';
import createAutogpt from '@wasp/actions/createAutogpt';
import expireAutogpt from '@wasp/actions/expireAutogpt';

export function Autogpt() {
  const { autogptId } = useParams();
  const { data: autogpt, isLoading, error } = useQuery(getAutogpt, { id: autogptId });
  const createAutogptFn = useAction(createAutogpt);
  const expireAutogptFn = useAction(expireAutogpt);
  const [newDescription, setNewDescription] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateAutogpt = () => {
    createAutogptFn({ description: newDescription });
    setNewDescription('');
  };

  const handleExpireAutogpt = () => {
    expireAutogptFn({ id: autogptId });
  };

  return (
    <div className=''>
      <div className='flex gap-x-4 py-5'>
        <input
          type='text'
          placeholder='New Description'
          className='px-1 py-2 border rounded text-lg'
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button
          onClick={handleCreateAutogpt}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Create Autogpt
        </button>
      </div>
      <div>
        <div className='py-2 px-2 flex items-center hover:bg-slate-100 gap-x-2 rounded'>
          <input
            type='checkbox'
            checked={autogpt.isExpired}
            onChange={handleExpireAutogpt}
            className='mr-2 h-6 w-6'
          />
          <p>{autogpt.description}</p>
        </div>
      </div>
    </div>
  );
}