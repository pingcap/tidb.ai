import { type DatasourceType, isDatasourceType } from '@/components/datasource/types';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface DatasourceTypeTabsProps {
  className?: string;
  type?: DatasourceType;
  onTypeChange?: (value: DatasourceType) => void;
}

export function DatasourceTypeTabs ({ className, type, onTypeChange }: DatasourceTypeTabsProps) {
  return (
    <Tabs className={className} value={type} onValueChange={value => {
      isDatasourceType(value) && onTypeChange?.(value);
    }}>
      <TabsList>
        <TabsTrigger value="file">
          File
        </TabsTrigger>
        <TabsTrigger value="web-single-page">
          Web Single Page
        </TabsTrigger>
        <TabsTrigger value="web-sitemap">
          Web Sitemap
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
