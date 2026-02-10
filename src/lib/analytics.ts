import { Expenses } from "@/entities";
import { startOfMonth, endOfMonth, eachMonthOfInterval, format, subMonths, isSameMonth } from "date-fns";

export interface CategoryData {
     name: string;
     value: number;
     color: string;
}

export interface MonthlyData {
     name: string;
     amount: number;
}

const COLORS = ['#6366f1', '#8b5cf6', '#d946ef', '#f43f5e', '#f97316', '#eab308', '#22c55e', '#06b6d4'];

export function getExpensesByCategory(expenses: Expenses[]): CategoryData[] {
     const categoryMap = new Map<string, number>();

     expenses.forEach(expense => {
          const current = categoryMap.get(expense.category) || 0;
          categoryMap.set(expense.category, current + (expense.amount || 0));
     });

     return Array.from(categoryMap.entries())
          .map(([name, value], index) => ({
               name,
               value,
               color: COLORS[index % COLORS.length]
          }))
          .sort((a, b) => b.value - a.value); // Sort by highest spend
}

export function getMonthlySpending(expenses: Expenses[]): MonthlyData[] {
     const today = new Date();
     const start = subMonths(today, 5); // Last 6 months

     const months = eachMonthOfInterval({
          start: start,
          end: today
     });

     return months.map(month => {
          const monthExpenses = expenses.filter(expense => {
               const expenseDate = new Date(expense.date);
               return isSameMonth(expenseDate, month);
          });

          const total = monthExpenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);

          return {
               name: format(month, 'MMM'),
               amount: total
          };
     });
}

export function getDetailedStats(expenses: Expenses[]) {
     const totalSpent = expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);
     const averageTransaction = expenses.length > 0 ? totalSpent / expenses.length : 0;

     // Calculate trend (vs last month)
     const today = new Date();
     const thisMonth = expenses.filter(e => isSameMonth(new Date(e.date), today));
     const lastMonth = expenses.filter(e => isSameMonth(new Date(e.date), subMonths(today, 1)));

     const thisMonthTotal = thisMonth.reduce((sum, e) => sum + (e.amount || 0), 0);
     const lastMonthTotal = lastMonth.reduce((sum, e) => sum + (e.amount || 0), 0);

     let trendPercentage = 0;
     if (lastMonthTotal > 0) {
          trendPercentage = ((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;
     } else if (thisMonthTotal > 0) {
          trendPercentage = 100;
     }

     return {
          totalSpent,
          averageTransaction,
          thisMonthTotal,
          trendPercentage: trendPercentage.toFixed(1)
     };
}
