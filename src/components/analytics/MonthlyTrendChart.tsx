import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MonthlyData } from '@/lib/analytics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MonthlyTrendChartProps {
     data: MonthlyData[];
}

export function MonthlyTrendChart({ data }: MonthlyTrendChartProps) {
     return (
          <Card className="col-span-1 lg:col-span-2">
               <CardHeader>
                    <CardTitle>Monthly Spending Trend</CardTitle>
               </CardHeader>
               <CardContent className="h-[300px]">
                    {data.length > 0 ? (
                         <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                   data={data}
                                   margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                   }}
                              >
                                   <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                   <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                   <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `$${value}`}
                                   />
                                   <Tooltip
                                        formatter={(value: number) => [`$${value.toFixed(2)}`, 'Spent']}
                                        cursor={{ fill: 'hsl(var(--muted)/0.4)' }}
                                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                                   />
                                   <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                              </BarChart>
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
