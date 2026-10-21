export const THEME_STORAGE_KEY = "theme";

// 첫 페인트 전에 <head>에서 실행: 저장값("light" | "dark") 우선, 없거나 읽기 실패면 OS 설정
export const themeInitScript = `(function(){try{var t=null;try{t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)})}catch(e){}var d=t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);var r=document.documentElement;r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light"}catch(e){}})()`;
