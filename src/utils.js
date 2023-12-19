export default function separator(numb) {
  numb = (numb / 100).toFixed(2);
  var str = numb.toString().split(".");
  for (let i = 0; i < str.length; i++) {
    str[i] = str[i].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  return str.join(",");
}
