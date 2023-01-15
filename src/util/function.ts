export const { randomArray } = {
  randomArray<T>(arr: T[], limit: number): T[] {
    arr = [...arr];
    let result: T[] = [];
    while (limit !== 0) {
      let randomIndex: number = Math.floor(Math.random() * arr.length);
      result = [...result, arr[randomIndex]];
      arr.splice(randomIndex, 1);
      limit--;
    }
    return result;
  },
};
