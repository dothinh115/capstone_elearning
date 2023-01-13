export const { suffleArray } = {
  suffleArray(arr: [], number: number) {
    //copy từ redux ra mảng mới
    arr = [...arr];
    let randomIndex;
    //currentIndex số phần tử trong mảng
    let currentIndex = arr.length;
    //trong khi vẫn còn phần tử trong mảng, chạy vòng lặp
    while (currentIndex !== 0) {
      //chọn random vị trí 1 phần tử trong mảng, ví dụ randomIndex = 1
      randomIndex = Math.floor(Math.random() * currentIndex);
      //trừ số phần tử đi 1
      currentIndex--;
      //tiến hành đảo phần tử cuối với phần tử random, ví dụ là arr[1]
      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex],
        arr[currentIndex],
      ];
    }
    return arr.slice(0, number);
  },
};
