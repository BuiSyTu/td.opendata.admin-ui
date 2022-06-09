export const toObject = (arr: any[], key: any, value: any) => arr.reduce((previous, item) => ({
  ...previous,
  ...(item !== null && item !== undefined && { [item[key]]: item[value] }),
}), {})

export const getBase64 = (fileBlob: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const isDevelopmentMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

export const openJsonInNewTab = (json: any) => {
  var myjson = JSON.stringify(json, null, 2);
  var x = window.open();
  x?.document.open();
  x?.document.write('<html><body><pre>' + myjson + '</pre></body></html>');
  x?.document.close();
}

export const toQueryString: any = (obj: any, prefix: any) => {
  var str = [],
    p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p,
        v = obj[p];
      str.push((v !== null && typeof v === "object") ?
        toQueryString(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}
