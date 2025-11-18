// src/utils/generateConsistentFileName.js
/**
 * Generate a consistent file name for download, including method and mode if provided
 * @param {string} ext - File extension (e.g. 'pdf', 'xlsx')
 * @param {string} [method] - Cipher method (optional)
 * @param {string} [mode] - Mode (optional)
 */
export function generateConsistentFileName(ext, method, mode) {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  const date = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  let name = `cipherplayground`;
  if (method) name += `-${method}`;
  if (mode) name += `-${mode}`;
  name += `-${date}-${time}.${ext}`;
  return name;
}
