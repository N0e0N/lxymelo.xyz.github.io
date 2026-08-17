// 拼接部署子路径：base 为 "/" 时退化为原路径，无需改动调用方
export const withBase = (path: string): string => {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, "");
  return path === "/" ? `${base}/` : `${base}${path}`;
};
