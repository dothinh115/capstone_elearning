import { colorArr } from "./config";

export const { randomArray, randomColor } = {
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
  randomColor(): string {
    let random: number = Math.floor(Math.random() * colorArr.length);
    return colorArr[random];
  },
};
