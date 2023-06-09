'use client';
import { useToggle } from '@ethang/hooks/use-toggle';
import { useRouter } from 'next/navigation';
import type { JSX } from 'react';

import { ROOT_URL } from '../../../../util/constants';
import { zodFetch } from '../../../../util/zod';
import { Button } from '../../../(components)/(elements)/button';
import { Modal } from '../../../(components)/modal';
import { deleteListReturnSchema } from '../../../api/delete-list/types';

type DeleteListModalProperties = {
  listId: string;
  listTitle: string;
};

export function DeleteListModal({
  listId,
  listTitle,
}: DeleteListModalProperties): JSX.Element {
  const router = useRouter();
  const [isOpen, toggleOpen] = useToggle(false);
  const [isLoading, toggleLoading] = useToggle(false);

  const handleDelete = async (): Promise<void> => {
    toggleLoading();
    await zodFetch(deleteListReturnSchema, `${ROOT_URL}/api/delete-list`, {
      body: JSON.stringify({ listId }),
      credentials: 'same-origin',
      method: 'POST',
    });
    router.refresh();
  };

  return (
    <div className="flex justify-end">
      <Button className="border-red-500 bg-red-500" onClick={toggleOpen}>
        Remove
      </Button>
      <Modal isOpen={isOpen} toggleOpen={toggleOpen}>
        <p>
          This will <span className="font-bold">permanently delete</span>{' '}
          {listTitle}.
        </p>
        <p>Are you sure?</p>
        <div className="my-4 flex justify-between">
          <Button disabled={isLoading} onClick={handleDelete}>
            Yes, Remove
          </Button>
          <Button disabled={isLoading} onClick={toggleOpen}>
            No, Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}
