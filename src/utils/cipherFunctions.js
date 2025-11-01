const ALPHA_LOWER = 'abcdefghijklmnopqrstuvwxyz'
const ALPHA_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function atbashChar(ch) {
    if (ch >= 'A' && ch <= 'Z') {
        return String.fromCharCode(65 + (25 - (ch.charCodeAt(0) - 65)));
    }
    if (ch >= 'a' && ch <= 'z') {
        return String.fromCharCode(97 + (25 - (ch.charCodeAt(0) - 97)));
    }
    return null;
}

function rot13Char(ch) {
    return caesarChar(ch, 13);
}

function caesarChar(ch, shift) {
    if (ch >= 'A' && ch <= 'Z') {
        return String.fromCharCode(((ch.charCodeAt(0) - 65 + shift) % 26) + 65);
    }
    if (ch >= 'a' && ch <= 'z') {
        return String.fromCharCode(((ch.charCodeAt(0) - 97 + shift) % 26) + 97);
    }
    return null;
}

// Rail Fence Cipher - Encode
function railFenceEncode(text, rails) {
  if (rails <= 1) return text;
  
  const fence = Array.from({ length: rails }, () => []);
  let rail = 0;
  let direction = 1; // 1 = down, -1 = up
  
  for (let i = 0; i < text.length; i++) {
    fence[rail].push(text[i]);
    rail += direction;
    
    if (rail === 0 || rail === rails - 1) {
      direction *= -1;
    }
  }
  
  return fence.flat().join('');
}

// Rail Fence Cipher - Decode
function railFenceDecode(text, rails) {
  if (rails <= 1) return text;
  
  const fence = Array.from({ length: rails }, () => []);
  const positions = [];
  let rail = 0;
  let direction = 1;
  
  // Determine positions
  for (let i = 0; i < text.length; i++) {
    positions.push(rail);
    rail += direction;
    
    if (rail === 0 || rail === rails - 1) {
      direction *= -1;
    }
  }
  
  // Count chars per rail
  const railLengths = Array(rails).fill(0);
  positions.forEach(r => railLengths[r]++);
  
  // Distribute characters to rails
  let index = 0;
  for (let r = 0; r < rails; r++) {
    for (let i = 0; i < railLengths[r]; i++) {
      fence[r].push(text[index++]);
    }
  }
  
  // Read in zigzag order
  const result = [];
  rail = 0;
  direction = 1;
  const railIndices = Array(rails).fill(0);
  
  for (let i = 0; i < text.length; i++) {
    result.push(fence[rail][railIndices[rail]++]);
    rail += direction;
    
    if (rail === 0 || rail === rails - 1) {
      direction *= -1;
    }
  }
  
  return result.join('');
}

// Random Transposition - Encode (Block-based with pattern)
function randomTranspositionEncode(text, blockSize, pattern, paddingEnabled = false) {
  if (!blockSize || blockSize === '' || text.length === 0) return text;
  if (!pattern || pattern === '') return text;
  
  const size = parseInt(blockSize, 10);
  if (isNaN(size) || size < 2) return text;
  
  // Parse pattern (e.g., "4,1,3,2" -> [3,0,2,1] for 0-based index)
  let patternArray;
  if (typeof pattern === 'string' && pattern.includes(',')) {
    patternArray = pattern.split(',').map(n => parseInt(n.trim(), 10) - 1);
  } else {
    return text;
  }
  
  // Validate pattern
  if (patternArray.length !== size) return text;
  
  // Remove spaces from text first
  let cleanText = text.replace(/\s/g, '');
  
  // Add padding if enabled and needed
  if (paddingEnabled) {
    const remainder = cleanText.length % size;
    if (remainder !== 0) {
      const paddingNeeded = size - remainder;
      for (let i = 0; i < paddingNeeded; i++) {
        // Add random lowercase letter padding
        cleanText += String.fromCharCode(97 + Math.floor(Math.random() * 26));
      }
    }
  }
  
  let result = '';
  
  // Process each block
  for (let i = 0; i < cleanText.length; i += size) {
    const block = cleanText.slice(i, i + size);
    
    // If block is complete, transpose with pattern
    if (block.length === size) {
      for (let j = 0; j < patternArray.length; j++) {
        const sourceIndex = patternArray[j];
        result += block[sourceIndex];
      }
    } else {
      // If block is incomplete, add characters as-is (no transposition)
      result += block;
    }
  }
  
  return result;
}

