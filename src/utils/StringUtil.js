export function kebabCaseToCamelCase (str) {
  if (!str) {
    return str
  }
  return str.split('-').reduce((pre, cur, index) => index === 0 ? cur : pre + cur.substr(0, 1).toUpperCase() + cur.substr(1), '')
}
