/** 将 i 位置于j位置进行交换 */
export const swapSong = (i: number, j: number, arr: any[]) => {
  if (arr.length < 1) return arr;

  const newArr = [...arr];

  let temp = newArr[i];
  newArr[i] = newArr[j];
  newArr[j] = temp;

  return newArr;
};
