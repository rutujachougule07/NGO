import React, { useState } from 'react';
import { 
  ShieldCheck, 
  UserCheck, 
  Plus, 
  Search, 
  Edit3, 
  CheckCircle2, 
  XCircle, 
  Lock, 
  Key, 
  SlidersHorizontal, 
  X,
  Mail,
  Phone,
  Building
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export default function AdminUsers() {
  const { 
    adminUsers, 
    addAdminUser, 
    toggleUserStatus 
  } = useAdmin();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('users'); // 'users' | 'roles'
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('Super Admin');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  // New user form state
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'NGO Administrator',
    department: 'Partner Operations',
    phone: ''
  });

  const rolesList = [
    { name: 'Super Admin', desc: 'Unrestricted full access across all modules, settings, bank accounts, and role provisioning.' },
    { name: 'NGO Administrator', desc: 'Manages partner shop onboarding, counter standees, and donor query resolution.' },
    { name: 'Finance Manager', desc: 'Full access to transactions ledger, Razorpay gateway settings, 80G tax receipts, and bank settlements.' },
    { name: 'Content Manager', desc: 'Editorial access to Website CMS, Programs, Stories, and Photo Gallery.' },
    { name: 'Read-Only Auditor', desc: 'Auditing access to view transactions, download tax dockets, and inspect ledger entries without mutation rights.' }
  ];

  const permissionsMatrix = [
    { module: 'Dashboard & Metrics', superAdmin: true, admin: true, finance: true, content: false, auditor: true },
    { module: 'Shop Management & Onboarding', superAdmin: true, admin: true, finance: false, content: false, auditor: true },
    { module: 'QR Code Generation & Revocation', superAdmin: true, admin: true, finance: false, content: false, auditor: true },
    { module: 'Customer Ledger & Transactions', superAdmin: true, admin: true, finance: true, content: false, auditor: true },
    { module: 'Section 80G Receipt Issuance', superAdmin: true, admin: false, finance: true, content: false, auditor: true },
    { module: 'Razorpay Gateway & Bank Payouts', superAdmin: true, admin: false, finance: true, content: false, auditor: false },
    { module: 'Website Content & CMS', superAdmin: true, admin: false, finance: false, content: true, auditor: false },
    { module: 'Admin Users & Role Provisioning', superAdmin: true, admin: false, finance: false, content: false, auditor: false },
    { module: 'Statutory Reports & Audit Logs', superAdmin: true, admin: true, finance: true, content: false, auditor: true }
  ];

  const filteredUsers = adminUsers.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newUser.name.trim() || !newUser.email.trim()) return;
    addAdminUser(newUser);
    setNewUser({ name: '', email: '', role: 'NGO Administrator', department: 'Partner Operations', phone: '' });
    setIsAddUserOpen(false);
  };

  return (
    <div className="space-y-6 text-left pb-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFF2E3] text-[#A34805] text-xs font-bold mb-1 border border-[#F5DEC8]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Role-Based Access Control (RBAC) • Module #14</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#381602]">
            Admin Users & Permissions
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage authorized staff accounts, two-factor authentication compliance, and granular role privileges
          </p>
        </div>

        <button
          onClick={() => setIsAddUserOpen(true)}
          className="px-5 py-2.5 bg-[#E87A1E] hover:bg-[#D2640C] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition active:scale-95 self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add Admin User</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200">
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition ${
            activeTab === 'users'
              ? 'border-[#E87A1E] text-[#381602]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          Authorized Admin Accounts ({adminUsers.length})
        </button>
        <button
          onClick={() => setActiveTab('roles')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition ${
            activeTab === 'roles'
              ? 'border-[#E87A1E] text-[#381602]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          Role Configurations & Permissions Matrix
        </button>
      </div>

      {/* Tab 1: Users Directory */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-[#F3DEC8] shadow-xs flex items-center justify-between">
            <div className="relative w-full max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search staff by name, email, or role..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl pl-9 pr-3 py-2 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
              />
            </div>
            <span className="text-xs font-bold text-stone-400">
              {filteredUsers.length} Users Found
            </span>
          </div>

          <div className="bg-white rounded-3xl border border-[#F3DEC8] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FFFDF9] border-b border-[#F3DEC8] text-stone-500 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Admin Name & Email</th>
                    <th className="py-3 px-3">Assigned Role</th>
                    <th className="py-3 px-3">Department</th>
                    <th className="py-3 px-3">Last Login</th>
                    <th className="py-3 px-3 text-center">2FA Status</th>
                    <th className="py-3 px-3 text-center">Account Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredUsers.map(user => (
                    <tr key={user.id} className="hover:bg-[#FFF2E3]/20 transition">
                      <td className="py-3 px-4">
                        <div className="font-bold text-stone-900">{user.name}</div>
                        <div className="text-[10px] text-stone-400">{user.email}</div>
                      </td>

                      <td className="py-3 px-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          user.role === 'Super Admin'
                            ? 'bg-[#381602] text-white'
                            : user.role === 'Finance Manager'
                            ? 'bg-emerald-100 text-emerald-800'
                            : user.role === 'NGO Administrator'
                            ? 'bg-[#FFF2E3] text-[#A34805]'
                            : 'bg-stone-100 text-stone-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-stone-600 font-medium">
                        {user.department}
                      </td>

                      <td className="py-3 px-3 text-stone-500 text-[11px]">
                        {user.lastLogin}
                      </td>

                      <td className="py-3 px-3 text-center">
                        <span className="inline-flex items-center gap-1 font-bold text-[10px] text-emerald-700">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Enabled</span>
                        </span>
                      </td>

                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => toggleUserStatus(user.id)}
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition ${
                            user.status === 'Active'
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          {user.status}
                        </button>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => addToast(`Password reset link emailed to ${user.email}`, 'info')}
                          className="text-[11px] font-semibold text-[#A34805] hover:underline"
                        >
                          Reset Credentials
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Role Configurations & Permissions Matrix */}
      {activeTab === 'roles' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Roles Sidebar */}
            <div className="bg-white p-4 rounded-3xl border border-[#F3DEC8] shadow-xs space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-3">
                Select Role to Inspect
              </span>
              {rolesList.map(r => (
                <div
                  key={r.name}
                  onClick={() => setSelectedRole(r.name)}
                  className={`p-3 rounded-2xl cursor-pointer transition ${
                    selectedRole === r.name
                      ? 'bg-[#FFF2E3] border border-[#F5DEC8] shadow-2xs'
                      : 'hover:bg-stone-50'
                  }`}
                >
                  <h4 className="font-bold text-xs text-[#381602]">{r.name}</h4>
                  <p className="text-[10px] text-stone-500 mt-0.5 leading-snug">{r.desc}</p>
                </div>
              ))}
            </div>

            {/* Matrix Table */}
            <div className="md:col-span-2 bg-white p-6 rounded-3xl border border-[#F3DEC8] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#381602]">
                    Role Privileges Matrix
                  </h3>
                  <p className="text-xs text-stone-500">
                    Active permissions across administrative features
                  </p>
                </div>
                <button
                  onClick={() => addToast('Permission matrix rules synchronized across sessions!', 'success')}
                  className="px-3.5 py-1.5 bg-[#E87A1E] text-white rounded-xl text-xs font-bold"
                >
                  Save Policy
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FFFDF9] border-b border-[#F3DEC8] text-stone-500 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Module Privilege</th>
                      <th className="py-2.5 px-2 text-center">Super Admin</th>
                      <th className="py-2.5 px-2 text-center">NGO Admin</th>
                      <th className="py-2.5 px-2 text-center">Finance</th>
                      <th className="py-2.5 px-2 text-center">Content</th>
                      <th className="py-2.5 px-2 text-center">Auditor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {permissionsMatrix.map((row, i) => (
                      <tr key={i} className="hover:bg-stone-50">
                        <td className="py-2.5 px-3 font-semibold text-stone-800">{row.module}</td>
                        <td className="py-2.5 px-2 text-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                        <td className="py-2.5 px-2 text-center">
                          {row.admin ? <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /> : <XCircle className="w-4 h-4 text-stone-300 mx-auto" />}
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          {row.finance ? <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /> : <XCircle className="w-4 h-4 text-stone-300 mx-auto" />}
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          {row.content ? <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /> : <XCircle className="w-4 h-4 text-stone-300 mx-auto" />}
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          {row.auditor ? <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /> : <XCircle className="w-4 h-4 text-stone-300 mx-auto" />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Add Admin User Modal */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-stone-200 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-serif text-lg font-bold text-[#381602]">Provision Admin User</h3>
              <button
                onClick={() => setIsAddUserOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Deshmukh"
                  value={newUser.name}
                  onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="name@immenselife.org"
                  value={newUser.email}
                  onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Assign Role</label>
                <select
                  value={newUser.role}
                  onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="NGO Administrator">NGO Administrator</option>
                  <option value="Finance Manager">Finance Manager</option>
                  <option value="Content Manager">Content Manager</option>
                  <option value="Read-Only Auditor">Read-Only Auditor</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Department</label>
                <input
                  type="text"
                  placeholder="e.g. Partner Operations or Accounts"
                  value={newUser.department}
                  onChange={e => setNewUser({ ...newUser, department: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded-xl text-stone-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E87A1E] hover:bg-[#D2640C] text-white font-bold rounded-xl shadow-xs transition"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
