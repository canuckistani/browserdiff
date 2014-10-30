var dmp = new diff_match_patch();

function makeTable(n) {
  return _.map(_.range(n), (i) => { 
    return _.map(_.range(n), (i) => {
      return _.map(_.range(n), (i) => {
        return String.fromCharCode(Math.floor((Math.random() * 30)) + 33);
      }).join('');
    });
  }); 
}

var myObject = {
  text: "some text",
  method: (n) => {
    alert("called method: " + n);
  },
  list: [1, 2, 3, 4, 5, 6, 7]
};

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

var textArea1 = document.querySelector("#text1");
var textArea2 = document.querySelector("#text2");

function launch() {
  console.log("comparing text areas...");
  var text1 = textArea1.value;
  var text2 = textArea2.value;

  var ds = diff(text1, text2);

  document.getElementById("outputdiv").innerHTML = ds;
}

document.querySelector("#launch").addEventListener('click', launch);
launch();
