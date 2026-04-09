'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard, FileEdit, CheckCircle, Palette,
  BookOpen, PenLine, LogOut, Menu, X, Sparkles
} from 'lucide-react';
import { useAuth } from '@/components/providers/FirebaseAuthContext';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/builder', label: 'Resume Builder', icon: FileEdit },
  { href: '/checker', label: 'ATS Checker', icon: CheckCircle },
  { href: '/templates', label: 'Templates', icon: Palette },
  { href: '/examples', label: 'Examples', icon: BookOpen },
  { href: '/guides', label: 'Writing Guides', icon: PenLine },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { user, loading, logout } = useAuth();
  const isAuthenticated = !!user;

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg lg:hidden"
        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
      >
        {collapsed ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 flex flex-col ${
          collapsed ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{
          width: '260px',
          background: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border)',
        }}
      >
        {/* Logo */}
        <div className="p-6 flex items-center gap-3" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}>
            <Sparkles size={20} color="white" />
          </div>
          <div>
            <h1 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>ResumeAI</h1>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>ATS Scanner Pro</p>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setCollapsed(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: isActive ? 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))' : 'transparent',
                  color: isActive ? '#818CF8' : 'var(--text-secondary)',
                  border: isActive ? '1px solid rgba(99,102,241,0.2)' : '1px solid transparent',
                }}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="p-4" style={{ borderTop: '1px solid var(--border)' }}>
          {isAuthenticated && user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', color: 'white' }}>
                  {(user as any).displayName?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {(user as any).displayName || 'User'}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {user.email}
                  </p>
                </div>
              </div>
              <button onClick={logout} className="p-2 rounded-lg hover:bg-red-500/10" title="Logout">
                <LogOut size={16} style={{ color: 'var(--danger)' }} />
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              className="btn btn-primary w-full justify-center"
              onClick={() => setCollapsed(false)}
            >
              Sign In
            </Link>
          )}
        </div>
      </aside>

      {/* Mobile overlay */}
      {collapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setCollapsed(false)}
        />
      )}
    </>
  );
}