// Random Transposition - Decode (Reverse block transposition)
function randomTranspositionDecode(text, blockSize, pattern) {
  if (!blockSize || blockSize === '' || text.length === 0) return text;
  if (!pattern || pattern === '') return text;
  
  const size = parseInt(blockSize, 10);
  if (isNaN(size) || size < 2) return text;
  
  // Parse pattern
  let patternArray;
  if (typeof pattern === 'string' && pattern.includes(',')) {
    patternArray = pattern.split(',').map(n => parseInt(n.trim(), 10) - 1);
  } else {
    return text;
  }
  
  // Validate pattern
  if (patternArray.length !== size) return text;
  
  let result = '';
  
  // Process each block
  for (let i = 0; i < text.length; i += size) {
    const block = text.slice(i, i + size);
    
    // If block is complete, reverse transpose with pattern
    if (block.length === size) {
      const decodedBlock = new Array(size);
      
      // CORRECT decoding logic:
      // If encode did: result[j] = original[pattern[j]]
      // Then decode should: result[pattern[j]] = cipher[j]
      for (let j = 0; j < size; j++) {
        decodedBlock[patternArray[j]] = block[j];
      }
      
      result += decodedBlock.join('');
    } else {
      // If block is incomplete, add characters as-is (no transposition was done)
      result += block;
    }
  }
  
  return result;
}

// Columnar Transposition - Encode
function columnarEncode(text, key, paddingEnabled = false, keyType = 'text') {
  if (!key || key.length === 0) return text;
  
  // Remove spaces from text
  let cleanText = text.replace(/\s/g, '');
  
  let keyOrder;
  let numCols;
  
  // Check if key is number-based (single digit or comma-separated)
  // HANYA jika keyType adalah 'number'
  if (keyType === 'number' && /^\d+$/.test(key)) {
    // Simple number key: just number of columns (e.g., "5")
    numCols = parseInt(key, 10);
    
    // Safety: batasi maksimal 100 kolom untuk pure numeric
    if (numCols > 100) {
      numCols = 100;
    }
    
    // Sequential order: 0,1,2,3,4...
    keyOrder = Array.from({ length: numCols }, (_, i) => i);
  } else if (/^\d+(,\d+)+$/.test(key)) {
    // Comma-separated number key (e.g., "3,1,4,2,5")
    const numbers = key.split(',').map(n => parseInt(n.trim(), 10));
    numCols = numbers.length;
    // Convert to 0-based ranking
    keyOrder = numbers.map(n => n - 1);
  } else {
    // Text key: alphabetical sorting
    const keyChars = [...key.toUpperCase()];
    keyOrder = keyChars
      .map((char, idx) => ({ char, idx }))
      .sort((a, b) => a.char.localeCompare(b.char))
      .map((item, rank) => ({ originalIdx: item.idx, rank }))
      .sort((a, b) => a.originalIdx - b.originalIdx)
      .map(item => item.rank);
    numCols = key.length;
  }
  
  // Add random padding if enabled
  if (paddingEnabled) {
    const remainder = cleanText.length % numCols;
    if (remainder !== 0) {
      const paddingNeeded = numCols - remainder;
      for (let i = 0; i < paddingNeeded; i++) {
        // Add random lowercase letter padding
        cleanText += String.fromCharCode(97 + Math.floor(Math.random() * 26));
      }
    }
  }
  
  const numRows = Math.ceil(cleanText.length / numCols);
  const grid = Array.from({ length: numRows }, () => Array(numCols).fill(''));
  
  // Fill grid row by row (horizontal)
  let index = 0;
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      if (index < cleanText.length) {
        grid[r][c] = cleanText[index++];
      }
    }
  }
  
  // Read columns vertically in sorted key order (rank 0, 1, 2, ...)
  let result = '';
  for (let rank = 0; rank < numCols; rank++) {
    const colIdx = keyOrder.indexOf(rank);
    for (let r = 0; r < numRows; r++) {
      if (grid[r][colIdx]) {
        result += grid[r][colIdx];
      }
    }
  }
  
  return result;
}

