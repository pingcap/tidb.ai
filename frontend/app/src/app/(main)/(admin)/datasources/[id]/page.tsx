'use client';

import { getDatasource } from '@/api/datasources';
import { AdminPageHeading } from '@/components/admin-page-heading';
import { DateFormat } from '@/components/date-format';
import { OptionDetail } from '@/components/option-detail';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Loader2Icon } from 'lucide-react';
import useSWR from 'swr';

export default function DatasourcePage ({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  const { data: datasource } = useSWR(`api.datasource.get?id=${id}`, () => getDatasource(id));

  return (
    <div className="max-w-screen-md space-y-8">
      <AdminPageHeading
        breadcrumbs={[
          { title: 'Datasources', url: '/datasources' },
          { title: datasource?.name ?? <Loader2Icon className="size-4 animate-spin repeat-infinite" />, url: `/datasources/${id}` },
        ]}
      />
      <div className="space-y-2 text-sm rounded p-4 border">
        <OptionDetail title="ID" value={id} />
        <OptionDetail title="Type" value={datasource?.data_source_type} />
        <OptionDetail title="Name" value={datasource?.name} />
        <OptionDetail title="Description" value={datasource?.description} />
        <OptionDetail title="Created at" value={datasource?.created_at && <DateFormat date={datasource.created_at} />} />
        <OptionDetail title="Updated at" value={datasource?.updated_at && <DateFormat date={datasource.created_at} />} />
        <OptionDetail title="User ID" value={datasource?.user_id} />
        <OptionDetail title="Build KnowledegeGraph Index" value={datasource?.build_kg_index ? 'Yes' : 'No'} valueClassName={datasource?.build_kg_index ? 'text-green-500' : 'text-muted-foreground'} />
      </div>
      <section className='space-y-4'>
        <h3 className='font-medium'>Files</h3>
        {datasource?.data_source_type === 'file' && (
          <div className="flex gap-2 flex-wrap">
            {datasource.config.map(file =>
              <Badge key={file.file_id} variant="secondary" className='gap-1'>
              <span>
                {file.file_name}
              </span>
                <span className="font-normal text-muted-foreground">#{file.file_id}</span>
              </Badge>)}
          </div>
        )}
      </section>
    </div>
  );
}