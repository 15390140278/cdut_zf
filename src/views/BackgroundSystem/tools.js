export default {
  paramsToFormData (obj) {
    const formData = new FormData();
    Object.keys(obj).forEach((key) => {
      if (obj[key] instanceof Array) {
        obj[key].forEach((item) => {
          formData.append(key, item);
        });
        return;
      }
      formData.append(key, obj[key]);
    });
    return formData;
  }
  // urlEncode (param, key, encode) {
  //   if (param == null) return '';
  //   var paramStr = '';
  //   var t = typeof (param);
  //   if (t == 'string' || t == 'number' || t == 'boolean') {
  //     paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
  //   } else {
  //     for (var i in param) {
  //       var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
  //       paramStr += urlEncode(param[i], k, encode);
  //     }
  //   }
  //   return paramStr;
  // }
}