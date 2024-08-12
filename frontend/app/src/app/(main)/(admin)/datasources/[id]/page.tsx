'use client';

import { getDatasource, getDatasourceOverview } from '@/api/datasources';
import { AdminPageHeading } from '@/components/admin-page-heading';
import { IndexProgressChart } from '@/components/charts/IndexProgressChart';
import { TotalCard } from '@/components/charts/TotalCard';
import { DateFormat } from '@/components/date-format';
import { LlmInfo } from '@/components/llm/LlmInfo';
import { OptionDetail } from '@/components/option-detail';
import { Badge } from '@/components/ui/badge';
import { ArrowRightIcon, FileTextIcon, Loader2Icon, MapPinIcon, PuzzleIcon, RouteIcon } from 'lucide-react';
import Link from 'next/link';
import useSWR from 'swr';

export default function DatasourcePage ({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  const { data: datasource } = useSWR(`api.datasource.${id}`, () => getDatasource(id));
  const { data: progress } = useSWR(`api.datasource.get-overview?id=${id}`, () => getDatasourceOverview(id));

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
        {(datasource?.data_source_type === 'web_sitemap') && (
          <OptionDetail title="URL" value={datasource?.config.url} />
        )}
        {(datasource?.data_source_type === 'web_single_page') && (
          <OptionDetail title="URL" value={<ul>{datasource?.config.urls.map(url => <li key={url}><a className="underline" href={url} target="_blank">{url}</a></li>)}</ul>} />
        )}
        <OptionDetail title="Name" value={datasource?.name} />
        <OptionDetail title="Description" value={datasource?.description} />
        <OptionDetail title="Created at" value={datasource?.created_at && <DateFormat date={datasource.created_at} />} />
        <OptionDetail title="Updated at" value={datasource?.updated_at && <DateFormat date={datasource.created_at} />} />
        <OptionDetail title="User ID" value={datasource?.user_id} />
        <OptionDetail title="LLM" value={<LlmInfo id={datasource?.llm_id} />} />
        <OptionDetail title="Build KnowledegeGraph Index" value={datasource?.build_kg_index ? 'Yes' : 'No'} valueClassName={datasource?.build_kg_index ? 'text-green-500' : 'text-muted-foreground'} />
      </div>
      {progress && (
        <>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <TotalCard
              title="Documents"
              icon={<FileTextIcon className="h-4 w-4 text-muted-foreground" />}
              total={progress.documents.total}
            >
              <Link className="flex gap-2 items-center" href={`/datasources/${params.id}/documents`}>All documents <ArrowRightIcon className="size-3" /></Link>
            </TotalCard>
            <TotalCard title="Chunks" icon={<PuzzleIcon className="h-4 w-4 text-muted-foreground" />} total={progress.chunks.total} />
            {datasource?.build_kg_index && progress.entities && <TotalCard
              title="Entities"
              icon={<MapPinIcon className="h-4 w-4 text-muted-foreground" />}
              total={progress.entities.total}
            >
              <Link className="flex gap-2 items-center" href="/knowledge-graph">Graph Editor <ArrowRightIcon className="size-3" /></Link>
            </TotalCard>}
            {datasource?.build_kg_index && progress.relationships && <TotalCard title="Relationships" icon={<RouteIcon className="h-4 w-4 text-muted-foreground" />} total={progress.relationships.total} />}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <IndexProgressChart title="Vector Index" data={progress.vector_index} />
            {datasource?.build_kg_index && progress.kg_index && <IndexProgressChart title="Knowledge Graph Index" data={progress.kg_index} />}
          </div>
        </>
      )}
      {datasource?.data_source_type === 'file' && <section className="space-y-4">
        <h3 className="font-medium">Files</h3>
        {datasource?.data_source_type === 'file' && (
          <div className="flex gap-2 flex-wrap">
            {datasource.config.map(file =>
              <Badge key={file.file_id} variant="secondary" className="gap-1">
              <span>
                {file.file_name}
              </span>
                <span className="font-normal text-muted-foreground">#{file.file_id}</span>
              </Badge>)}
          </div>
        )}
      </section>}
    </div>
  );
}