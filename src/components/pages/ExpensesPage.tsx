import { useState, useEffect } from 'react';
import { useMember } from '@/integrations';
import { BaseCrudService } from '@/integrations';
import { Expenses } from '@/entities';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit, DollarSign, Calendar, Tag, CreditCard, FileText } from 'lucide-react';
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
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="max-w-[100rem] mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-5xl md:text-6xl mb-4 bg-gradient-to-r from-accent-teal to-accent-magenta bg-clip-text text-transparent">
              Expense Dashboard
            </h1>
            <p className="font-paragraph text-lg text-muted-foreground">
              Track and manage your expenses with precision
            </p>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-background/70 backdrop-blur-xl rounded-2xl border border-accent-teal/20 p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-paragraph text-sm text-muted-foreground">Total Spent</span>
              <DollarSign className="w-5 h-5 text-accent-teal" />
            </div>
            <p className="font-heading text-3xl text-accent-teal">${totalSpent.toFixed(2)}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-background/70 backdrop-blur-xl rounded-2xl border border-accent-magenta/20 p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-paragraph text-sm text-muted-foreground">Total Expenses</span>
              <FileText className="w-5 h-5 text-accent-magenta" />
            </div>
            <p className="font-heading text-3xl text-accent-magenta">{expenses.length}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-background/70 backdrop-blur-xl rounded-2xl border border-accent-teal/20 p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-paragraph text-sm text-muted-foreground">Average Expense</span>
              <Tag className="w-5 h-5 text-foreground" />
            </div>
            <p className="font-heading text-3xl text-foreground">
              ${expenses.length > 0 ? (totalSpent / expenses.length).toFixed(2) : '0.00'}
            </p>
          </motion.div>
        </div>

        {/* Add Expense Button */}
        <div className="mb-8">
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-accent-teal to-accent-magenta text-primary-foreground font-heading px-6 py-3 rounded-lg hover:opacity-90 transition-all">
                <Plus className="w-5 h-5 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-background border border-accent-teal/20 max-w-2xl">
              <DialogHeader>
                <DialogTitle className="font-heading text-2xl text-foreground">
                  {editingExpense ? 'Edit Expense' : 'Add New Expense'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title" className="font-paragraph text-sm text-muted-foreground mb-2 block">
                      Title *
                    </Label>
                    <Input
                      id="title"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="bg-background/50 border-accent-teal/20 text-foreground font-paragraph"
                      placeholder="e.g., Grocery Shopping"
                    />
                  </div>
                  <div>
                    <Label htmlFor="amount" className="font-paragraph text-sm text-muted-foreground mb-2 block">
                      Amount *
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      required
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="bg-background/50 border-accent-teal/20 text-foreground font-paragraph"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category" className="font-paragraph text-sm text-muted-foreground mb-2 block">
                      Category *
                    </Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger className="bg-background/50 border-accent-teal/20 text-foreground font-paragraph">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-accent-teal/20">
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat} className="font-paragraph text-foreground">
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="date" className="font-paragraph text-sm text-muted-foreground mb-2 block">
                      Date *
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="bg-background/50 border-accent-teal/20 text-foreground font-paragraph"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="paymentMethod" className="font-paragraph text-sm text-muted-foreground mb-2 block">
                    Payment Method
                  </Label>
                  <Select value={formData.paymentMethod} onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}>
                    <SelectTrigger className="bg-background/50 border-accent-teal/20 text-foreground font-paragraph">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-accent-teal/20">
                      {paymentMethods.map((method) => (
                        <SelectItem key={method} value={method} className="font-paragraph text-foreground">
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description" className="font-paragraph text-sm text-muted-foreground mb-2 block">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-background/50 border-accent-teal/20 text-foreground font-paragraph min-h-[100px]"
                    placeholder="Add any additional details..."
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-accent-teal to-accent-magenta text-primary-foreground font-heading rounded-lg hover:opacity-90 transition-all"
                  >
                    {editingExpense ? 'Update Expense' : 'Add Expense'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false);
                      resetForm();
                    }}
                    className="border-accent-magenta text-accent-magenta font-heading rounded-lg hover:bg-accent-magenta/10 transition-all"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Expenses Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-background/70 backdrop-blur-xl rounded-2xl border border-accent-teal/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] overflow-hidden"
          style={{ minHeight: '400px' }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : expenses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <DollarSign className="w-16 h-16 text-muted mb-4" />
              <p className="font-heading text-xl text-muted-foreground mb-2">No expenses yet</p>
              <p className="font-paragraph text-sm text-muted-foreground">Add your first expense to get started</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-accent-teal/20">
                    <th className="text-left p-4 font-heading text-sm text-muted-foreground">Title</th>
                    <th className="text-left p-4 font-heading text-sm text-muted-foreground">Amount</th>
                    <th className="text-left p-4 font-heading text-sm text-muted-foreground">Category</th>
                    <th className="text-left p-4 font-heading text-sm text-muted-foreground">Date</th>
                    <th className="text-left p-4 font-heading text-sm text-muted-foreground">Payment</th>
                    <th className="text-right p-4 font-heading text-sm text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense, index) => (
                    <motion.tr
                      key={expense._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b border-accent-teal/10 hover:bg-accent-teal/5 transition-colors"
                    >
                      <td className="p-4">
                        <div>
                          <p className="font-paragraph text-sm text-foreground">{expense.title}</p>
                          {expense.description && (
                            <p className="font-paragraph text-xs text-muted-foreground mt-1 line-clamp-1">
                              {expense.description}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-heading text-sm text-accent-teal">
                          ${expense.amount?.toFixed(2)}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-accent-magenta/10 border border-accent-magenta/20 rounded-lg font-paragraph text-xs text-accent-magenta">
                          <Tag className="w-3 h-3" />
                          {expense.category}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-paragraph text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {expense.date ? format(new Date(expense.date), 'MMM dd, yyyy') : 'N/A'}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-paragraph text-sm text-muted-foreground flex items-center gap-1">
                          <CreditCard className="w-4 h-4" />
                          {expense.paymentMethod || 'N/A'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(expense)}
                            className="p-2 hover:bg-accent-teal/10 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4 text-accent-teal" />
                          </button>
                          <button
                            onClick={() => handleDelete(expense._id)}
                            className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
