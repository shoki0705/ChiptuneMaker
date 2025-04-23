/**
 * URL.createObjectURL で生成した blob URL を
 * 指定したファイル名でダウンロードさせる
 */
export function downloadBlob(url: string, filename: string) {
    const a = document.createElement('a');
    a.href = url;            // blob URL
    a.download = filename;   // 保存時のファイル名
    document.body.appendChild(a);
    a.click();               // クリックを発火
    document.body.removeChild(a);
  }
  