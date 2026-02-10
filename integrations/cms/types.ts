export interface WixDataItem {
     _id?: string;
     _createdDate?: Date | string;
     _updatedDate?: Date | string;
     [key: string]: any;
}

export interface WixDataQueryResult {
     items: WixDataItem[];
     totalCount: number;
     hasNext: () => boolean;
     hasPrev: () => boolean;
     length: number;
     pageSize: number;
     currentPage: number;
     totalPages: number;
}
