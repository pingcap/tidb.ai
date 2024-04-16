import { getDb } from '@/core/db';
import { cache } from 'react';

type WizardState = {
  enabled_indexes: number
  enabled_chat_engines: number
  sources: number
}

export const getSiteWizardState = cache(async () => {
  const { stats: state } = await getDb()
    .with('cte_enabled_indexes', qc =>
      qc.selectFrom('index')
        .select(eb => eb.val('enabled_indexes').as('name'))
        .select(eb => eb.fn.countAll<number>().as('count'))
        .where('configured', '=', 1))
    .with('cte_enabled_chat_engines', qc =>
      qc.selectFrom('chat_engine')
        .select(eb => eb.val('enabled_chat_engines').as('name'))
        .select(eb => eb.fn.countAll<number>().as('count'))
        .where('is_default', '=', 1))
    .with('cte_sources', qc =>
      qc.selectFrom('source')
        .select(eb => eb.val('sources').as('name'))
        .select(eb => eb.fn.countAll<number>().as('count')))
    .with('cte_list', qc =>
      qc.selectFrom('cte_enabled_indexes').selectAll()
        .union(eb => eb.selectFrom('cte_enabled_chat_engines').selectAll())
        .union(eb => eb.selectFrom('cte_sources').selectAll()))
    .selectFrom('cte_list')
    .select(eb => eb.fn<WizardState>('JSON_OBJECTAGG', ['name', 'count']).as('stats'))
    .executeTakeFirstOrThrow();

  return state;
});