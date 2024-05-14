"use client"

import {DataTableViewOptions} from "@/app/(main)/(admin)/documents/components/data-table-view-options";
import {ImportDocumentsDialog} from "@/app/(main)/(admin)/documents/components/dialogs/import-documents-dialog";
import {BuildDocumentIndexDialog} from "@/app/(main)/(admin)/documents/components/dialogs/build-document-index-dialog";
import { Cross2Icon } from "@radix-ui/react-icons"
import {Row, Table} from "@tanstack/react-table"
import type {Document} from "@/core/repositories/document";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {useState} from "react";

interface DataTableToolbarProps {
  table: Table<Document>
}

const documentMap = new Map<string, Row<Document>>();

export function DataTableToolbar({ table }: DataTableToolbarProps) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const selectedRowIds = Object.keys(table.getState().rowSelection);
  const nSelectedRows = selectedRowIds.length;
  const isSelected = nSelectedRows > 0;

  const documentRows = table.getSelectedRowModel().rows;
  for (let documentRow of documentRows) {
    documentMap.set(documentRow.id, documentRow)
  }

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter documents..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event: { target: { value: any } }) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex flex-1 items-center space-x-2">
        <DataTableViewOptions table={table} />
        <ImportDocumentsDialog trigger={<Button size="sm">Import documents</Button>}/>
        {
          isSelected && (
            <BuildDocumentIndexDialog
              documentRows={selectedRowIds.map(id => documentMap.get(id) as Row<Document>)}
              open={dialogOpen}
              handleOpenChange={setDialogOpen}
              trigger={
                <Button size="sm">Build Indexes ({nSelectedRows})</Button>
              }
            />
          )
        }
      </div>
    </div>
  )
}
