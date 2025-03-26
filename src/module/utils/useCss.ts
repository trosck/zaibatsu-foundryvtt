export function useCss(fileName: string) {
  const head = document.querySelector("head");
  if (!head) return;

  const link = document.createElement("link");

  link.setAttribute("rel", "stylesheet");
  link.setAttribute("type", "text/css");
  link.setAttribute("href", fileName);
  link.setAttribute("media", "all");

  head.append(link);
}
