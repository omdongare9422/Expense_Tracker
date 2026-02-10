import { useState, useEffect } from 'react';
import { useMember } from '@/integrations';
import { BaseCrudService } from '@/integrations';
import { Expenses } from '@/entities';
import { Plus, Trash2, Edit, DollarSign, Calendar, Tag, CreditCard, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { format } from 'date-fns';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ExpensesPage() {
  const { member } = useMember();
  const [expenses, setExpenses] = useState<Expenses[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expenses | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    description: '',
    paymentMethod: ''
  });

  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Other'
  ];

  const paymentMethods = [
    'Cash',
    'Credit Card',
    'Debit Card',
    'Bank Transfer',
    'Digital Wallet',
    'Other'
  ];

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<Expenses>('expenses');
      setExpenses(result.items);
    } catch (error) {
      console.error('Error loading expenses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const expenseData = {
      _id: editingExpense?._id || crypto.randomUUID(),
      title: formData.title,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: new Date(formData.date),
      description: formData.description,
      paymentMethod: formData.paymentMethod
    };

    if (editingExpense) {
      // Optimistic update
      setExpenses(expenses.map(exp => exp._id === editingExpense._id ? expenseData : exp));
      try {
        await BaseCrudService.update<Expenses>('expenses', expenseData);
      } catch (error) {
        console.error('Error updating expense:', error);
        loadExpenses();
      }
    } else {
      // Optimistic create
      setExpenses([expenseData, ...expenses]);
      try {
        await BaseCrudService.create('expenses', expenseData);
      } catch (error) {
        console.error('Error creating expense:', error);
        loadExpenses();
      }
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this expense?')) return;

    // Optimistic delete
    setExpenses(expenses.filter(exp => exp._id !== id));
    try {
      await BaseCrudService.delete('expenses', id);
    } catch (error) {
      console.error('Error deleting expense:', error);
      loadExpenses();
    }
  };

  const handleEdit = (expense: Expenses) => {
    setEditingExpense(expense);
    setFormData({
      title: expense.title || '',
      amount: expense.amount?.toString() || '',
      category: expense.category || '',
      date: expense.date ? format(new Date(expense.date), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
      description: expense.description || '',
      paymentMethod: expense.paymentMethod || ''
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      amount: '',
      category: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      description: '',
      paymentMethod: ''
    });
    setEditingExpense(null);
  };

  const totalSpent = expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-6 py-8">
        {/* Header & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight">Expenses</h1>
            <p className="text-muted-foreground mt-1">
              Manage your spending and track your budget.
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button size="lg" className="shadow-sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingExpense ? 'Edit Expense' : 'Add New Expense'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Grocery Shopping"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount *</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      required
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Select value={formData.paymentMethod} onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethods.map((method) => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="min-h-[100px]"
                    placeholder="Add any additional details..."
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingExpense ? 'Save Changes' : 'Create Expense'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card
            title="Total Spent"
            value={`$${totalSpent.toFixed(2)}`}
            icon={DollarSign}
            trend="+2.5% from last month"
          />
          <Card
            title="Total Transactions"
            value={expenses.length.toString()}
            icon={CreditCard}
            trend="+4 this week"
          />
          <Card
            title="Average Transaction"
            value={`$${expenses.length > 0 ? (totalSpent / expenses.length).toFixed(2) : '0.00'}`}
            icon={Tag}
          />
        </div>

        {/* Expenses List */}
        <div className="border border-border rounded-lg bg-card text-card-foreground shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-lg">Recent Transactions</h2>
            <Button variant="outline" size="sm" className="h-8 gap-2">
              <Filter className="w-3.5 h-3.5" />
              Filter
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : expenses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-lg mb-1">No expenses found</h3>
              <p className="text-muted-foreground max-w-sm">
                Get started by adding your first expense transaction.
              </p>
            </div>
          ) : (
            <div className="relative w-full overflow-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground font-medium">
                  <tr>
                    <th className="h-10 px-4 py-3 min-w-[150px]">Title</th>
                    <th className="h-10 px-4 py-3">Category</th>
                    <th className="h-10 px-4 py-3">Date</th>
                    <th className="h-10 px-4 py-3 text-right">Amount</th>
                    <th className="h-10 px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {expenses.map((expense) => (
                    <tr
                      key={expense._id}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <td className="p-4 align-middle">
                        <div className="font-medium text-foreground">{expense.title}</div>
                        {expense.paymentMethod && (
                          <div className="text-xs text-muted-foreground mt-0.5">{expense.paymentMethod}</div>
                        )}
                      </td>
                      <td className="p-4 align-middle">
                        <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs bg-secondary text-secondary-foreground font-medium">
                          {expense.category}
                        </span>
                      </td>
                      <td className="p-4 align-middle text-muted-foreground">
                        {expense.date ? format(new Date(expense.date), 'MMM dd, yyyy') : 'N/A'}
                      </td>
                      <td className="p-4 align-middle text-right font-medium">
                        ${expense.amount?.toFixed(2)}
                      </td>
                      <td className="p-4 align-middle text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            onClick={() => handleEdit(expense)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors"
                            onClick={() => handleDelete(expense._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Card({ title, value, icon: Icon, trend }: { title: string, value: string, icon: any, trend?: string }) {
  return (
    <div className="rounded-lg border border-border bg-card text-card-foreground shadow-sm p-6">
      <div className="flex items-center justify-between space-y-0 pb-2">
        <h3 className="tracking-tight text-sm font-medium text-muted-foreground">{title}</h3>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex flex-col">
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className="text-xs text-muted-foreground mt-1">
            {trend}
          </p>
        )}
      </div>
    </div>
  );
}
