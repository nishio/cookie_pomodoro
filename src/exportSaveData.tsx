import { getGlobal } from "reactn";

export const exportSaveData = () => {
  const s = JSON.stringify(getGlobal());
  copyToClipboard(s);
  document.write(s);
};

export const copyToClipboard = (text: string) => {
  // 目的の文字列が入ったtextareaエレメントを作成し、
  // 0から999999文字目まで選択してコピーコマンドを実行
  // iOS, MacともSafariで動作確認済み
  const a = document.createElement("textarea");
  a.value = text;
  document.body.appendChild(a);
  // @ts-ignore
  a.contentEditable = true;
  a.readOnly = false;
  a.setSelectionRange(0, 999999);
  a.focus();
  document.execCommand("copy");
  a.blur();
  document.body.removeChild(a);
};
