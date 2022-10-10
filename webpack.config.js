module.exports = {
    target: 'electron-renderer' ,
  //   externals: {
  //     "electron": "require('electron')",
  //     "child_process": "require('child_process')",
  //     "fs": "require('fs')",
  //     "path": "require('path')",
  //  },
    plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
          'process.env.MY_ENV': JSON.stringify(process.env.MY_ENV)
        })
    ],
    }