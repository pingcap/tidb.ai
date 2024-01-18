'use client';

import { Card } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';

export default function Page () {
  const form = useForm();

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-8 p-4 space-y-8">
        <section className="space-y-4">
          <h6 className="text-lg text-foreground/50">
            Choose your importing source
          </h6>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-8 font-semibold">
              Upload File
            </Card>
            <Card className="p-8 font-semibold">
              Import from S3
            </Card>
            <Card className="p-8 font-semibold">
              Import from URL List
            </Card>
          </div>
        </section>
        <section className="space-y-4">
          <h6 className="text-lg text-foreground/50 mb-4">
            Or configure auto-importing source
          </h6>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-8 font-semibold">
              Setup API upload endpoint
            </Card>
            <Card className="p-8 font-semibold">
              ...
            </Card>
          </div>
        </section>
      </div>
      <div className="col-span-4 p-4">
        <Form {...form}>
          <form className="space-y-6">
            <fieldset>
              <h6 className="text-lg text-foreground/50 font-semibold">Basic Settings</h6>
              <div className="flex justify-between items-center">
                <Label>
                  Cache Embedding Results
                </Label>
                <Switch defaultChecked />
              </div>
            </fieldset>
            <fieldset className="space-y-2">
              <h6 className="text-lg text-foreground/50 font-semibold">Document loader</h6>
              <Select defaultValue={documentLoaders[0]}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {documentLoaders.map(type => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </fieldset>
            <fieldset className="space-y-2">
              <h6 className="text-lg text-foreground/50 font-semibold">Text splitter</h6>

              <div>
                <Label>Split method</Label>
                <Select defaultValue={splitterTypes[0]}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {splitterTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </fieldset>

          </form>
        </Form>
      </div>
    </div>
  );
}

const documentLoaders = [
  'Automatic',
  'CSV',
  'Zip',
  'HTML',
  'JSON',
  'Markdown',
  'PDF',
  'Text',
];

const splitterTypes = [
  'HTMLHeaderTextSplitter',
  'Split by character',
  'Split code',
  'MarkdownHeaderTextSplitter',
  'Recursively split by character',
  'Semantic Chunking',
  'Split by tokens',
];
