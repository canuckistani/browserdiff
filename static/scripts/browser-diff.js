var dmp = new diff_match_patch();

function diff(text1, text2, opts) {
  text1 = text1 || "";
  text2 = text2 || "";

  opts = opts || {};
  opts.timeout = opts.timeout || 1;
  opts.cost = opts.cost || 2;
  opts.cleanup = opts.cleanup || "semantic";


  var ms_start = (new Date()).getTime();
  var d = dmp.diff_main(text1, text2);
  var ms_end = (new Date()).getTime();

  if (opts.cleanup === "semantic") {
    dmp.diff_cleanupSemantic(d);
  }
  if (opts.cleanup === "efficiency") {
    dmp.diff_cleanupEfficiency(d);
  }

  return dmp.diff_prettyHtml(d);
}

var textArea1;
var textArea2;

var launchButton = document.getElementById("launch");
launchButton.addEventListener("click", launch, false);

textArea1 = document.getElementById("text1");
textArea2 = document.getElementById("text2");

function launch() {
  console.log("comparing text areas...");
  var text1 = textArea1.value;
  var text2 = textArea2.value;

  var ds = diff(text1, text2);

  document.getElementById("outputdiv").innerHTML = ds;
}

launch();
