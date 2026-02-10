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
  title: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
  paymentMethod: string;
}
