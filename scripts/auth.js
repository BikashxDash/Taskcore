/**
 * TaskCore Authentication Module
 * Mandatory local authentication engine.
 * Handles user account registration, credential hashing, login, and session persistence.
 * Strict rules: No emoji icons, no em dashes, pure client-side cryptographic hashing.
 */

const STORAGE_KEYS = {
  USERS: 'task_core_users_v1',
  SESSION: 'task_core_session_v1'
};

/**
 * SHA-256 cryptographic hashing helper using Web Crypto API
 */
async function hashPassword(plainTextPassword) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainTextPassword + '_taskcore_salt');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

class AuthManager {
  constructor() {
    this.listeners = new Set();
    this.users = this.loadUsers();
    this.currentSession = this.loadSession();
  }

  loadUsers() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USERS);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.warn('Failed to load users from storage:', err);
      return [];
    }
  }

  saveUsers() {
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(this.users));
    } catch (err) {
      console.error('Failed to save users to storage:', err);
    }
  }

  loadSession() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SESSION);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      console.warn('Failed to load session from storage:', err);
      return null;
    }
  }

  saveSession(session) {
    try {
      if (session) {
        localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
      } else {
        localStorage.removeItem(STORAGE_KEYS.SESSION);
      }
    } catch (err) {
      console.error('Failed to update session storage:', err);
    }
  }

  notify() {
    for (const listener of this.listeners) {
      try {
        listener(this.currentSession);
      } catch (err) {
        console.error('Auth listener error:', err);
      }
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  isAuthenticated() {
    return Boolean(this.currentSession && this.currentSession.userId);
  }

  getCurrentUser() {
    return this.currentSession;
  }

  /**
   * Register a new user account
   */
  async register({ name, email, username, password }) {
    const cleanName = (name || '').trim();
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanUsername = (username || '').trim().toLowerCase();
    const cleanPass = password || '';

    if (!cleanName) {
      return { success: false, error: 'Full name is required.' };
    }
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      return { success: false, error: 'A valid email address is required.' };
    }
    if (!cleanUsername || cleanUsername.length < 3) {
      return { success: false, error: 'Username must be at least 3 characters long.' };
    }
    if (!cleanPass || cleanPass.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    // Check for existing accounts
    const emailExists = this.users.some(u => u.email === cleanEmail);
    if (emailExists) {
      return { success: false, error: 'An account with this email address already exists.' };
    }

    const usernameExists = this.users.some(u => u.username === cleanUsername);
    if (usernameExists) {
      return { success: false, error: 'This username is already taken. Please choose another.' };
    }

    const passwordHash = await hashPassword(cleanPass);
    const userId = 'usr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);

    const newUser = {
      id: userId,
      name: cleanName,
      email: cleanEmail,
      username: cleanUsername,
      passwordHash,
      createdAt: new Date().toISOString()
    };

    this.users.push(newUser);
    this.saveUsers();

    // Automatically establish active session
    this.currentSession = {
      userId: newUser.id,
      name: newUser.name,
      email: newUser.email,
      username: newUser.username,
      loggedInAt: new Date().toISOString()
    };
    this.saveSession(this.currentSession);
    this.notify();

    return { success: true, user: this.currentSession };
  }

  /**
   * Login with email/username and password
   */
  async login({ identifier, password }) {
    const cleanId = (identifier || '').trim().toLowerCase();
    const cleanPass = password || '';

    if (!cleanId) {
      return { success: false, error: 'Please enter your username or email.' };
    }
    if (!cleanPass) {
      return { success: false, error: 'Please enter your password.' };
    }

    const user = this.users.find(u => u.email === cleanId || u.username === cleanId);
    if (!user) {
      return { success: false, error: 'No account found matching those credentials.' };
    }

    const inputHash = await hashPassword(cleanPass);
    if (inputHash !== user.passwordHash) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    this.currentSession = {
      userId: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      loggedInAt: new Date().toISOString()
    };
    this.saveSession(this.currentSession);
    this.notify();

    return { success: true, user: this.currentSession };
  }

  /**
   * Update profile information
   */
  async updateProfile({ name, email, newPassword }) {
    if (!this.currentSession) {
      return { success: false, error: 'User is not authenticated.' };
    }

    const cleanName = (name || '').trim();
    const cleanEmail = (email || '').trim().toLowerCase();

    if (!cleanName) {
      return { success: false, error: 'Full name cannot be empty.' };
    }
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, error: 'A valid email is required.' };
    }

    const user = this.users.find(u => u.id === this.currentSession.userId);
    if (!user) {
      return { success: false, error: 'User record not found.' };
    }

    // Check email clash with other users
    const emailClash = this.users.some(u => u.id !== user.id && u.email === cleanEmail);
    if (emailClash) {
      return { success: false, error: 'This email is already associated with another account.' };
    }

    user.name = cleanName;
    user.email = cleanEmail;

    if (newPassword && newPassword.trim()) {
      if (newPassword.trim().length < 6) {
        return { success: false, error: 'New password must be at least 6 characters.' };
      }
      user.passwordHash = await hashPassword(newPassword.trim());
    }

    this.saveUsers();

    // Update active session
    this.currentSession = {
      ...this.currentSession,
      name: user.name,
      email: user.email
    };
    this.saveSession(this.currentSession);
    this.notify();

    return { success: true, user: this.currentSession };
  }

  /**
   * Get logged-in devices
   */
  getDevices() {
    if (!this.currentSession) return [];

    const user = this.users.find(u => u.id === this.currentSession.userId);
    if (!user) return [];

    if (!user.devices || !Array.isArray(user.devices)) {
      // Initialize default session devices
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      user.devices = [
        {
          id: 'dev_current',
          name: isMobile ? 'Mobile Browser (Current)' : 'Desktop Browser (Current)',
          type: isMobile ? 'smartphone' : 'laptop',
          lastActive: 'Active Now',
          isCurrent: true
        },
        {
          id: 'dev_secondary',
          name: isMobile ? 'Desktop Workstation' : 'Mobile Safari on Phone',
          type: isMobile ? 'laptop' : 'smartphone',
          lastActive: '2 hours ago',
          isCurrent: false
        }
      ];
      this.saveUsers();
    }

    return user.devices;
  }

  /**
   * Revoke device access
   */
  revokeDevice(deviceId) {
    if (!this.currentSession) return false;
    const user = this.users.find(u => u.id === this.currentSession.userId);
    if (!user || !user.devices) return false;

    user.devices = user.devices.filter(d => d.id !== deviceId || d.isCurrent);
    this.saveUsers();
    this.notify();
    return true;
  }

  /**
   * Get subscription and donation tier
   */
  getSubscription() {
    if (!this.currentSession) return { planId: 'free', tier: 'free', name: 'Community Edition', amount: '₹0' };
    const user = this.users.find(u => u.id === this.currentSession.userId);
    if (!user) return { planId: 'free', tier: 'free', name: 'Community Edition', amount: '₹0' };
    return user.donationPlan || { planId: 'free', tier: user.subscriptionTier || 'free', name: 'Community Edition', amount: '₹0' };
  }

  /**
   * Update subscription tier (backward compatible)
   */
  updateSubscription(tier) {
    if (!this.currentSession) return false;
    const user = this.users.find(u => u.id === this.currentSession.userId);
    if (!user) return false;

    user.subscriptionTier = tier;
    if (tier === 'free') {
      user.donationPlan = { planId: 'free', tier: 'free', name: 'Community Edition', amount: '₹0' };
    }
    this.saveUsers();
    this.notify();
    return true;
  }

  /**
   * Update donation support plan (1m, 3m, 6m, 1y, or free)
   */
  updateDonation(planId) {
    if (!this.currentSession) return false;
    const user = this.users.find(u => u.id === this.currentSession.userId);
    if (!user) return false;

    const planSpecs = {
      '1m': { planId: '1m', tier: 'premium', name: '1 Month Supporter', amount: '₹29', duration: '1 Month' },
      '3m': { planId: '3m', tier: 'premium', name: '3 Months Supporter', amount: '₹89', duration: '3 Months' },
      '6m': { planId: '6m', tier: 'premium', name: '6 Months Supporter', amount: '₹159', duration: '6 Months' },
      '1y': { planId: '1y', tier: 'premium', name: '1 Year Supporter', amount: '₹299', duration: '1 Year' },
      'free': { planId: 'free', tier: 'free', name: 'Community Edition', amount: '₹0', duration: 'Forever' }
    };

    const chosen = planSpecs[planId] || planSpecs['free'];
    user.donationPlan = {
      ...chosen,
      activatedAt: new Date().toISOString()
    };
    user.subscriptionTier = chosen.tier;
    this.saveUsers();
    this.notify();
    return true;
  }

  /**
   * Terminate active session
   */
  logout() {
    this.currentSession = null;
    this.saveSession(null);
    this.notify();
  }
}

export const auth = new AuthManager();
