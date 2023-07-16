function urlsExtract(txt) {
  let imgss = txt.split("<img")[1];
  //   console.log(txt);
  //   console.log(imgss);
  let imgst = imgss.indexOf("https://");
  let imgend = imgss.indexOf('">', imgst);
  console.log(imgst + "\n" + imgend);
  let downst = txt.indexOf('<a href="') + 9;
  let downend = txt.indexOf('"', downst);
  return [imgss.substring(imgst, imgend), txt.substring(downst, downend)];
}
fetch("https://api.vevioz.com/api/widget/mp3/Jyvffr3aCp0")
  .then((Res) => Res.text())
  .then((html) => {
    let uris = urlsExtract(html);
    console.log(uris);
  });
