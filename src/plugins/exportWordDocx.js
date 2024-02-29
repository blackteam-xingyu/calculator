import JSZipUtils from "jszip-utils";
import docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { ipcRenderer } from "electron";

export const exportWordDocx = (demoUrl, docxData, fileName, filePath) => {
  return new Promise((resolve, reject) => {
    // 读取并获得模板文件的二进制内容
    JSZipUtils.getBinaryContent(demoUrl, function (error, content) {
      // 抛出异常
      if (error) {
        reject(error);
        return;
      }
      console.log(demoUrl, docxData, fileName, filePath);
      // 创建一个PizZip实例，内容为模板的内容
      let zip = new PizZip(content);
      // 创建并加载docxtemplater实例对象
      let doc = new docxtemplater().loadZip(zip);
      // 去除未定义值所显示的undefined
      doc.setOptions({
        nullGetter: function () {
          return "";
        },
      }); // 设置角度解析器
      // 设置模板变量的值，对象的键需要和模板上的变量名一致，值就是你要放在模板上的值

      doc.setData({
        ...docxData,
      });

      doc.render();

      // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
      let out = doc.getZip().generate({
        type: "arraybuffer",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      // 将目标文件对象保存为目标类型的文件，并命名
      //   fs.writeFile(fileName, out, function (err) {
      //     if (err) throw err;
      //   });
      console.log("save");
      const buffer = Buffer.from(out);
      ipcRenderer
        .invoke("saveFile", buffer, fileName, filePath)
        .then((is) => {
          resolve(is);
        })
        .catch((err) => {
          console.log(out);
          console.error(err);
          resolve(false);
        });
    });
  });
};
