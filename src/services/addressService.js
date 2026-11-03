const ADDRESS_KEY = 'tokopedia_user_addresses_v1';

const DEFAULT_ADDRESSES = [
  {
    id: 'addr-001',
    title: 'Gedung SD At Tibyan BQS',
    recipient: 'Hikmatullah Sakti Buana',
    phone: '6285117758517',
    fullAddress: 'SEKOLAH DASAR AT TIBYAN BANDUNG QURANIC SCHOOL, Jalan Jendral A. Yani, Kec. Batununggal, Kota Bandung, Jawa Barat (ditelpon, bukan cuma whatsapp, gak semua pake)',
    isPinpoint: true,
    isPrimary: false,
    isSelected: true
  },
  {
    id: 'addr-002',
    title: 'Rumah Nini Ciamis',
    recipient: 'Hikmatullah Sakti Buana',
    phone: '6285720502217',
    fullAddress: 'Jl. Yos Sudarso No 80 (76 Lama), Sebelah Graha Ayoe, Kec. Ciamis, Kabupaten Ciamis, Jawa Barat, 46211 (Jalan Yos Sudarso No 76, Ciamis, Jawa Barat)',
    isPinpoint: true,
    isPrimary: true,
    isSelected: false
  }
];

class AddressService {
  constructor() {
    this.subscribers = new Set();
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === ADDRESS_KEY) {
          this.notify();
        }
      });
    }
  }

  getAddresses() {
    try {
      const data = localStorage.getItem(ADDRESS_KEY);
      return data ? JSON.parse(data) : DEFAULT_ADDRESSES;
    } catch {
      return DEFAULT_ADDRESSES;
    }
  }

  saveAddresses(addresses) {
    try {
      localStorage.setItem(ADDRESS_KEY, JSON.stringify(addresses));
      this.notify();
    } catch (e) {
      console.error('Failed to save addresses:', e);
    }
  }

  getSelectedAddress() {
    const list = this.getAddresses();
    return list.find((a) => a.isSelected) || list.find((a) => a.isPrimary) || list[0] || null;
  }

  selectAddress(id) {
    const list = this.getAddresses().map((addr) => ({
      ...addr,
      isSelected: addr.id === id
    }));
    this.saveAddresses(list);
  }

  setPrimaryAddress(id) {
    const list = this.getAddresses().map((addr) => ({
      ...addr,
      isPrimary: addr.id === id
    }));
    this.saveAddresses(list);
  }

  addAddress(newAddr) {
    const list = this.getAddresses();
    const created = {
      id: 'addr-' + Date.now().toString(36),
      isPinpoint: true,
      isSelected: list.length === 0,
      isPrimary: list.length === 0,
      ...newAddr
    };
    if (created.isPrimary) {
      list.forEach((a) => (a.isPrimary = false));
    }
    list.unshift(created);
    this.saveAddresses(list);
    return created;
  }

  updateAddress(id, updatedFields) {
    let list = this.getAddresses();
    if (updatedFields.isPrimary) {
      list.forEach((a) => (a.isPrimary = false));
    }
    list = list.map((a) => (a.id === id ? { ...a, ...updatedFields } : a));
    this.saveAddresses(list);
  }

  deleteAddress(id) {
    let list = this.getAddresses().filter((a) => a.id !== id);
    if (list.length > 0 && !list.some((a) => a.isSelected)) {
      list[0].isSelected = true;
    }
    if (list.length > 0 && !list.some((a) => a.isPrimary)) {
      list[0].isPrimary = true;
    }
    this.saveAddresses(list);
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notify() {
    const list = this.getAddresses();
    const selected = this.getSelectedAddress();
    this.subscribers.forEach((cb) => cb({ addresses: list, selectedAddress: selected }));
  }
}

export const addressService = new AddressService();
