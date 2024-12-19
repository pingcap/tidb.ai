import { updateEvaluationDatasetItem, type UpdateEvaluationDatasetItemParams } from '@/api/evaluations';
import { mutateEvaluationDataset, useEvaluationDatasetItem } from '@/components/evaluations/hooks';
import { FormTextarea } from '@/components/form/control-widget';
import { FormFieldBasicLayout, FormPrimitiveArrayFieldBasicLayout } from '@/components/form/field-layout';
import { CodeInput } from '@/components/form/widgets/CodeInput';
import { createAccessorHelper, GeneralSettingsField, GeneralSettingsForm } from '@/components/settings-form';
import { z } from 'zod';

export function UpdateEvaluationDatasetItemForm ({ evaluationDatasetId, evaluationDatasetItemId }: { evaluationDatasetId: number, evaluationDatasetItemId: number }) {
  const {
    evaluationDatasetItem,
    isLoading,
    isValidating,
    mutate,
  } = useEvaluationDatasetItem(evaluationDatasetId, evaluationDatasetItemId);

  if (!evaluationDatasetItem) {
    return <></>;
  }

  return (
    <div className="space-y-4 max-w-screen-sm">
      <GeneralSettingsForm
        readonly={false}
        data={evaluationDatasetItem}
        loading={!evaluationDatasetItem || isLoading || isValidating}
        onUpdate={async ({ query, reference, retrieved_contexts, extra }) => {
          const item = await updateEvaluationDatasetItem(
            evaluationDatasetId,
            evaluationDatasetItemId,
            {
              query, retrieved_contexts, reference, extra,
            },
          );
          void mutate(item, { revalidate: true });
          void mutateEvaluationDataset(evaluationDatasetId);
        }}
      >
        <GeneralSettingsField accessor={query} schema={textSchema}>
          <FormFieldBasicLayout name="value" label="Query">
            <CodeInput language="markdown" />
          </FormFieldBasicLayout>
        </GeneralSettingsField>
        <GeneralSettingsField accessor={reference} schema={textSchema}>
          <FormFieldBasicLayout name="value" label="Reference">
            <CodeInput language="markdown" />
          </FormFieldBasicLayout>
        </GeneralSettingsField>
        <GeneralSettingsField accessor={retrievedContexts} schema={textListSchema}>
          <FormPrimitiveArrayFieldBasicLayout name="value" label="Retrieved Contexts" defaultValue={() => ''}>
            <FormTextarea />
          </FormPrimitiveArrayFieldBasicLayout>
        </GeneralSettingsField>
        <GeneralSettingsField accessor={extra} schema={jsonSchema}>
          <FormFieldBasicLayout name="value" label="Extra">
            <CodeInput language="json" />
          </FormFieldBasicLayout>
        </GeneralSettingsField>
      </GeneralSettingsForm>
    </div>
  );
}

const helper = createAccessorHelper<UpdateEvaluationDatasetItemParams>();

const query = helper.field('query');
const reference = helper.field('reference');
const retrievedContexts = helper.field('retrieved_contexts');
const extra = helper.jsonTextField('extra');

const textSchema = z.string().min(1);
const textListSchema = z.string().min(1, 'Non empty').array();
const jsonSchema = z.any();
