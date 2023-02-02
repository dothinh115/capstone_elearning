import { randomBadgeArr } from "./config";

export const {
  randomArray,
  randomDiscount,
  randomBadge,
  saveLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  showMaNhom,
  toNonAccentVietnamese,
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
    data ? (data = JSON.parse(data)) : (data = null);
    return data;
  },
  removeLocalStorage(name: string): void {
    localStorage.removeItem(name);
  },
  showMaNhom(): JSX.Element[] {
    let html: JSX.Element[] = [];
    for (let i: number = 1; i <= 10; i++) {
      html.push(
        <option key={i} value={`GP${i !== 10 ? "0" + i : i}`}>
          GP{i !== 10 ? "0" + i : i}
        </option>
      );
    }
    return html;
  },
  // This function converts the string to lowercase, then perform the conversion

  toNonAccentVietnamese(str: string) {
    str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    str = str.replace(/\s/g, "-");
    return str;
  },
};
