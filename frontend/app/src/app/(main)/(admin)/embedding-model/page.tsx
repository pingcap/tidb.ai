'use client';

import { getEmbeddingModel } from '@/api/embedding-model';
import { AdminPageHeading } from '@/components/admin-page-heading';
import { ConfigViewer } from '@/components/config-viewer';
import { DateFormat } from '@/components/date-format';
import { OptionDetail } from '@/components/option-detail';
import { Loader2Icon } from 'lucide-react';
import useSWR from 'swr';

export default function EmbeddingModelPage () {
  const { data: embeddingModel, isLoading } = useSWR('api.embedding-models.get', () => getEmbeddingModel());

  if (isLoading) {
    return <>
      <AdminPageHeading title="Embedding Model" />
      <Loader2Icon className="animate-spin repeat-infinite size-4" />
    </>;
  }

  if (!embeddingModel) {
    return (
      <>
        <AdminPageHeading title="Embedding Model" />
        <div className="p-8 bg-accent text-accent-foreground rounded-lg">
          Embedding Model not configured.
        </div>
      </>
    );
  }

  return (
    <>
      <AdminPageHeading title="Embedding Model" description="Embedding Model is not configurable after setup." />
      <div className="max-w-screen-sm space-y-4">
        <div className="space-y-2 text-sm rounded p-4 border">
          <OptionDetail title="ID" value={embeddingModel.id} />
          <OptionDetail title="Name" value={embeddingModel.name} />
          <OptionDetail title="Provider" value={embeddingModel.provider} />
          <OptionDetail title="Model" value={embeddingModel.model} />
          <OptionDetail title="Config" value={embeddingModel.config && <ConfigViewer value={embeddingModel.config}></ConfigViewer>} />
          <OptionDetail title="Created At" value={<DateFormat date={embeddingModel.created_at} />} />
          <OptionDetail title="Updated At" value={<DateFormat date={embeddingModel.updated_at} />} />
        </div>
      </div>
    </>
  );
}
