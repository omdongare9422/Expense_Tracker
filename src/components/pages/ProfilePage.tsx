import { useMember } from '@/integrations';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Shield } from 'lucide-react';
import { format } from 'date-fns';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

export default function ProfilePage() {
  const { member } = useMember();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="max-w-[100rem] mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-heading text-5xl md:text-6xl mb-4 bg-gradient-to-r from-accent-teal to-accent-magenta bg-clip-text text-transparent">
            Profile
          </h1>
          <p className="font-paragraph text-lg text-muted-foreground mb-12">
            Manage your account information
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-1"
          >
            <div className="bg-background/70 backdrop-blur-xl rounded-2xl border border-accent-teal/20 p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] text-center">
              {member?.profile?.photo?.url ? (
                <Image src={member.profile.photo.url} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-accent-teal/20" />
              ) : (
                <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gradient-to-br from-accent-teal to-accent-magenta flex items-center justify-center">
                  <User className="w-16 h-16 text-primary-foreground" />
                </div>
              )}
              <h2 className="font-heading text-2xl text-foreground mb-2">
                {member?.profile?.nickname || member?.contact?.firstName || 'User'}
              </h2>
              {member?.profile?.title && (
                <p className="font-paragraph text-sm text-muted-foreground mb-4">
                  {member.profile.title}
                </p>
              )}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-teal/10 border border-accent-teal/20 rounded-lg">
                <Shield className="w-4 h-4 text-accent-teal" />
                <span className="font-paragraph text-sm text-accent-teal">
                  {member?.status || 'Active'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Details Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2"
          >
            <div className="bg-background/70 backdrop-blur-xl rounded-2xl border border-accent-teal/20 p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
              <h3 className="font-heading text-2xl text-foreground mb-6">Account Information</h3>
              
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4 p-4 bg-background/50 rounded-lg border border-accent-teal/10">
                  <div className="w-10 h-10 bg-accent-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-accent-teal" />
                  </div>
                  <div className="flex-1">
                    <p className="font-paragraph text-sm text-muted-foreground mb-1">Email Address</p>
                    <p className="font-paragraph text-base text-foreground">
                      {member?.loginEmail || 'Not provided'}
                    </p>
                    {member?.loginEmailVerified && (
                      <span className="inline-block mt-2 px-2 py-1 bg-accent-teal/10 border border-accent-teal/20 rounded text-xs font-paragraph text-accent-teal">
                        Verified
                      </span>
                    )}
                  </div>
                </div>

                {/* Full Name */}
                {(member?.contact?.firstName || member?.contact?.lastName) && (
                  <div className="flex items-start gap-4 p-4 bg-background/50 rounded-lg border border-accent-teal/10">
                    <div className="w-10 h-10 bg-accent-magenta/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-accent-magenta" />
                    </div>
                    <div className="flex-1">
                      <p className="font-paragraph text-sm text-muted-foreground mb-1">Full Name</p>
                      <p className="font-paragraph text-base text-foreground">
                        {[member?.contact?.firstName, member?.contact?.lastName].filter(Boolean).join(' ')}
                      </p>
                    </div>
                  </div>
                )}

                {/* Phone */}
                {member?.contact?.phones && member.contact.phones.length > 0 && (
                  <div className="flex items-start gap-4 p-4 bg-background/50 rounded-lg border border-accent-teal/10">
                    <div className="w-10 h-10 bg-accent-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-accent-teal" />
                    </div>
                    <div className="flex-1">
                      <p className="font-paragraph text-sm text-muted-foreground mb-1">Phone Number</p>
                      <p className="font-paragraph text-base text-foreground">
                        {member.contact.phones[0]}
                      </p>
                    </div>
                  </div>
                )}

                {/* Member Since */}
                {member?._createdDate && (
                  <div className="flex items-start gap-4 p-4 bg-background/50 rounded-lg border border-accent-teal/10">
                    <div className="w-10 h-10 bg-accent-magenta/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-accent-magenta" />
                    </div>
                    <div className="flex-1">
                      <p className="font-paragraph text-sm text-muted-foreground mb-1">Member Since</p>
                      <p className="font-paragraph text-base text-foreground">
                        {format(new Date(member._createdDate), 'MMMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                )}

                {/* Last Login */}
                {member?.lastLoginDate && (
                  <div className="flex items-start gap-4 p-4 bg-background/50 rounded-lg border border-accent-teal/10">
                    <div className="w-10 h-10 bg-accent-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-accent-teal" />
                    </div>
                    <div className="flex-1">
                      <p className="font-paragraph text-sm text-muted-foreground mb-1">Last Login</p>
                      <p className="font-paragraph text-base text-foreground">
                        {format(new Date(member.lastLoginDate), 'MMMM dd, yyyy HH:mm')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
