const { contextBridge, ipcRenderer } = require('electron')
const M = require('../node_modules/materialize-css/dist/js/materialize')
var global = global || window;
var Buffer = Buffer || [];
var process = process || {
  env: { DEBUG: undefined },
  version: []
};
document.addEventListener("DOMContentLoaded", function () {
    // let myButton = document.getElementById("myButton");
    // myButton.addEventListener("click", () => {
    //     let txtBox = document.getElementById("myText");
    //     let txtVal = txtBox.value;

    //     ipcRenderer.send("saveText", txtVal);
    // });

    // ipcRenderer.send("saveText", JSON.stringify({ a: 1 }));
})

// contextBridge.exposeInMainWorld('electronAPI', {
//     saveText: (txtVal) => ipcRenderer.send('saveText', txtVal)
// })

// M.AutoInit()