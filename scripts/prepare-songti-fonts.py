"""Generate self-hosted Songti WOFF2 subsets from Google's official Fonts API.
Run after adding Chinese copy: python3 scripts/prepare-songti-fonts.py
The upstream font is Noto Serif SC, distributed under SIL OFL 1.1.
"""
from pathlib import Path
import urllib.request, urllib.parse, re, concurrent.futures
root=Path(__file__).resolve().parents[1]
output=root/'public/fonts';output.mkdir(exist_ok=True)
all_text=''.join(p.read_text() for p in (root/'src').rglob('*') if p.suffix in {'.js','.jsx','.ts','.tsx'} )
common='关于我拖动圆环轻点作品查看返回作品列表首页关闭跳至正文项目课程录制产品科研智能体教育创新研讨会创客松负空间特种车避让折叠屏交互方案线上慕课工作坊音乐体验设计人工智能'
common=set(common)
for relative in ['src/pages/home.tsx', 'src/components/mpa-chrome.tsx', 'src/components/project-index.tsx']:
    common|={c for c in (root/relative).read_text() if '\u4e00'<=c<='\u9fff'}
# The ring renders these labels in Canvas, so include all of them in the
# small UI subset rather than fetching the article subset on the homepage.
project_data=(root/'src/data/project-data.ts').read_text()
ring_data=(root/'src/carousel/ring/projects.js').read_text()
labels=''.join(re.findall(r'title: "([^"]+)"',project_data))
types=ring_data.split('const TYPES = {',1)[1].split('};',1)[0]
labels+=''.join(re.findall(r': "([^"]+)"',types))
common|={c for c in labels if '\u4e00'<=c<='\u9fff'}
all_chars={c for c in all_text if '\u4e00'<=c<='\u9fff'}
latin=set(chr(i) for i in range(32,127))|set('—–·←↗↓×「」／，。！？：；（）《》、…“”‘’')
sets={'latin':latin,'ui':common,'content':all_chars-common}
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
def download(name,chars):
 text=''.join(sorted(chars))
 url='https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400..700&display=swap&text='+urllib.parse.quote(text)
 req=urllib.request.Request(url,headers={'User-Agent':UA})
 css=urllib.request.urlopen(req,timeout=30).read().decode()
 match=re.search(r'url\((https://[^)]+)\)\s+format\([\'"]woff2[\'"]\)',css)
 if not match: raise RuntimeError(css[:500])
 data=urllib.request.urlopen(urllib.request.Request(match[1],headers={'User-Agent':UA}),timeout=45).read()
 if data[:4]!=b'wOF2':raise RuntimeError('Expected WOFF2')
 (output/f'songti-{name}.woff2').write_bytes(data)
 print(name,len(chars),'glyphs',len(data),'bytes',flush=True)
 ranges=','.join(f'U+{ord(c):X}' for c in sorted(chars))
 return f'''@font-face {{
  font-family: "Portfolio Songti";
  font-style: normal;
  font-weight: 400 700;
  font-display: swap;
  src: url("/fonts/songti-{name}.woff2") format("woff2");
  unicode-range: {ranges};
}}\n'''
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
 css=list(pool.map(lambda pair:download(*pair),sets.items()))
(root/'src/styles/fonts.css').write_text('/* Self-hosted Noto Serif SC, SIL OFL 1.1. Split to keep homepage loading small. */\n'+''.join(css))
