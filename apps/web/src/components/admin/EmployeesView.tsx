import React, { useEffect, useState } from 'react';
import { createStaffApi, deleteStaffApi, fetchStaffApi, resetStaffPasswordApi } from '../../lib/api';
import { PlusIcon, TrashIcon, CloseIcon } from './icons';

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'employee' | 'moderator';
  createdAt?: string;
}

interface EmployeesViewProps {
  currentUserId?: string;
}

export function EmployeesView({ currentUserId }: EmployeesViewProps) {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [resetTarget, setResetTarget] = useState<StaffMember | null>(null);
  const [resetPasswordVal, setResetPasswordVal] = useState('');
  const [resetSuccessMsg, setResetSuccessMsg] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'employee' | 'moderator' | 'admin'>('employee');

  const loadStaff = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchStaffApi();
      setStaff(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStaff();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const created = await createStaffApi({ name, email, phone, password, role });
      setStaff((prev) => [created, ...prev]);
      setIsModalOpen(false);
      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setRole('employee');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create staff member');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (member: StaffMember) => {
    if (!confirm(`Remove "${member.name}" (${member.role}) from staff?`)) return;
    try {
      await deleteStaffApi(member.id);
      setStaff((prev) => prev.filter((s) => s.id !== member.id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to remove staff member');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-semibold text-espresso">Team & Employees</h2>
          <p className="text-xs text-clay mt-0.5">
            Manage Meghpeon staff accounts and role-based permissions (Admin only)
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-ink hover:bg-burgundy-dark text-parchment border border-gold-500/40 rounded-[3px] text-xs font-semibold shadow-sm transition-colors"
        >
          <PlusIcon /> Add Employee / Staff
        </button>
      </div>

      {error && (
        <div className="p-3 text-xs rounded-[3px] bg-crimson-50 border border-crimson-300 text-crimson-700">
          {error}
        </div>
      )}

      <div className="bg-parchment-light border border-parchment-line rounded-[4px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-parchment-deep/70 text-espresso border-b border-parchment-line uppercase tracking-wider font-semibold text-[11px]">
              <tr>
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Permissions</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-parchment-line/70">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-clay">
                    Loading staff directory...
                  </td>
                </tr>
              ) : staff.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-clay">
                    No staff accounts found.
                  </td>
                </tr>
              ) : (
                staff.map((member) => (
                  <tr key={member.id} className="hover:bg-parchment-deep/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-ink text-gold-200 font-display font-bold flex items-center justify-center text-xs border border-gold-500/30">
                          {member.name.charAt(0)}
                        </div>
                        <div className="font-semibold text-espresso">{member.name}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-espresso">{member.email}</div>
                      <div className="text-[10px] text-clay">{member.phone}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-[2px] text-[10px] font-bold uppercase tracking-wider border ${
                          member.role === 'admin'
                            ? 'bg-burgundy text-gold-200 border-gold-500/40'
                            : 'bg-gold-100 text-gold-800 border-gold-400/50'
                        }`}
                      >
                        {member.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-clay">
                      {member.role === 'admin'
                        ? 'Full Access (Products, Orders, Team, Settings)'
                        : 'Orders & Stock Management (No Delete / Settings)'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {member.id === currentUserId ? (
                        <span className="text-[10px] text-clay italic">Current Session</span>
                      ) : (
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setResetTarget(member);
                              setResetPasswordVal('');
                              setError(null);
                            }}
                            className="px-2.5 py-1 rounded-[3px] border border-parchment-border bg-parchment-50 hover:bg-parchment-deep text-espresso text-[11px] font-medium transition-colors"
                          >
                            Reset Password
                          </button>
                          <button
                            onClick={() => handleDelete(member)}
                            title="Remove Staff"
                            className="p-1.5 rounded-[3px] hover:bg-crimson-50 text-clay hover:text-crimson-700 transition-colors"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {resetSuccessMsg && (
        <div className="p-3 text-xs rounded-[3px] bg-gold-50 border border-gold-500/50 text-espresso">
          {resetSuccessMsg}
        </div>
      )}

      {resetTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-deep/65 backdrop-blur-sm">
          <div className="bg-parchment-light rounded-[4px] shadow-2xl border border-parchment-line w-full max-w-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-parchment-line pb-3">
              <div>
                <h3 className="font-display text-lg font-semibold text-espresso">Reset Staff Password</h3>
                <p className="text-[11px] text-clay">{resetTarget.name} ({resetTarget.email})</p>
              </div>
              <button
                onClick={() => setResetTarget(null)}
                className="p-1 rounded-[3px] text-clay hover:text-espresso hover:bg-parchment-deep"
              >
                <CloseIcon />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setSubmitting(true);
                setError(null);
                try {
                  await resetStaffPasswordApi(resetTarget.id, resetPasswordVal);
                  setResetSuccessMsg(`Password updated for ${resetTarget.name} (${resetTarget.email})`);
                  setResetTarget(null);
                  setResetPasswordVal('');
                  setTimeout(() => setResetSuccessMsg(null), 4000);
                } catch (err: unknown) {
                  setError(err instanceof Error ? err.message : 'Failed to reset password');
                } finally {
                  setSubmitting(false);
                }
              }}
              className="space-y-4 text-xs"
            >
              <div className="space-y-1">
                <label className="block font-semibold text-espresso">New Password (Min 6 chars) *</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={resetPasswordVal}
                  onChange={(e) => setResetPasswordVal(e.target.value)}
                  placeholder="Enter new password..."
                  className="w-full px-3 py-2 bg-parchment-50 border border-parchment-border rounded-[3px] text-espresso focus:outline-none focus:border-gold-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-parchment-line">
                <button
                  type="button"
                  onClick={() => setResetTarget(null)}
                  className="px-4 py-2 text-clay hover:text-espresso rounded-[3px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-ink hover:bg-burgundy-dark text-parchment border border-gold-500/40 rounded-[3px] font-semibold disabled:opacity-60"
                >
                  {submitting ? 'Saving...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-deep/65 backdrop-blur-sm">
          <div className="bg-parchment-light rounded-[4px] shadow-2xl border border-parchment-line w-full max-w-md p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-parchment-line pb-3">
              <h3 className="font-display text-lg font-semibold text-espresso">Add Staff Account</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-[3px] text-clay hover:text-espresso hover:bg-parchment-deep"
              >
                <CloseIcon />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="block font-semibold text-espresso">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rafiqul Islam"
                  className="w-full px-3 py-2 bg-parchment-50 border border-parchment-border rounded-[3px] text-espresso focus:outline-none focus:border-gold-600"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-espresso">Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="staff@meghpiyon.com"
                  className="w-full px-3 py-2 bg-parchment-50 border border-parchment-border rounded-[3px] text-espresso focus:outline-none focus:border-gold-600"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-espresso">Phone (BD) *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="w-full px-3 py-2 bg-parchment-50 border border-parchment-border rounded-[3px] text-espresso focus:outline-none focus:border-gold-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-semibold text-espresso">Role *</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as 'employee' | 'moderator' | 'admin')}
                    className="w-full px-3 py-2 bg-parchment-50 border border-parchment-border rounded-[3px] text-espresso focus:outline-none focus:border-gold-600"
                  >
                    <option value="employee">Employee</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-semibold text-espresso">Password *</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 6 chars"
                    className="w-full px-3 py-2 bg-parchment-50 border border-parchment-border rounded-[3px] text-espresso focus:outline-none focus:border-gold-600"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-parchment-line">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-clay hover:text-espresso rounded-[3px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-ink hover:bg-burgundy-dark text-parchment border border-gold-500/40 rounded-[3px] font-semibold disabled:opacity-60"
                >
                  {submitting ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
