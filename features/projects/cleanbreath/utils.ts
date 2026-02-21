// CleanBreath 프로젝트 유틸리티 함수

/**
 * 날짜를 한국어 형식으로 포맷팅
 */
export function formatDateKorean(dateString: string): string {
  return new Date(dateString).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * 변화율에 따른 색상 클래스 반환
 */
export function getChangeColorClass(change: string): string {
  return change.startsWith("+") ? "text-green-400" : "text-yellow-400";
}
