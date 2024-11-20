import { GeneralSettingsFormContextProvider, type OnUpdateField } from '@/components/settings-form/context';
import { useLatestRef } from '@/components/use-latest-ref';
import { type ReactNode, useState } from 'react';

export function GeneralSettingsForm<Data> ({ data, loading, readonly, onUpdate, children }: {
  data: Data,
  readonly: boolean,
  loading: boolean,
  onUpdate: (data: Readonly<Data>, path: (string | number | symbol)[]) => Promise<void>,
  children: ReactNode,
}) {
  const [updating, setUpdating] = useState(false);
  const dataRef = useLatestRef(data);

  const onUpdateField: OnUpdateField<Data> = async (value, accessor) => {
    try {
      setUpdating(true);
      const data = accessor.set(dataRef.current, value);
      await onUpdate(data, accessor.path);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <GeneralSettingsFormContextProvider value={{ data, readonly, disabled: loading || updating, onUpdateField }}>
      {children}
    </GeneralSettingsFormContextProvider>
  );
}