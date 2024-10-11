import { type Document, listDocumentsFiltersSchema, type ListDocumentsTableFilters } from '@/api/documents';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Table as ReactTable } from '@tanstack/react-table';
import { ChevronDownIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

export function DocumentsTableFilters ({ onFilterChange, datasourceId }: { table: ReactTable<Document>, datasourceId?: number | undefined, onFilterChange: (data: ListDocumentsTableFilters) => void }) {
  const form = useForm({
    resolver: zodResolver(listDocumentsFiltersSchema),
  });

  const onSubmit = form.handleSubmit((data) => {
    onFilterChange?.(data);
  });

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={onSubmit}>
        <FormField
          name="source_uri"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} value={field.value ?? ''} placeholder="Search Source URI..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {datasourceId==null && <FormField
          name="data_source_id"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} value={field.value ?? ''} placeholder="Datasource ID" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />}
        <Collapsible>
          <CollapsibleTrigger className="group text-sm flex items-center py-1.5 hover:underline focus:underline outline-none">
            <ChevronDownIcon className="size-4 mr-1 transition-transform group-data-[state=open]:rotate-180" />
            Advanced Filters
          </CollapsibleTrigger>
          <CollapsibleContent className="py-2 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="created_at_start"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Created After</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="datetime-local" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="created_at_end"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Created Before</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="datetime-local" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="updated_at_start"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Updated After</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="datetime-local" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="updated_at_end"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Updated Before</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="datetime-local" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="last_modified_at_start"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Modified After</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="datetime-local" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="last_modified_at_end"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Modified Before</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="datetime-local" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
        <Button type="submit">Search</Button>
      </form>
    </Form>
  );
}