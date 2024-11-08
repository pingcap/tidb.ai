'use client';

import { AdminPageHeading } from '@/components/admin-page-heading';
import { ConfigViewer } from '@/components/config-viewer';
import { DateFormat } from '@/components/date-format';
import { EmbeddingModelsTable } from '@/components/embedding-models/EmbeddingModelsTable';
import { OptionDetail } from '@/components/option-detail';

export default function EmbeddingModelPage () {

  return (
    <>
      <AdminPageHeading title="Embedding Model" description="Embedding Model is not configurable after setup." />
      <EmbeddingModelsTable />
      {/*<div className="max-w-screen-sm space-y-4">*/}
      {/*  <div className="space-y-2 text-sm rounded p-4 border">*/}
      {/*    <OptionDetail title="ID" value={embeddingModel.id} />*/}
      {/*    <OptionDetail title="Name" value={embeddingModel.name} />*/}
      {/*    <OptionDetail title="Provider" value={embeddingModel.provider} />*/}
      {/*    <OptionDetail title="Model" value={embeddingModel.model} />*/}
      {/*    <OptionDetail title="Config" value={embeddingModel.config && <ConfigViewer value={embeddingModel.config}></ConfigViewer>} />*/}
      {/*    <OptionDetail title="Created At" value={<DateFormat date={embeddingModel.created_at} />} />*/}
      {/*    <OptionDetail title="Updated At" value={<DateFormat date={embeddingModel.updated_at} />} />*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>
  );
}
