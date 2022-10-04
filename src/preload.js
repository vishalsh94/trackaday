const { ipcRenderer } = require("electron");
const M = require("../node_modules/materialize-css/dist/js/materialize.min.js")

document.addEventListener("DOMContentLoaded", function () {
    // let myButton = document.getElementById("myButton");
    // myButton.addEventListener("click", () => {
    //     let txtBox = document.getElementById("myText");
    //     let txtVal = txtBox.value;

    //     ipcRenderer.send("saveText", txtVal);
    // });

    ipcRenderer.send("saveText", JSON.stringify({ a: 1 }));
})

M.AutoInit()