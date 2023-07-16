function idExtract(url) {
  if (url.includes("shorts")) {
    let st = url.indexOf("shorts") + 7;
    return url.substring(st, url.length);
  }
  let idStart = url.indexOf("?v=") + 3;
  let idEnd = url.indexOf("&") + 1 ? url.indexOf("&") : url.length;
  let x = url.substring(idStart, idEnd);
  let sharp = x.indexOf("#");
  if (x.includes("#")) {
    return x.substring(0, sharp);
  }
  return x;
}

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
async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
let ftype = "videos"; // will be assiend to a switch
let Switch = document.getElementById("switch");
Switch.addEventListener("click", () => {
  console.log("clicked");
  if (Switch.checked) {
    document.getElementById("lbl").innerHTML = "mp3";
    localStorage.setItem("check", "true");
    ftype = "mp3";
  } else {
    document.getElementById("lbl").innerHTML = "mp4";
    localStorage.setItem("check", "false");
    ftype = "videos";
  }
});
if (localStorage.getItem("check") == "true") Switch.click();
getCurrentTab().then((res) => {
  let id = idExtract(res.url);
  setTimeout(() => {
    let Exurl = `https://api.vevioz.com/api/widget/${ftype}/${id}`;
    fetch(Exurl)
      .then((res) => res.text())
      .then((res) => {
        let data = urlsExtract(res);
        document.getElementById("img").src = data[0];
        window.location.replace(data[1]);
        // document.close();
      })
      .catch((err) => document.writeln(err));
  }, 2000);
});
