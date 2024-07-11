import { updateRelationship } from '@/api/graph';
import { useRef } from 'react';
import { useAction } from './action';
import { type Relationship } from './utils';
import type { JsonFieldInstance } from './components/JsonField';

export function useDirtyRelationship (id: any) {
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const weightRef = useRef<HTMLInputElement>(null);
  const metaRef = useRef<JsonFieldInstance | null>(null);

  const { loading: saving, reset: resetSave, run: save, data: saveReturns, error: saveError, pending: savePending } = useAction(async () => {
    const current = getCurrent();

    if (!current) {
      throw new Error('bad editor state');
    }

    return await updateRelationship(id, current);
  });

  const reset = (relationship: Relationship) => {
    if (weightRef.current) {
      weightRef.current.value = String(relationship.weight);
    }
    if (descriptionRef.current) {
      descriptionRef.current.value = relationship.description;
    }
    if (metaRef.current) {
      metaRef.current.value = relationship.meta;
    }
  };

  const getCurrent = () => {
    const weight = weightRef.current?.value;
    const description = descriptionRef.current?.value;
    const meta = metaRef.current?.value;

    if (weight == null || description == null || meta == null) {
      return undefined;
    }
    return {
      weight: parseInt(weight),
      description,
      relationship_desc: description,
      meta,
    };
  };

  return {
    weightRef,
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