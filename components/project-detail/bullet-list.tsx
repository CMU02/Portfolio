"use client";

interface BulletListProps {
  items: string[];
  bulletColor?: string;
  bulletChar?: string;
  textColor?: string;
}

// 재사용 가능한 불릿 리스트 컴포넌트
export function BulletList({
  items,
  bulletColor = "text-tech-cyan",
  bulletChar = "•",
  textColor = "text-muted-foreground",
}: BulletListProps) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex gap-2">
          <span className={bulletColor}>{bulletChar}</span>
          <span className={textColor}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
