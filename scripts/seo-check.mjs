import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const files = fs.readdirSync(root).filter(f => f.endsWith(".html")).sort();
let errors = [], warnings = [];
const titleSeen = new Map();
const descSeen = new Map();
for (const file of files) {
  const html = fs.readFileSync(path.join(root,file),"utf8");
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  const desc = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1]?.trim();
  const h1 = html.match(/<h1(?:\s[^>]*)?>[\s\S]*?<\/h1>/i);
  if (!title || title.length < 15) errors.push(file+": отсутствует нормальный title");
  if (!desc || desc.length < 65) errors.push(file+": нет полного meta description");
  if (!h1) errors.push(file+": нет H1");
  if (titleSeen.has(title)) errors.push(file+": дублирующийся title ("+titleSeen.get(title)+")");
  titleSeen.set(title,file);
  if (descSeen.has(desc)) errors.push(file+": дублирующийся description ("+descSeen.get(desc)+")");
  descSeen.set(desc,file);
  if (!/name="robots" content="noindex,nofollow"/.test(html)) errors.push(file+": тестовая версия должна оставаться noindex");
  if (!html.includes("assets/styles.css")) errors.push(file+": CSS не подключен");
  if (!html.includes("assets/app.js")) errors.push(file+": JS не подключен");
  const links = [...html.matchAll(/href="([^"]+)"/g)].map(m=>m[1]);
  for (const href of links) {
    const pathname = href.split("#")[0].split("?")[0];
    if (pathname && !pathname.startsWith("https:") && !pathname.startsWith("http:") && !pathname.startsWith("tel:") && !pathname.startsWith("mailto:") && !pathname.startsWith("/") && !pathname.startsWith("javascript:") && !fs.existsSync(path.join(root,pathname))) {
      errors.push(file+": не существует файл для ссылки "+pathname);
    }
  }
  const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const m of ldBlocks) {try{JSON.parse(m[1])}catch(e){errors.push(file+": некорректная JSON-LD разметка")}}
  if (title?.length > 85) warnings.push(file+": title длиннее 85 символов");
}
if (files.length < 16) errors.push("Недостаточно HTML-страниц: "+files.length);
const sitemap = fs.readFileSync(path.join(root,"sitemap.xml"),"utf8");
for (const file of files) if (!sitemap.includes("/"+file+"<")) errors.push("sitemap.xml не содержит "+file);
console.log("Страниц проверено:",files.length);
console.log("Предупреждения:",warnings.length);
warnings.forEach(w=>console.warn("WARN",w));
console.log("Ошибки:",errors.length);
errors.forEach(e=>console.error("ERROR",e));
if(errors.length)process.exitCode=1;