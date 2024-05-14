import {DataTableColumnHeader} from "@/app/(main)/(admin)/documents/components/data-table-column-header";
import {DataTableRowActions} from "@/app/(main)/(admin)/documents/components/data-table-row-actions";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import type {Document} from "@/core/repositories/document";
import type {CellContext, ColumnDef} from "@tanstack/react-table";
import {createColumnHelper} from "@tanstack/table-core";
import {format} from "date-fns";
import {GithubIcon} from "lucide-react";

const helper = createColumnHelper<Document>();

const mono = (cell: CellContext<any, any>) => <span className="font-mono">{cell.getValue()}</span>;

const datetime = (cell: CellContext<any, any>) => <time>{format(cell.getValue(), 'yyyy-MM-dd HH:mm')}</time>;

const GITHUB_PAGE_URL_REGEXP = /^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)(?:\/blob\/([^/]+))?/;

export const columns = [
  helper.accessor('id', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="id" />
    ),
    cell: mono,
    enableSorting: true,
  }),
  helper.accessor('name', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="name" />
    ),
    cell: (cell: CellContext<any, any>) => <div className="flex space-x-2">
      <span className="max-w-[500px] truncate font-medium">{cell.getValue()}</span>
    </div>,
    enableSorting: true
  }),
  helper.accessor('mime', {cell: mono}),
  helper.accessor('source_uri', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="source_uri" />
    ),
    cell: (cell: CellContext<any, any>) => {
      const value = cell.getValue();

      const matched = GITHUB_PAGE_URL_REGEXP.exec(value);
      if (matched) {
        const [, owner, repo, branch] = matched;
        return (
          <Tooltip>
            <TooltipTrigger asChild>
              <a href={value} target="_blank" className="flex items-center">
                <GithubIcon size="1em" className="mr-1"/>
                <span>{owner}</span>
                /
                <span>{repo}</span>
                {branch && <>/<span>{branch}</span></>}
              </a>
            </TooltipTrigger>
            <TooltipContent className="text-xs">
              {value}
            </TooltipContent>
          </Tooltip>
        );
      }

      return <div className="flex space-x-2">
        <span className="max-w-[300px] truncate font-medium">{cell.getValue()}</span>
      </div>;
    },
    enableSorting: true
  }),
  helper.accessor('hash', {
    cell: (cell: CellContext<any, any>) => <span className="font-mono">
      {
        cell.getValue() ?
        cell.getValue().substring(0, 6) :
        'N/A'
      }
    </span>
  }),
  helper.accessor('created_at', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="created_at" />
    ),
    cell: datetime,
    enableSorting: true
  }),
  helper.accessor('last_modified_at', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="last_modified_at" />
    ),
    cell: datetime,
    enableSorting: true,
  }),
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
] as ColumnDef<Document>[];