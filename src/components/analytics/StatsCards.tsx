import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, CreditCard, TrendingUp, Wallet } from 'lucide-react';

interface StatsProps {
     totalSpent: number;
     averageTransaction: number;
     thisMonthTotal: number;
     trendPercentage: string;
}

export function StatsCards({ totalSpent, averageTransaction, thisMonthTotal, trendPercentage }: StatsProps) {
     const trend = parseFloat(trendPercentage);
     const trendColor = trend > 0 ? 'text-red-500' : 'text-green-500'; // Spending more is usually "bad" in expense tracking context, but neutral here.
     // Actually, let's keep it neutral or use red for increase (bad), green for decrease (good) if we had budget context.
     // For now, let's just show the change.

     return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
               <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                         <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                         <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                         <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
                         <p className="text-xs text-muted-foreground">Lifetime spend</p>
                    </CardContent>
               </Card>

               <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                         <CardTitle className="text-sm font-medium">Monthly Spend</CardTitle>
                         <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                         <div className="text-2xl font-bold">${thisMonthTotal.toFixed(2)}</div>
                         <p className="text-xs text-muted-foreground">
                              {trend > 0 ? '+' : ''}{trendPercentage}% from last month
                         </p>
                    </CardContent>
               </Card>

               <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                         <CardTitle className="text-sm font-medium">Avg. Transaction</CardTitle>
                         <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                         <div className="text-2xl font-bold">${averageTransaction.toFixed(2)}</div>
                         <p className="text-xs text-muted-foreground">Per expense</p>
                    </CardContent>
               </Card>

               <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                         <CardTitle className="text-sm font-medium">Budget Status</CardTitle>
                         <Wallet className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                         <div className="text-2xl font-bold">On Track</div>
                         <p className="text-xs text-muted-foreground">Based on typical spending</p>
                    </CardContent>
               </Card>
          </div>
     );
}

function CalendarIcon(props: any) {
     return (
          <svg
               {...props}
               xmlns="http://www.w3.org/2000/svg"
               width="24"
               height="24"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
               strokeLinecap="round"
               strokeLinejoin="round"
          >
               <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
               <line x1="16" x2="16" y1="2" y2="6" />
               <line x1="8" x2="8" y1="2" y2="6" />
               <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
     )
}
