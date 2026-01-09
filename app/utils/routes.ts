export function normaliseUrl(path: string) {
  return path.split(" ").reduce((p, c) => {
    c = c.replace(c.charAt(0), c.charAt(0).toUpperCase());
    return p.concat(c);
  }, "");
}
