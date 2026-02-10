import { v4 as uuidv4 } from 'uuid';

export interface Expense {
     _id: string;
     title: string;
     amount: number;
     date: string; // ISO String
     category: string;
     paymentMethod: string;
     _createdDate: string;
}

export interface UserProfile {
     _id: string;
     contact: {
          firstName: string;
          lastName: string;
          phones: string[];
     };
     profile: {
          nickname: string;
          photo: {
               url: string;
          };
          title: string;
     };
     loginEmail: string;
     loginEmailVerified: boolean;
     status: string;
     _createdDate: string;
     lastLoginDate: string;
}

const STORAGE_KEYS = {
     EXPENSES: 'sf_expenses',
     USER: 'sf_user_profile',
};

const MOCK_USER: UserProfile = {
     _id: 'mock-user-id',
     contact: {
          firstName: 'Demo',
          lastName: 'User',
          phones: ['+1 234 567 8900'],
     },
     profile: {
          nickname: 'DemoUser',
          photo: {
               url: 'https://ui-avatars.com/api/?name=Demo+User&background=random',
          },
          title: 'Pro Member',
     },
     loginEmail: 'demo@smartfinance.app',
     loginEmailVerified: true,
     status: 'Active',
     _createdDate: new Date().toISOString(),
     lastLoginDate: new Date().toISOString(),
};

export const storageService = {
     // --- Expenses ---
     getExpenses: (): Expense[] => {
          try {
               const data = localStorage.getItem(STORAGE_KEYS.EXPENSES);
               return data ? JSON.parse(data) : [];
          } catch (e) {
               console.error('Error reading expenses from storage', e);
               return [];
          }
     },

     addExpense: (expense: Omit<Expense, '_id' | '_createdDate'>): Expense => {
          const expenses = storageService.getExpenses();
          const newExpense: Expense = {
               ...expense,
               _id: uuidv4(),
               _createdDate: new Date().toISOString(),
          };
          const updatedExpenses = [newExpense, ...expenses];
          localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(updatedExpenses));
          return newExpense;
     },

     updateExpense: (id: string, updates: Partial<Expense>): Expense | null => {
          const expenses = storageService.getExpenses();
          const index = expenses.findIndex((e) => e._id === id);
          if (index === -1) return null;

          const updatedExpense = { ...expenses[index], ...updates };
          expenses[index] = updatedExpense;
          localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
          return updatedExpense;
     },

     deleteExpense: (id: string): boolean => {
          const expenses = storageService.getExpenses();
          const filtered = expenses.filter((e) => e._id !== id);
          if (filtered.length === expenses.length) return false;

          localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(filtered));
          return true;
     },

     // --- User ---
     getUser: (): UserProfile => {
          // Ideally we could persist changes to profile, but for now returned fixed mock
          return MOCK_USER;
     }
};
