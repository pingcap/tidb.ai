import { type EvaluationDataset, updateEvaluationDataset } from '@/api/evaluations';
import { mutateEvaluationDatasets, useEvaluationDataset } from '@/components/evaluations/hooks';
import { FormInput } from '@/components/form/control-widget';
import { FormFieldBasicLayout } from '@/components/form/field-layout';
import { fieldAccessor, GeneralSettingsField, type GeneralSettingsFieldAccessor, GeneralSettingsForm } from '@/components/settings-form';
import { Skeleton } from '@/components/ui/skeleton';
import type { KeyOfType } from '@/lib/typing-utils';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useTransition } from 'react';
import { z } from 'zod';

export function EvaluationDatasetInfo ({ evaluationDatasetId }: { evaluationDatasetId: number }) {
  const { evaluationDataset } = useEvaluationDataset(evaluationDatasetId);

  if (evaluationDataset) {
    return <EvaluationDatasetInfoDisplay evaluationDataset={evaluationDataset} />;
  } else {
    return <EvaluationDatasetInfoSkeleton />;
  }
}

export function EvaluationDatasetInfoDisplay ({ evaluationDataset }: { evaluationDataset: EvaluationDataset }) {
  const router = useRouter();
  const [transitioning, startTransition] = useTransition();

  return (
    <div className="space-y-4 max-w-screen-sm">
      <GeneralSettingsForm
        data={evaluationDataset}
        readonly={transitioning}
        loading={transitioning}
        onUpdate={async (item) => {
          await updateEvaluationDataset(item.id, { name: item.name });
          startTransition(() => {
            router.refresh();
            void mutateEvaluationDatasets();
          });
        }}
      >
        <GeneralSettingsField
          accessor={id}
          schema={whatever}
          readonly
        >
          <FormFieldBasicLayout name="value" label="ID">
            <FormInput />
          </FormFieldBasicLayout>
        </GeneralSettingsField>
        <GeneralSettingsField
          accessor={name}
          schema={nameSchema}
        >
          <FormFieldBasicLayout name="value" label="Name">
            <FormInput />
          </FormFieldBasicLayout>
        </GeneralSettingsField>
        <GeneralSettingsField
          accessor={createdAt}
          schema={whatever}
          readonly
        >
          <FormFieldBasicLayout name="value" label="Created At">
            <FormInput />
          </FormFieldBasicLayout>
        </GeneralSettingsField>
        <GeneralSettingsField
          accessor={updatedAt}
          schema={whatever}
          readonly
        >
          <FormFieldBasicLayout name="value" label="Updated At">
            <FormInput />
          </FormFieldBasicLayout>
        </GeneralSettingsField>
        <GeneralSettingsField
          accessor={userId}
          schema={whatever}
          readonly
        >
          <FormFieldBasicLayout name="value" label="User ID">
            <FormInput />
          </FormFieldBasicLayout>
        </GeneralSettingsField>
      </GeneralSettingsForm>
    </div>
  );
}

export function EvaluationDatasetInfoSkeleton ({}: {}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="py-[0.125em] text-xs">
          <Skeleton className="block w-[14em] h-[1em] rounded-sm" />
        </div>
        <div className="py-[0.125em] text-xs">
          <Skeleton className="block w-[14em] h-[1em] rounded-sm" />
        </div>
        <div className="py-[0.125em] text-xs">
          <Skeleton className="block w-[8em] h-[1em] rounded-sm" />
        </div>
      </div>
    </div>
  );
}

const whatever = z.any();

const getDatetimeAccessor = (key: KeyOfType<EvaluationDataset, Date>): GeneralSettingsFieldAccessor<EvaluationDataset, string> => {
  return {
    path: [key],
    get (data) {
      return format(data[key], 'yyyy-MM-dd HH:mm:ss');
    },
    set () {
      throw new Error(`update ${key} is not supported`);
    },
  };
};

const id = fieldAccessor<EvaluationDataset, 'id'>('id');
const name = fieldAccessor<EvaluationDataset, 'name'>('name');
const userId = fieldAccessor<EvaluationDataset, 'user_id'>('user_id');
const createdAt = getDatetimeAccessor('created_at');
const updatedAt = getDatetimeAccessor('updated_at');

const nameSchema = z.string().min(1);