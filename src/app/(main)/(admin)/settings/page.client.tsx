'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSettings } from "@/hooks";
import {Textarea} from "@/components/ui/textarea";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {WebsiteSettingUpdatePayload} from "@/core/schema/setting";
import {useContext, useEffect} from "react";
import {ImageUploader} from "@/components/image-uploader";
import {LanguageSelector} from "@/components/language-selector";
import {useToast} from "@/components/ui/use-toast";
import {Loader2} from "lucide-react";
import {WebsiteSettingContext} from "@/components/website-setting-provider";
import {useSWRConfig} from "swr";

const tabs = [
  'Customization',
  'Integrations',
  'Sources',
  'Tasks',
  'LLM',
  'Prompts',
];

function useSettingsForm() {
  const settings = useSettings();
  const form = useForm<z.infer<typeof WebsiteSettingUpdatePayload>>({
    resolver: zodResolver(WebsiteSettingUpdatePayload),
  });

  useEffect(() => {
    form.reset(settings);
  }, [settings]);

  return form;
}
export default function SettingsPage () {
  const form = useSettingsForm();
  const { toast } = useToast();
  const { mutate } = useSWRConfig()

  async function onSubmit(data: z.infer<typeof WebsiteSettingUpdatePayload>) {
    const res = await fetch('/api/v1/settings', {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        group: 'website',
        settings: data
      })
    });

    if (res.ok) {
      await mutate(['GET', '/api/v1/settings?group=website'])
    } else {
      toast({
        variant: "destructive",
        description: "Failed to update settings, please check the form and try again.",
      })
    }
  }

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Site settings</h1>
      <nav>
        <ul className="flex gap-2 items-center">
          {tabs.map((tab, index) => (
            <Button className="rounded-full" key={tab} variant={index > 0 ? 'ghost' : 'secondary'}>
              {tab}
            </Button>
          ))}
        </ul>
      </nav>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} onChange={(e) => {
          console.log(e)
        }} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            disabled={form.formState.isSubmitting}
            name="title"
            render={({ field }) => (
              <FormItem >
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="tidb.ai"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <div className={'w-1/2'}>
              <FormField
                control={form.control}
                disabled={form.formState.isSubmitting}
                name="logo_in_light_mode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LOGO (Light mode)</FormLabel>
                    <FormControl>
                      <ImageUploader mode="light" {...field}/>
                    </FormControl>
                    <FormDescription>
                      PNG, JPG, GIF up to 2MB
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className={'w-1/2'}>
              <FormField
                control={form.control}
                disabled={form.formState.isSubmitting}
                name="logo_in_dark_mode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LOGO (Dark mode)</FormLabel>
                    <FormControl>
                      <ImageUploader mode="dark" {...field}/>
                    </FormControl>
                    <FormDescription>
                      PNG, JPG, GIF up to 2MB
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            disabled={form.formState.isSubmitting}
            name="language"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Language</FormLabel>
                <LanguageSelector controlForm={form} {...field} />
                <FormDescription>
                  This is the language that will be used in the interface.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            disabled={form.formState.isSubmitting}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="The description of the application."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {
              form.formState.isSubmitting &&
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            }
            Update preferences
          </Button>
        </form>
      </Form>
    </>
  );
}