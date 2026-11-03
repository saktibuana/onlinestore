import { analytics } from './analytics';
import { gtm } from './gtm';

const BANKS_KEY = 'tokopedia_bank_accounts_v1';

const INITIAL_BANKS = [
  {
    id: 'bank-bca-01',
    bankCode: 'BCA',
    bankName: 'PT. BCA (BANK CENTRAL ASIA) TBK',
    accountNumber: '0083292811',
    accountHolder: 'a.n Arti Hikmatullah Perbawana Sakti Buana'
  },
  {
    id: 'bank-bni-01',
    bankCode: 'BNI',
    bankName: 'PT. BANK NEGARA INDONESIA (BNI) (PERSERO)',
    accountNumber: '0700045854',
    accountHolder: 'a.n Astrid Nurul Falah'
  },
  {
    id: 'bank-mandiri-01',
    bankCode: 'MANDIRI',
    bankName: 'PT. BANK MANDIRI',
    accountNumber: '1320003018489',
    accountHolder: 'a.n Arti Hikmatullah Perbawana Sakti Buana'
  }
];

class BankService {
  constructor() {
    this.subscribers = new Set();
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === BANKS_KEY) {
          this.notify();
        }
      });
    }
  }

  getAccounts() {
    try {
      const data = localStorage.getItem(BANKS_KEY);
      return data ? JSON.parse(data) : INITIAL_BANKS;
    } catch {
      return INITIAL_BANKS;
    }
  }

  saveAccounts(accounts) {
    try {
      localStorage.setItem(BANKS_KEY, JSON.stringify(accounts));
      this.notify();
    } catch (e) {
      console.error('Failed to save bank accounts:', e);
    }
  }

  addAccount({ bankCode, accountNumber, accountHolder }) {
    const accounts = this.getAccounts();
    const bankNameMap = {
      BCA: 'PT. BCA (BANK CENTRAL ASIA) TBK',
      BNI: 'PT. BANK NEGARA INDONESIA (BNI) (PERSERO)',
      MANDIRI: 'PT. BANK MANDIRI',
      BRI: 'PT. BANK RAKYAT INDONESIA (PERSERO) TBK',
      BSI: 'PT. BANK SYARIAH INDONESIA TBK',
      CIMB: 'PT. BANK CIMB NIAGA TBK'
    };

    const newAcc = {
      id: `bank-${Date.now()}`,
      bankCode: bankCode.toUpperCase(),
      bankName: bankNameMap[bankCode.toUpperCase()] || `PT. BANK ${bankCode.toUpperCase()}`,
      accountNumber,
      accountHolder: accountHolder.startsWith('a.n ') ? accountHolder : `a.n ${accountHolder}`
    };

    const updated = [newAcc, ...accounts];
    this.saveAccounts(updated);

    analytics.logEvent('bank_account_added', { bank: newAcc.bankCode });
    gtm.pushEvent('bank_account_added', { bank: newAcc.bankCode });

    return newAcc;
  }

  deleteAccount(id) {
    const accounts = this.getAccounts();
    const target = accounts.find((a) => a.id === id);
    const updated = accounts.filter((a) => a.id !== id);
    this.saveAccounts(updated);

    if (target) {
      analytics.logEvent('bank_account_deleted', { bank: target.bankCode });
      gtm.pushEvent('bank_account_deleted', { bank: target.bankCode });
    }

    return updated;
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notify() {
    const accounts = this.getAccounts();
    this.subscribers.forEach((cb) => cb(accounts));
  }
}

export const bankService = new BankService();
