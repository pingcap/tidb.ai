// import { type Entity, handleServerEntity, type ServerEntity } from '@/components/graph/api';
// import type { RemoteEntity } from '@/components/graph/components/EntitiesTable';
// import { fetcher, handleErrors } from '@/lib/fetch';
// import { type ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
// import { type RowSelectionState } from '@tanstack/table-core';
// import { type Dispatch, type MutableRefObject, type SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
// import useSWR from 'swr';
//
// export type SearchEntityFilter = {
//   query: string;
//   top_k?: number
// }
//
// function shouldFetch (filter: SearchEntityFilter) {
//   return !!filter.query.trim();
// }
//
// export type UseEntitiesRequired = Pick<ReturnType<typeof useEntities>, 'selectedEntities' | 'rowSelection' | 'setRowSelection' | 'entityMap'>
//
// export function useEntities () {
//   const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
//   const entityMap = useRef<Map<string, Entity>>(undefined as never);
//   if (!entityMap.current) {
//     entityMap.current = new Map<string, Entity>();
//   }
//
//   const selectedEntities = useMemo(() => {
//     return Object.keys(rowSelection).map(id => entityMap.current.get(id)).filter(Boolean) as Entity[];
//   }, [rowSelection]);
//
//   const clearSelection = (id?: number) => {
//     if (id == null) {
//       setRowSelection({});
//     } else {
//       setRowSelection(selection => {
//         const idStr = String(id);
//         if (idStr in selection) {
//           selection = { ...selection };
//           delete selection[idStr];
//         }
//
//         return selection;
//       });
//     }
//   };
//
//   return {
//     selectedEntities,
//     rowSelection,
//     setRowSelection,
//     clearSelection,
//     entityMap,
//   };
// }
//
// export function useGraphEntitiesTable ({ rowSelection, setRowSelection, entityMap, columns }: { rowSelection: RowSelectionState, setRowSelection: Dispatch<SetStateAction<RowSelectionState>>, entityMap: MutableRefObject<Map<string, RemoteEntity>>, columns: ColumnDef<RemoteEntity, any>[] }) {
//   const [filter, setFilter] = useState<SearchEntityFilter>(() => ({ query: '', top_k: undefined }));
//
//   const { data, isLoading, error } = useSWR(shouldFetch(filter) && ['get', '/api/v1/indexes/graph/entities/search', filter], fetcher<ServerEntity[]>, {
//     revalidateOnFocus: false,
//   });
//
//   const entities = useMemo(() => {
//     if (data) {
//       return data.map(serverEntity => {
//         const entity = handleServerEntity(serverEntity);
//         entityMap.current.set(String(entity.id), entity);
//         return entity;
//       });
//     } else {
//       return [];
//     }
//   }, [data]);
//
//   const table = useReactTable<RemoteEntity>({
//     data: entities,
//     getRowId: row => String(row.id),
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     enableRowSelection: true,
//     enableMultiRowSelection: true,
//     state: {
//       rowSelection,
//     },
//     onRowSelectionChange: setRowSelection,
//   });
//
//   return {
//     table,
//     filter,
//     setFilter,
//     isLoading,
//     error,
//   };
// }
//
// export function useGraphEntitiesByIdsTable ({ rowSelection, setRowSelection, entityMap, columns }: { rowSelection: RowSelectionState, setRowSelection: Dispatch<SetStateAction<RowSelectionState>>, entityMap: MutableRefObject<Map<string, RemoteEntity>>, columns: ColumnDef<RemoteEntity, any>[] }) {
//   const [ids, setIds] = useState<number[]>([]);
//   const [data, setData] = useState<RemoteEntity[]>([]);
//   const promisesRef = useRef<Record<string, Promise<void>>>({});
//   const [failed, setFailed] = useState<Record<string, unknown>>({});
//   const idsRef = useRef(ids);
//
//   useEffect(() => {
//     idsRef.current = ids;
//   });
//
//   useEffect(() => {
//     for (const id of ids) {
//       let entity = entityMap.current.get(String(id));
//       if (!entity) {
//         if (!promisesRef.current[String(id)]) {
//           promisesRef.current[String(id)] = fetch(`/api/v1/indexes/graph/entities/${id}`)
//             .then(handleErrors)
//             .then(res => res.json())
//             .then(handleServerEntity)
//             .then(
//               entity => {
//                 entityMap.current.set(String(entity.id), entity);
//                 updateData();
//               },
//               error => {
//                 entityMap.current.set(String(id), {
//                   id: id,
//                   isLoading: false,
//                   error,
//                 });
//                 setFailed(failed => ({
//                   ...failed,
//                   [String(id)]: error,
//                 }));
//                 updateData();
//               },
//             );
//         }
//       }
//     }
//     updateData();
//   }, [ids]);
//
//   const updateData = () => {
//     setData(idsRef.current.map(id => {
//       const entity = entityMap.current.get(String(id));
//       if (!entity) {
//         return { id, isLoading: true };
//       } else {
//         return entity;
//       }
//     }));
//   };
//
//   const table = useReactTable<RemoteEntity>({
//     data,
//     getRowId: row => String(row.id),
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     enableRowSelection: true,
//     enableMultiRowSelection: true,
//     state: {
//       rowSelection,
//     },
//     onRowSelectionChange: setRowSelection,
//   });
//
//   return {
//     table,
//     ids,
//     setIds,
//     failed,
//   };
// }
//
//
//
//
