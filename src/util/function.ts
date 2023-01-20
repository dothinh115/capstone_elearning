import { randomBadgeArr } from "./config";

export const {
  randomArray,
  randomDiscount,
  randomBadge,
  saveLocalStorage,
  getLocalStorage,
} = {
  randomArray<T>(arr: T[], limit: number): T[] {
    arr = [...arr];
    let result: T[] = [];
    while (limit !== 0) {
      const randomIndex: number = Math.floor(Math.random() * arr.length);
      result = [...result, arr[randomIndex]];
      arr.splice(randomIndex, 1);
      limit--;
    }
    return result;
  },
  randomDiscount(): number {
    let random: number = Math.floor(Math.random() * 60);
    while (random <= 20) {
      random = Math.floor(Math.random() * 60);
    }
    return random;
  },
  randomBadge(): string {
    let random: number = Math.floor(Math.random() * randomBadgeArr.length);
    return randomBadgeArr[random];
  },
  saveLocalStorage<T>(name: string, data: T): void {
    const save: string = JSON.stringify(data);
    localStorage.setItem(name, save);
  },
  getLocalStorage(name: string): any {
    let data: any = localStorage.getItem(name);
    if (data) {
      data = JSON.parse(data);
    }
    return data;
  },
};
