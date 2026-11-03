const USER_KEY = 'tokopedia_user_profile_v1';

const DEFAULT_PROFILE = {
  name: 'Sakti Buana',
  displayName: 'Sakti',
  birthDate: '1 Juli 1985',
  gender: 'Pria',
  email: 'sakti@buana.studio',
  isEmailVerified: true,
  phone: '6285720502217',
  isPhoneVerified: true,
  safeMode: false,
  avatar: '/images/profile-sakti.jpg',
  storeName: "Buana's Inve...",
  plusStatus: 'nonaktif',
  gopayBalance: 51061,
  gopayCoins: 173,
  saldo: 238000,
  unreadMessages: 4,
  unreadNotifications: 4,
  unreadChats: 4
};

class UserService {
  constructor() {
    this.subscribers = new Set();
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === USER_KEY) {
          this.notify();
        }
      });
    }
  }

  getProfile() {
    try {
      const data = localStorage.getItem(USER_KEY);
      return data ? { ...DEFAULT_PROFILE, ...JSON.parse(data) } : { ...DEFAULT_PROFILE };
    } catch {
      return { ...DEFAULT_PROFILE };
    }
  }

  saveProfile(profile) {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(profile));
      this.notify();
    } catch (e) {
      console.error('Failed to save user profile:', e);
    }
  }

  updateProfile(fields) {
    const current = this.getProfile();
    const updated = { ...current, ...fields };
    this.saveProfile(updated);
    return updated;
  }

  toggleSafeMode() {
    const current = this.getProfile();
    return this.updateProfile({ safeMode: !current.safeMode });
  }

  updateAvatar(avatarUrl) {
    return this.updateProfile({ avatar: avatarUrl });
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notify() {
    const profile = this.getProfile();
    this.subscribers.forEach((cb) => cb(profile));
  }
}

export const userService = new UserService();
