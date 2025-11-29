import { cn } from "@/lib/utils";

interface LogoIconProps {
  className?: string;
  size?: number;
}

// </> 형태의 코드 브라켓 로고 SVG
export function LogoIcon({ className, size = 24 }: LogoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-primary", className)}
    >
      {/* < 기호 */}
      <path
        d="M9 6L3 12L9 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* / 기호 */}
      <path
        d="M14 4L10 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* > 기호 */}
      <path
        d="M15 6L21 12L15 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <LogoIcon size={28} className="text-tech-cyan" />
      {showText && <span className="font-bold text-xl">CMU02</span>}
    </div>
  );
}
