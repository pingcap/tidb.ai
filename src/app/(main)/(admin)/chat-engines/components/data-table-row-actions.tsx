"use client"

import { UpdateChatEngineDialog } from "@/app/(main)/(admin)/chat-engines/components/update-chat-engine-dialog";
import type { ChatEngine } from "@/core/repositories/chat_engine";
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useState} from "react";


interface DataTableRowActionsProps {
  row: Row<ChatEngine>
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onSelect={() => setDialogOpen(true)}>Update config</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateChatEngineDialog
        trigger={null}
        open={dialogOpen}
        handleOpenChange={setDialogOpen}
        chatEngineId={Number(row.original.id)}
        defaultValues={row.original}/>
    </>
  )
}
