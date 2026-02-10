import { storageService, Expense } from "@/services/storage";

// Keep types compatible with existing code
export interface PaginationOptions {
  limit?: number;
  skip?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  hasNext: boolean;
  currentPage: number;
  pageSize: number;
  nextSkip: number | null;
}

export class BaseCrudService {
  static async getAll<T>(
    collectionId: string,
    _includeRefs?: any,
    pagination?: PaginationOptions
  ): Promise<PaginatedResult<T>> {
    // Only support 'expenses' collection for local storage MVP
    if (collectionId === 'expenses') {
      const allItems = storageService.getExpenses() as unknown as T[];
      const limit = pagination?.limit ?? 50;
      const skip = pagination?.skip ?? 0;

      // Mock pagination
      const items = allItems.slice(skip, skip + limit);
      const totalCount = allItems.length;
      const hasNext = skip + limit < totalCount;

      return {
        items,
        totalCount,
        hasNext,
        currentPage: Math.floor(skip / limit),
        pageSize: limit,
        nextSkip: hasNext ? skip + limit : null,
      }
    }

    return {
      items: [],
      totalCount: 0,
      hasNext: false,
      currentPage: 0,
      pageSize: 0,
      nextSkip: null,
    };
  }

  static async getById<T>(
    collectionId: string,
    itemId: string,
    _includeRefs?: any
  ): Promise<T | null> {
    if (collectionId === 'expenses') {
      const items = storageService.getExpenses();
      const item = items.find(i => i._id === itemId);
      return (item as unknown as T) || null;
    }
    return null;
  }

  static async create<T>(
    collectionId: string,
    itemData: any,
    _multiReferences?: any
  ): Promise<T> {
    if (collectionId === 'expenses') {
      return storageService.addExpense(itemData) as unknown as T;
    }
    throw new Error(`Collection ${collectionId} not supported in local mode`);
  }

  static async update<T>(collectionId: string, itemData: any): Promise<T> {
    if (collectionId === 'expenses' && itemData._id) {
      const { _id, ...updates } = itemData;
      const updated = storageService.updateExpense(_id, updates);
      if (updated) return updated as unknown as T;
    }
    throw new Error(`Failed to update item in ${collectionId}`);
  }

  static async delete<T>(collectionId: string, itemId: string): Promise<T> {
    if (collectionId === 'expenses') {
      const success = storageService.deleteExpense(itemId);
      if (success) return ({ _id: itemId } as unknown as T);
    }
    throw new Error(`Failed to delete item from ${collectionId}`);
  }

  // Stubs for reference methods
  static async addReferences() { }
  static async removeReferences() { }
}