// Columnar Transposition - Decode
function columnarDecode(text, key, keyType = 'text') {
  if (!key || key.length === 0) return text;
  
  let keyOrder;
  let numCols;
  
  // Check if key is number-based (single digit or comma-separated)
  // HANYA jika keyType adalah 'number'
  if (keyType === 'number' && /^\d+$/.test(key)) {
    // Simple number key: just number of columns (e.g., "5")
    numCols = parseInt(key, 10);
    
    // Safety: batasi maksimal 100 kolom untuk pure numeric
    if (numCols > 100) {
      numCols = 100;
    }
    
    // Sequential order: 0,1,2,3,4...
    keyOrder = Array.from({ length: numCols }, (_, i) => i);
  } else if (/^\d+(,\d+)+$/.test(key)) {
    // Comma-separated number key (e.g., "3,1,4,2,5")
    const numbers = key.split(',').map(n => parseInt(n.trim(), 10));
    numCols = numbers.length;
    // Convert to 0-based ranking
    keyOrder = numbers.map(n => n - 1);
  } else {
    // Text key: alphabetical sorting
    const keyChars = [...key.toUpperCase()];
    keyOrder = keyChars
      .map((char, idx) => ({ char, idx }))
      .sort((a, b) => a.char.localeCompare(b.char))
      .map((item, rank) => ({ originalIdx: item.idx, rank }))
      .sort((a, b) => a.originalIdx - b.originalIdx)
      .map(item => item.rank);
    numCols = key.length;
  }
  
  const numRows = Math.ceil(text.length / numCols);
  const grid = Array.from({ length: numRows }, () => Array(numCols).fill(''));
  
  let result = '';
  
  // For simple number key (e.g., "5"), fill vertically and read horizontally
  if (/^\d+$/.test(key)) {
    // Fill grid column by column (vertically)
    let index = 0;
    for (let c = 0; c < numCols; c++) {
      for (let r = 0; r < numRows; r++) {
        if (index < text.length) {
          grid[r][c] = text[index++];
        }
      }
    }
    
    // Read row by row (horizontally)
    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        if (grid[r][c]) {
          result += grid[r][c];
        }
      }
    }
  } else {
    // Text key or comma-separated: original logic
    const totalCells = text.length;
    const fullRows = Math.floor(totalCells / numCols);
    const remainder = totalCells % numCols;
    
    // Fill grid column by column in sorted key order
    let index = 0;
    for (let rank = 0; rank < numCols; rank++) {
      const colIdx = keyOrder.indexOf(rank);
      
      // Determine column height: full columns have fullRows + 1, others have fullRows
      let colHeight;
      if (remainder === 0) {
        colHeight = fullRows;
      } else {
        // Columns that should have extra cell
        colHeight = colIdx < remainder ? fullRows + 1 : fullRows;
      }
      
      for (let r = 0; r < colHeight; r++) {
        if (index < text.length) {
          grid[r][colIdx] = text[index++];
        }
      }
    }
    
    // Read row by row (horizontal)
    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        if (grid[r][c]) {
          result += grid[r][c];
        }
      }
    }
  }
  
  return result;
}

function makeMapper(method, shift) {
  switch (method) {
    case 'atbash':
      return atbashChar;
    case 'rot13':
      return rot13Char;
    case 'caesar':
      return (ch) => caesarChar(ch, shift);
    default:
      return (ch) => ch;
  }
}

function transform(text, method, caseStrategy, foreignMode, shift, rails, columnarKey, mode, paddingEnabled = false, columnarKeyType = 'text', randomBlockSize = '4', randomPattern = '4,1,3,2', randomPaddingEnabled = false) {
  // Untuk transposisi cipher, proses berbeda (tidak terpengaruh foreignMode)
  if (method === 'railfence') {
    if (mode === 'encode') {
      return railFenceEncode(text, rails);
    } else {
      return railFenceDecode(text, rails);
    }
  }
  
  if (method === 'random') {
    if (!randomBlockSize || randomBlockSize === '' || !randomPattern || randomPattern === '') {
      return text; // Jika tidak ada blockSize/pattern, kembalikan text asli
    }
    if (mode === 'encode') {
      // Padding hanya aktif saat encode
      return randomTranspositionEncode(text, randomBlockSize, randomPattern, randomPaddingEnabled);
    } else {
      // Decode tidak perlu padding
      return randomTranspositionDecode(text, randomBlockSize, randomPattern);
    }
  }
  
  if (method === 'columnar') {
    if (!columnarKey || columnarKey.length === 0) {
      return text; // Jika tidak ada key, kembalikan text asli
    }
    if (mode === 'encode') {
      return columnarEncode(text, columnarKey, paddingEnabled, columnarKeyType);
    } else {
      return columnarDecode(text, columnarKey, columnarKeyType);
    }
  }
  
  // Untuk substitution cipher (atbash, rot13, caesar)
  const map = makeMapper(method, shift);
  let out = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const isLetter = /[A-Za-z]/.test(ch);

    if (!isLetter) {
      if (foreignMode === 'include') {
        out += ch;
      }
      continue;
    }

    const mappedChar = map(ch);
    if (!mappedChar) {
        out += ch;
        continue;
    }
    
    // Untuk ROT13, selalu pertahankan case
    const effectiveCaseStrategy = method === 'rot13' ? 'maintain' : caseStrategy;

    switch (effectiveCaseStrategy) {
      case 'strict':
        if (ch >= 'a' && ch <= 'z') {
          out += mappedChar; // Transform only lowercase
        } else {
          out += ch; // Keep uppercase as is
        }
        break;
      case 'ignore': // Force lowercase output
        out += mappedChar.toLowerCase();
        break;
      case 'maintain':
      default:
        out += mappedChar;
        break;
    }
  }
  return out;
}

function ciphertextAlphabet(method, shift) {
  if (method === 'atbash') return ALPHA_LOWER.split('').reverse().join('')
  const effectiveShift = method === 'rot13' ? 13 : shift;
  return ALPHA_LOWER.split('').map((_c, i) => ALPHA_LOWER[(i + effectiveShift) % 26]).join('')
}

export {
  ALPHA_LOWER,
  ALPHA_UPPER,
  atbashChar,
  rot13Char,
  caesarChar,
  railFenceEncode,
  railFenceDecode,
  columnarEncode,
  columnarDecode,
  transform,
  ciphertextAlphabet
}
