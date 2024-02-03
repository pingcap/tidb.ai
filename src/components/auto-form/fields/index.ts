import { ArrayField } from '@/components/auto-form/fields/array';
import { BooleanField } from '@/components/auto-form/fields/boolean';
import { NumberField } from '@/components/auto-form/fields/number';
import { StringField } from '@/components/auto-form/fields/string';
import type { FieldProps } from '@/components/auto-form/fields/utils';
import type { ComponentType } from 'react';
import type { ZodFirstPartyTypeKind } from 'zod';

export const fieldMaps: { [K in ZodFirstPartyTypeKind]?: ComponentType<FieldProps> } = {
  ZodNumber: NumberField,
  ZodString: StringField,
  ZodBoolean: BooleanField,
  ZodArray: ArrayField,
};
