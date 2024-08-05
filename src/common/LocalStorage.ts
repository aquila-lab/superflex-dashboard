export default class LocalStorage {
  static setItem(key: string, item: any): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(item));
      return true;
    } catch (err) {
      console.error(`Error parsing item with key ${key}:`, err);
      return false;
    }
  }

  static getItem(key: string): any {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (err) {
      console.error(`Error parsing item with key ${key}:`, err);
      return null;
    }
  }

  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
