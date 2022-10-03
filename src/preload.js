const { ipcRenderer } = require("electron");

document.addEventListener("DOMContentLoaded", function () {
    // let myButton = document.getElementById("myButton");
    // myButton.addEventListener("click", () => {
    //     let txtBox = document.getElementById("myText");
    //     let txtVal = txtBox.value;

    //     ipcRenderer.send("saveText", txtVal);
    // });

    ipcRenderer.send("saveText", JSON.stringify({ a: 1 }));
})