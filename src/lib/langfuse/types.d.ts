
export type LangfuseDatasetsResponse = {
  data: {
    id: string
    name: string
    description: string | null
    items: string[]
    runs: string[]
    createdAt: string
    updatedAt: string
  }[]
}