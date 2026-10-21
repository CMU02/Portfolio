// 코드 블록: 제목 + 언어 배지 헤더와 가로 스크롤 본문
import { Badge } from "@/components/ui/badge";

interface CodeBlockProps {
  title: string | null;
  language: string | null;
  code: string;
}

export function CodeBlock({ title, language, code }: CodeBlockProps) {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      {(title || language) && (
        <div className="flex flex-wrap items-center gap-2 bg-muted/50 px-4 py-2 border-b border-border">
          {title && (
            <p className="text-xs font-medium text-muted-foreground">{title}</p>
          )}
          {language && (
            <Badge variant="outline" className="text-xs">
              {language}
            </Badge>
          )}
        </div>
      )}
      {/* 가로 스크롤 영역은 키보드로도 스크롤할 수 있게 포커스를 받는다 */}
      <pre
        tabIndex={0}
        className="p-4 text-sm overflow-x-auto focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring focus-visible:outline-none"
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
