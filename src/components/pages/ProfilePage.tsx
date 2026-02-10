import { useMember } from '@/integrations';
import { User, Mail, Calendar, Shield, Phone } from 'lucide-react';
import { format } from 'date-fns';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';

export default function ProfilePage() {
  const { member } = useMember();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold tracking-tight">Account Settings</h1>
            <p className="text-muted-foreground mt-1">
              Manage your personal information and preferences.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-8">
            {/* Sidebar / Profile Summary */}
            <div className="md:col-span-4 space-y-6">
              <div className="rounded-lg border border-border bg-card text-card-foreground shadow-sm p-6 text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  {member?.profile?.photo?.url ? (
                    <Image
                      src={member.profile.photo.url}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover border-2 border-border"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-muted flex items-center justify-center">
                      <User className="w-10 h-10 text-muted-foreground" />
                    </div>
                  )}
                  {/* Status Indicator */}
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-background rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                  </div>
                </div>

                <h2 className="font-semibold text-xl mb-1">
                  {member?.profile?.nickname || member?.contact?.firstName || 'User'}
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {member?.profile?.title || 'Member'}
                </p>

                <div className="flex justify-center">
                  <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    {member?.status || 'Active'}
                  </span>
                </div>
              </div>

              {/* Navigation (Mock) */}
              <nav className="rounded-lg border border-border bg-card text-card-foreground shadow-sm p-2">
                <Button variant="ghost" className="w-full justify-start font-medium">
                  <User className="w-4 h-4 mr-2" />
                  Personal Info
                </Button>
                <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                  <Shield className="w-4 h-4 mr-2" />
                  Security
                </Button>
                {/* Add more mocked nav items as needed */}
              </nav>
            </div>

            {/* Main Content / Details */}
            <div className="md:col-span-8 space-y-6">
              <div className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
                <div className="p-6 border-b border-border">
                  <h3 className="font-semibold text-lg">Personal Information</h3>
                  <p className="text-sm text-muted-foreground">Update your photo and personal details here.</p>
                </div>

                <div className="p-6 space-y-6">
                  {/* Email */}
                  <div className="grid gap-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Email Address
                    </label>
                    <div className="flex items-center gap-3 p-3 rounded-md border border-input bg-transparent">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm flex-1">{member?.loginEmail || 'Not provided'}</span>
                      {member?.loginEmailVerified && (
                        <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full dark:bg-green-900/20 dark:text-green-400">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Full Name */}
                  <div className="grid gap-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Full Name
                    </label>
                    <div className="flex items-center gap-3 p-3 rounded-md border border-input bg-transparent">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm flex-1">
                        {[member?.contact?.firstName, member?.contact?.lastName].filter(Boolean).join(' ') || 'Not provided'}
                      </span>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="grid gap-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Phone Number
                    </label>
                    <div className="flex items-center gap-3 p-3 rounded-md border border-input bg-transparent">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm flex-1">
                        {member?.contact?.phones?.[0] || 'Not provided'}
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Member Since */}
                    <div className="grid gap-2">
                      <label className="text-sm font-medium leading-none">
                        Member Since
                      </label>
                      <div className="flex items-center gap-3 p-3 rounded-md border border-input bg-transparent">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">
                          {member?._createdDate ? format(new Date(member._createdDate), 'MMMM dd, yyyy') : 'N/A'}
                        </span>
                      </div>
                    </div>

                    {/* Last Login */}
                    <div className="grid gap-2">
                      <label className="text-sm font-medium leading-none">
                        Last Login
                      </label>
                      <div className="flex items-center gap-3 p-3 rounded-md border border-input bg-transparent">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">
                          {member?.lastLoginDate ? format(new Date(member.lastLoginDate), 'MMM dd, yyyy HH:mm') : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
