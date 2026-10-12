// BestClimate staging safety check — no network, no secrets, no production changes.
import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const pages=fs.readdirSync(root).filter(name=>name.endsWith('.html')&&fs.statSync(path.join(root,name)).isFile());
const problems=[];
for(const file of pages){
  const html=fs.readFileSync(path.join(root,file),'utf8');
  if(/Шолохов|Максима\s+Горького|281\s*[БB](?!\w)/iu.test(html))problems.push(file+': non-public location must not appear');
  if(!/<meta\s+name=["']robots["']\s+content=["']noindex/i.test(html))problems.push(file+': staging page lost noindex');
  if(!/<title[^>]*>[^<]+<\/title>/i.test(html))problems.push(file+': empty title');
  for(const href of html.matchAll(/\bhref=["']([^"'#?]+)(?:[#?][^"']*)?["']/gi)){
    const link=href[1];
    if(/^(https?:|mailto:|tel:|whatsapp:|javascript:|\/\/|data:)/i.test(link)||link.startsWith('/'))continue;
    const target=path.normalize(path.join(root,link));
    if(!target.startsWith(root+path.sep)||!fs.existsSync(target))problems.push(file+': broken local link '+link);
  }
}
if(pages.length<16)problems.push('Expected at least 16 staging pages, found '+pages.length);
const robots=fs.existsSync('robots.txt')?fs.readFileSync('robots.txt','utf8'):'';
if(!/Disallow:\s*\//i.test(robots))problems.push('Staging robots.txt must keep robots blocked to avoid duplicate indexation');
console.log('STAGING_SAFETY_CHECK',JSON.stringify({pages:pages.length,errors:problems.length,hiddenFromSearch:true}));
for(const message of problems)console.error('STAGING_ERROR',message);
if(problems.length)process.exitCode=1;
