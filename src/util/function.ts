export const { suffleArray } = {
  suffleArray<T>(arr: T[], limit: number): T[] {
    arr = [...arr];
    let result: T[] = [],
      i: number = 0;
    while (i < limit) {
      let randomIndex: number = Math.floor(Math.random() * arr.length);
      result.push(arr[randomIndex]);
      arr.splice(randomIndex, 1);
      i++;
    }
    return result;
  },
};
