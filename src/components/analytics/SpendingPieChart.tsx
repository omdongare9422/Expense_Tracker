import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CategoryData } from '@/lib/analytics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SpendingPieChartProps {
     data: CategoryData[];
}

export function SpendingPieChart({ data }: SpendingPieChartProps) {
     return (
          <Card className="col-span-1">
               <CardHeader>
                    <CardTitle>Spending by Category</CardTitle>
               </CardHeader>
               <CardContent className="h-[300px]">
                    {data.length > 0 ? (
                         <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                   <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                   >
                                        {data.map((entry, index) => (
                                             <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                   </Pie>
                                   <Tooltip
                                        formatter={(value: number) => `$${value.toFixed(2)}`}
                                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                                   />
                                   <Legend />
                              </PieChart>
                         </ResponsiveContainer>
                    ) : (
                         <div className="flex h-full items-center justify-center text-muted-foreground">
                              No data available
                         </div>
                    )}
               </CardContent>
          </Card>
     );
}
