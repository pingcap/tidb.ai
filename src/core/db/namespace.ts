import {Namespace} from "@/core/db/schema";
import {db} from "@/core/db/db";

export interface NamespaceDb {

  listNamespaces(): Promise<Namespace[]>;

  getNamespaceIdsByNames(names: string[]): Promise<number[]>;

}

export const namespaceDb: NamespaceDb = {

  async listNamespaces() {
    return await db.selectFrom('namespace')
      .selectAll()
      .execute();
  },

  async getNamespaceIdsByNames(names: string[]) {
    if (names.length === 0) {
      return [];
    }
    const namespaces = await db.selectFrom('namespace')
      .select(['id'])
      .where('name', 'in', names)
      .execute()
    return namespaces.map(n => n.id);
  }

};
