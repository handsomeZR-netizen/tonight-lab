import { Github, Sparkles } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/70 bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-slate-950">
            <Sparkles className="h-4 w-4 text-amber-600" />
            Tonight Lab
          </p>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
            一个把“今晚到底做什么”包装成 AI 场景叙事的沉浸式信息流 demo。
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 sm:gap-10">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              四个今晚
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>
                <a className="hover:text-slate-950" href="/cards/food">
                  今晚吃什么
                </a>
              </li>
              <li>
                <a className="hover:text-slate-950" href="/cards/trip">
                  3 小时城市逃逸
                </a>
              </li>
              <li>
                <a className="hover:text-slate-950" href="/cards/sports">
                  赛前 15 分钟
                </a>
              </li>
              <li>
                <a className="hover:text-slate-950" href="/cards/recovery">
                  下班回血
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              关于
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>
                <a
                  className="inline-flex items-center gap-1.5 hover:text-slate-950"
                  href="https://github.com"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Github className="h-3.5 w-3.5" />
                  Source
                </a>
              </li>
              <li className="text-slate-500">
                <span className="font-mono text-[11px]">↑↓ 切卡 · Esc 回顶</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl items-center justify-between border-t border-slate-200 pt-6 text-[11px] text-slate-500">
        <p>Built with Next.js · React · Tailwind · Framer Motion · Three.js</p>
        <p>Tonight Lab · Editorial Demo</p>
      </div>
    </footer>
  );
}
