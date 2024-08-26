'use client';

import { type DatasourceKgIndexError, type DatasourceVectorIndexError, listDatasourceKgIndexErrors, listDatasourceVectorIndexErrors, retryDatasourceAllFailedTasks } from '@/api/datasources';
import { link } from '@/components/cells/link';
import { IndexProgressChart } from '@/components/charts/IndexProgressChart';
import { TotalCard } from '@/components/charts/TotalCard';
import { DangerousActionButton } from '@/components/dangerous-action-button';
import { DataTableRemote } from '@/components/data-table-remote';
import { useDatasource, useDatasourceProgress } from '@/components/datasource/hooks';
import { DateFormat } from '@/components/date-format';
import { LlmInfo } from '@/components/llm/LlmInfo';
import { OptionDetail } from '@/components/option-detail';
import { Badge } from '@/components/ui/badge';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import { ArrowRightIcon, FileTextIcon, MapPinIcon, PuzzleIcon, RouteIcon } from 'lucide-react';
import Link from 'next/link';

export function DatasourceDetails ({ id }: { id: number }) {
  return (
    <>
      <DatasourceFields id={id} />
      <DatasourceProgress id={id} />
      <DatasourceIndexErrors id={id} />
      <DatasourceUploadFiles id={id} />
    </>
  );
}

function DatasourceFields ({ id }: { id: number }) {
  const { datasource } = useDatasource(id);
  return (
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
  );
}

function DatasourceProgress ({ id }: { id: number }) {
  const { datasource } = useDatasource(id);
  const { progress } = useDatasourceProgress(id);

  if (!progress) {
    return null;
  }

  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        <TotalCard
          title="Documents"
          icon={<FileTextIcon className="h-4 w-4 text-muted-foreground" />}
          total={progress.documents.total}
        >
          <Link className="flex gap-2 items-center" href={`/datasources/${id}/documents`}>All documents <ArrowRightIcon className="size-3" /></Link>
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
  );
}

function DatasourceUploadFiles ({ id }: { id: number }) {
  const { datasource } = useDatasource(id);

  if (datasource?.data_source_type !== 'file' || datasource.config.length === 0) {
    return null;
  }
  return (
    <section className="space-y-4">
      <h3 className="font-medium">Files</h3>
      <div className="flex gap-2 flex-wrap">
        {datasource.config.map(file => (
          <Badge key={file.file_id} variant="secondary" className="gap-1">
            <span>
              {file.file_name}
            </span>
            <span className="font-normal text-muted-foreground">#{file.file_id}</span>
          </Badge>
        ))}
      </div>
    </section>
  );
}

function DatasourceIndexErrors ({ id }: { id: number }) {
  const { progress, mutate } = useDatasourceProgress(id);

  if (!progress) {
    return null;
  }
  const showVectorIndexErrors = !!progress.vector_index.failed;
  const showKgIndexErrors = !!progress.kg_index?.failed;

  if (!showVectorIndexErrors && !showKgIndexErrors) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h3>Index Errors</h3>
      <Tabs defaultValue={showVectorIndexErrors ? 'vector-index-errors' : 'kg-index-errors'}>
        <div className="flex items-center">
          <TabsList>
            {showVectorIndexErrors && <TabsTrigger value="vector-index-errors">
              Vector Index
            </TabsTrigger>}
            {showKgIndexErrors && <TabsTrigger value="kg-index-errors">
              KnowledgeGraph Index
            </TabsTrigger>}
          </TabsList>
          <DangerousActionButton
            className="ml-auto"
            action={async () => {
              await retryDatasourceAllFailedTasks(id);
              await mutate(undefined, { revalidate: true });
            }}
            dialogTitle="Retry failed tasks"
            dialogDescription="Are you sure to retry all failed tasks?"
          >
            Retry failed tasks
          </DangerousActionButton>

        </div>
        {showVectorIndexErrors && <TabsContent value="vector-index-errors">
          <DatasourceVectorIndexErrorsTable id={id} />
        </TabsContent>}
        {showKgIndexErrors && <TabsContent value="kg-index-errors">
          <DatasourceKgIndexErrorsTable id={id} />
        </TabsContent>}
      </Tabs>
    </section>
  );
}

function DatasourceVectorIndexErrorsTable ({ id }: { id: number }) {
  return (
    <DataTableRemote<DatasourceVectorIndexError, any>
      api={(params) => listDatasourceVectorIndexErrors(id, params)}
      apiKey={`datasources.${id}.vector-index-errors`}
      columns={vectorIndexErrorsColumns}
      idColumn="document_id"
    />
  );
}

function DatasourceKgIndexErrorsTable ({ id }: { id: number }) {
  return (
    <DataTableRemote<DatasourceKgIndexError, any>
      api={(params) => listDatasourceKgIndexErrors(id, params)}
      apiKey={`datasources.${id}.kg-index-errors`}
      columns={kgIndexErrorsColumns}
      idColumn="chunk_id"
    />
  );
}

const vectorIndexErrorsHelper = createColumnHelper<DatasourceVectorIndexError>();
const vectorIndexErrorsColumns: ColumnDef<DatasourceVectorIndexError, any>[] = [
  vectorIndexErrorsHelper.display({
    header: 'Document', cell: ({ row }) => (
      <>
        {row.original.document_name}
        {' '}
        <span className="text-muted-foreground">#{row.original.document_id}</span>
      </>
    ),
  }),
  vectorIndexErrorsHelper.accessor('source_uri', { header: 'Source URI', cell: link({ url: row => row.source_uri, text: row => row.source_uri }) }),
  vectorIndexErrorsHelper.accessor('error', {
    cell: ({ getValue }) => <ErrorPopper>{getValue()}</ErrorPopper>,
  }),
];

const kgIndexErrorsHelper = createColumnHelper<DatasourceKgIndexError>();
const kgIndexErrorsColumns: ColumnDef<DatasourceKgIndexError, any>[] = [
  kgIndexErrorsHelper.accessor('source_uri', { header: 'Source URI', cell: link({ url: row => row.source_uri, text: row => row.source_uri }) }),
  kgIndexErrorsHelper.accessor('chunk_id', {}),
  kgIndexErrorsHelper.accessor('error', {
    cell: ({ getValue }) => <ErrorPopper>{getValue()}</ErrorPopper>,
  }),
];

function ErrorPopper ({ children }: { children: string }) {
  if (children.length <= 50) {
    return children;
  }

  const shortcut = children.slice(0, 25);

  return (
    <HoverCard>
      <HoverCardTrigger>
        {shortcut}... <span className="text-muted-foreground">({children.length + ' characters'})</span>
      </HoverCardTrigger>
      <HoverCardContent className="w-96 h-48">
        <div className="size-full overflow-scroll">
          <pre className="whitespace-pre">{children}</pre>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}