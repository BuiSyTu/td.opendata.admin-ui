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

export const isDevelopmentMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

export const openJsonInNewTab = (json) => {
  var myjson = JSON.stringify(json, null, 2);
  var x = window.open();
  x?.document.open();
  x?.document.write('<html><body><pre>' + myjson + '</pre></body></html>');
  x?.document.close();
}
