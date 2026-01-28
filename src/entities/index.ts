/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: expenses
 * Interface for Expenses
 */
export interface Expenses {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType number */
  amount?: number;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType date */
  date?: Date | string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  paymentMethod?: string;
}
