import { updateEntity } from '@/api/graph';
import { useRef } from 'react';
import { useAction } from './action';
import { type Entity } from './utils';
import type { JsonFieldInstance } from './components/JsonField';

export function useDirtyEntity (kbId: number, id: any) {
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const metaRef = useRef<JsonFieldInstance | null>(null);

  const { loading: saving, reset: resetSave, run: save, data: saveReturns, error: saveError, pending: savePending } = useAction(async () => {
    const current = getCurrent();

    if (!current) {
      throw new Error('bad editor state');
    }

    return await updateEntity(kbId, id, current);
  });

  const reset = (entity: Entity) => {
    if (nameRef.current) {
      nameRef.current.value = entity.name;
    }
    if (descriptionRef.current) {
      descriptionRef.current.value = entity.description;
    }
    if (metaRef.current) {
      metaRef.current.value = entity.meta;
    }
  };

  const getCurrent = () => {
    const name = nameRef.current?.value;
    const description = descriptionRef.current?.value;
    const meta = metaRef.current?.value;

    if (name == null || description == null || meta == null) {
      return undefined;
    }
    return {
      name,
      description,
      meta,
    };
  };

  return {
    nameRef,
    descriptionRef,
    metaRef,
    reset,
    save,
    saving,
    saveError,
    savePending,
    saveReturns,
    resetSave,
  };
}