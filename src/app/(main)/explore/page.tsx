import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { faker } from '@faker-js/faker';
import { DownloadIcon, MoreHorizontalIcon, PlayIcon, SearchIcon, Trash2Icon } from 'lucide-react';

type Shape = {
  id: string
  filename: string
  type: string
  size: number
  loader: string
  splitter: string
  embedded_at: string
}

const columns: { key: keyof Shape, title: string }[] = [
  { key: 'filename', title: 'Filename' },
  { key: 'type', title: 'Type' },
  { key: 'size', title: 'Size' },
  { key: 'loader', title: 'Document Loader' },
  { key: 'splitter', title: 'Text Splitter' },
  { key: 'embedded_at', title: 'Embedded At' },
];

export default function Page () {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Explore all documents</h1>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map(column => <TableHead key={column.key}>{column.title}</TableHead>)}
            <TableCell />
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockData.map(row => (
            <TableRow key={row.id}>
              {columns.map(column => <TableCell key={column.key}>{row[column.key]}</TableCell>)}
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreHorizontalIcon className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent collisionPadding={8}>
                    <DropdownMenuItem className="cursor-pointer flex gap-2 items-center">
                      <SearchIcon className="w-3 h-3" />
                      Query
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer flex gap-2 items-center">
                      <PlayIcon className="w-3 h-3 text-green-400" />
                      Re-run embedding
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer flex gap-2 items-center">
                      <DownloadIcon className="w-3 h-3" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer flex gap-2 items-center text-destructive focus:text-destructive">
                      <Trash2Icon className="w-3 h-3" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

  );
}

faker.seed(1);

const mockData = faker.helpers.uniqueArray((): Shape => ({
  id: faker.string.uuid(),
  filename: faker.system.fileName({ extensionCount: 1 }),
  type: 'pdf',
  size: faker.number.int(),
  embedded_at: '1970-01-01',
  loader: 'NeverLoadLoader',
  splitter: 'NoSplitSplitter',
}), 10);