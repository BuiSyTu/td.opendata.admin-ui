export const toObject = (arr, key, value) => arr.reduce((previous, item) => ({
  ...previous,
  ...(item !== null && item !== undefined && { [item[key]]: item[value] }),
}), {})

export const getBase64 = (fileBlob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
