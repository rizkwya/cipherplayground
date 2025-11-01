import {
  INDONESIAN_WORDS, ENGLISH_WORDS,
  INDONESIAN_BIGRAMS, ENGLISH_BIGRAMS,
  INDONESIAN_TRIGRAMS, ENGLISH_TRIGRAMS,
  INDONESIAN_QUADGRAMS, ENGLISH_QUADGRAMS,
  INDONESIAN_PENTAGRAMS,
  INDONESIAN_HEXAGRAMS,
  INDONESIAN_WORD_PAIRS,
  INDONESIAN_LETTER_FREQ, ENGLISH_LETTER_FREQ
} from './dictionaryWords.js';

/**
 * Score decoded text based on multiple criteria
 * Higher score = more likely to be correct plaintext
 */
export function scoreText(text, quick = false) {
  if (!text || text.length === 0) return 0;
  
  const cleanText = text.toLowerCase().replace(/[^a-z]/g, '');
  if (cleanText.length === 0) return 0;
  
  // Quick scoring for large block sizes (much faster!)
  if (quick) {
    return quickScore(cleanText);
  }
  
  let score = 0;
  
  // 1. Dictionary word matching (40 points max)
  const wordScore = calculateWordScore(cleanText);
  score += wordScore * 40;
  
  // 2. Bigram frequency (30 points max)
  const bigramScore = calculateBigramScore(cleanText);
  score += bigramScore * 30;
  
  // 3. Letter frequency analysis (20 points max)
  const freqScore = calculateFrequencyScore(cleanText);
  score += freqScore * 20;
  
  // 4. Readability (10 points max)
  const readabilityScore = calculateReadabilityScore(cleanText);
  score += readabilityScore * 10;
  
  return Math.min(100, Math.round(score));
}

// Cache Sets for O(1) lookup performance
const BIGRAM_SET = new Set([...INDONESIAN_BIGRAMS, ...ENGLISH_BIGRAMS]);
const TRIGRAM_SET = new Set([...INDONESIAN_TRIGRAMS, ...ENGLISH_TRIGRAMS]);
const QUADGRAM_SET = new Set([...INDONESIAN_QUADGRAMS, ...ENGLISH_QUADGRAMS]);
const PENTAGRAM_SET = new Set(INDONESIAN_PENTAGRAMS);
const HEXAGRAM_SET = new Set(INDONESIAN_HEXAGRAMS);
const WORD_SET = new Set([...INDONESIAN_WORDS, ...ENGLISH_WORDS]);

/**
 * MAXIMUM ACCURACY scoring with 6-grams + 5-grams + statistical analysis
 * Layered: Hexagrams (15%) + Pentagrams (15%) + Others (35%) + Dictionary (25%) + Stats (10%)
 */
function quickScore(text) {
  if (!text || text.length < 2) return 0;
  
  let score = 0;
  
  // 0. HEXAGRAM frequency (15% weight) - GODLIKE POWER! 🔥
  if (text.length >= 6) {
    let hexagramCount = 0;
    for (let i = 0; i < text.length - 5; i++) {
      const hexagram = text.slice(i, i + 6);
      if (HEXAGRAM_SET.has(hexagram)) {
        hexagramCount += 8; // INSANE weight (8x bigram!)
      }
    }
    const hexagramScore = Math.min(15, (hexagramCount / (text.length - 5)) * 20);
    score += hexagramScore;
  }
  
  // 1. PENTAGRAM frequency (15% weight) - ULTIMATE POWER!
  if (text.length >= 5) {
    let pentagramCount = 0;
    for (let i = 0; i < text.length - 4; i++) {
      const pentagram = text.slice(i, i + 5);
      if (PENTAGRAM_SET.has(pentagram)) {
        pentagramCount += 5; // MEGA weight (5x bigram!)
      }
    }
    const pentagramScore = Math.min(15, (pentagramCount / (text.length - 4)) * 18);
    score += pentagramScore;
  }
  
  // 2. QUADGRAM frequency (12% weight) - Still powerful!
  if (text.length >= 4) {
    let quadgramCount = 0;
    for (let i = 0; i < text.length - 3; i++) {
      const quadgram = text.slice(i, i + 4);
      if (QUADGRAM_SET.has(quadgram)) {
        quadgramCount += 2; // Double weight
      }
    }
    const quadgramScore = Math.min(12, (quadgramCount / (text.length - 3)) * 15);
    score += quadgramScore;
  }
  
  // 3. TRIGRAM frequency (8% weight)
  if (text.length >= 3) {
    let trigramCount = 0;
    for (let i = 0; i < text.length - 2; i++) {
      const trigram = text.slice(i, i + 3);
      if (TRIGRAM_SET.has(trigram)) {
        trigramCount++;
      }
    }
    const trigramScore = Math.min(8, (trigramCount / (text.length - 2)) * 10);
    score += trigramScore;
  }
  
  // 4. BIGRAM frequency (5% weight)
  if (text.length >= 2) {
    let bigramCount = 0;
    for (let i = 0; i < text.length - 1; i++) {
      const bigram = text.slice(i, i + 2);
      if (BIGRAM_SET.has(bigram)) {
        bigramCount++;
      }
    }
    const bigramScore = Math.min(5, (bigramCount / (text.length - 1)) * 8);
    score += bigramScore;
  }
  
  // 4. DICTIONARY WORD detection (25% weight) - Enhanced with partial matching
  let wordMatchScore = 0;
  let longestWordFound = 0;
  let totalWordCoverage = 0;
  
  // Sort words by length (longer first for better matching)
  const sortedWords = [...WORD_SET].sort((a, b) => b.length - a.length);
  
  sortedWords.forEach(word => {
    if (word.length >= 3 && text.includes(word)) {
      // Longer words get exponentially higher scores
      const wordValue = Math.pow(word.length, 1.5);
      wordMatchScore += wordValue;
      longestWordFound = Math.max(longestWordFound, word.length);
      totalWordCoverage += word.length;
    }
  });
  
  // MEGA BONUS multipliers
  if (longestWordFound >= 7) {
    wordMatchScore *= 2.5; // 2.5x for 7+ letter words (super reliable!)
  } else if (longestWordFound >= 6) {
    wordMatchScore *= 2.0; // 2x for 6-letter words (very reliable!)
  } else if (longestWordFound >= 5) {
    wordMatchScore *= 1.5; // 1.5x for 5-letter words
  }
  
  // Coverage bonus: if words cover significant portion of text
  const coverageRatio = totalWordCoverage / text.length;
  if (coverageRatio > 0.6) {
    wordMatchScore *= 1.5; // 50% bonus if >60% text is real words
  } else if (coverageRatio > 0.4) {
    wordMatchScore *= 1.3; // 30% bonus if >40% text is real words
  }
  
  score += Math.min(25, wordMatchScore);
  
  // BONUS: Vowel-Consonant Pattern Analysis (Indonesian naturally alternates V-C)
  const vowels = 'aiueo';
  let vcTransitions = 0;
  let totalTransitions = 0;
  
  for (let i = 0; i < text.length - 1; i++) {
    const curr = text[i];
    const next = text[i + 1];
    const currIsVowel = vowels.includes(curr);
    const nextIsVowel = vowels.includes(next);
    
    // Count V->C or C->V transitions (natural in Indonesian)
    if (currIsVowel !== nextIsVowel) {
      vcTransitions++;
    }
    totalTransitions++;
  }
  
  // Indonesian has ~60-70% V-C alternation (CVCV pattern like: "ba-ca", "ma-kan")
  const vcRatio = vcTransitions / totalTransitions;
  if (vcRatio >= 0.55 && vcRatio <= 0.75) {
    score += 5; // Bonus for natural V-C pattern
  } else if (vcRatio >= 0.45 && vcRatio < 0.55) {
    score += 2; // Small bonus for acceptable pattern
  }
  
  // BONUS: Common double-letter patterns in Indonesian
  const doublePatterns = ['ng', 'ny', 'sy', 'kh', 'gh', 'dh', 'th'];
  let doubleCount = 0;
  for (const pattern of doublePatterns) {
    const regex = new RegExp(pattern, 'g');
    const matches = text.match(regex);
    if (matches) {
      doubleCount += matches.length;
    }
  }
  if (doubleCount > 0) {
    score += Math.min(5, doubleCount * 0.5); // Up to 5 points bonus
  }
  
  // NEW FEATURE 1: Word pair detection (+5 points max)
  let pairCount = 0;
  const textLower = text.toLowerCase();
  for (const pair of INDONESIAN_WORD_PAIRS) {
    if (textLower.includes(pair)) {
      pairCount++;
      score += 1.5; // Each pair = +1.5 points
    }
  }
  if (pairCount > 0) {
    score += Math.min(5, pairCount * 0.5); // Cap at +5 total
  }
  
  // NEW FEATURE 2: Entropy analysis (+5 points bonus)
  // Real Indonesian text has entropy ~4.0-4.5 bits/char
  // Gibberish: too low (<3.5) or too high (>5.0)
  if (text.length >= 10) {
    const charFreq = {};
    for (const char of text.toLowerCase()) {
      if (/[a-z]/.test(char)) {
        charFreq[char] = (charFreq[char] || 0) + 1;
      }
    }
    
    let entropy = 0;
    const totalChars = Object.values(charFreq).reduce((a, b) => a + b, 0);
    for (const count of Object.values(charFreq)) {
      const p = count / totalChars;
      entropy -= p * Math.log2(p);
    }
    
    // Bonus for entropy in ideal range (3.8 - 4.7)
    if (entropy >= 3.8 && entropy <= 4.7) {
      score += 5; // Perfect entropy!
    } else if (entropy >= 3.5 && entropy <= 5.0) {
      score += 3; // Acceptable entropy
    } else if (entropy >= 3.0 && entropy <= 5.5) {
      score += 1; // Marginally acceptable
    }
  }
  
  // NEW FEATURE 3: Chi-squared test for letter frequency (+5 points bonus)
  // Compare against expected Indonesian letter frequencies
  if (text.length >= 20) {
    const expectedFreq = {
      'a': 19.0, 'e': 12.5, 'i': 10.5, 'o': 8.0, 'u': 7.5, // Vowels
      'n': 9.5, 't': 7.0, 's': 6.5, 'r': 6.0, 'k': 5.5, // Common consonants
      'd': 5.0, 'l': 4.5, 'm': 4.0, 'p': 3.5, 'g': 3.0,
      'b': 2.5, 'y': 2.0, 'h': 1.8, 'j': 1.5, 'w': 1.2,
      'c': 1.0, 'f': 0.5, 'v': 0.3, 'z': 0.2, 'q': 0.1, 'x': 0.1
    };
    
    const charCount = {};
    let totalLetters = 0;
    for (const char of text.toLowerCase()) {
      if (/[a-z]/.test(char)) {
        charCount[char] = (charCount[char] || 0) + 1;
        totalLetters++;
      }
    }
    
    let chiSquared = 0;
    for (const [char, expectedPct] of Object.entries(expectedFreq)) {
      const observed = charCount[char] || 0;
      const expected = (expectedPct / 100) * totalLetters;
      if (expected > 0) {
        chiSquared += Math.pow(observed - expected, 2) / expected;
      }
    }
    
    // Lower chi-squared = closer to Indonesian frequency
    // Typical range: 10-50 for real text, >100 for gibberish
    if (chiSquared < 30) {
      score += 5; // Excellent match!
    } else if (chiSquared < 50) {
      score += 3; // Good match
    } else if (chiSquared < 80) {
      score += 1; // Acceptable match
    }
  }
  
  // NEW FEATURE 4: Repeated word detection (+3 points bonus)
  // Natural text often repeats important words
  const textWords = text.toLowerCase().split(/\s+/).filter(w => w.length >= 3);
  const uniqueWords = new Set(textWords);
  if (textWords.length > 0 && uniqueWords.size < textWords.length) {
    const repetitionRatio = (textWords.length - uniqueWords.size) / textWords.length;
    if (repetitionRatio >= 0.2 && repetitionRatio <= 0.5) {
      score += 3; // Healthy repetition (20-50%)
    } else if (repetitionRatio > 0.1 && repetitionRatio < 0.6) {
      score += 1; // Some repetition
    }
  }
  
  return Math.min(100, score);
}

/**
 * Check how many dictionary words exist in the text
 */
function calculateWordScore(text) {
  const allWords = [...INDONESIAN_WORDS, ...ENGLISH_WORDS];
  let matchCount = 0;
  let totalLength = 0;
  
  allWords.forEach(word => {
    if (text.includes(word)) {
      matchCount++;
      totalLength += word.length;
    }
  });
  
  // Longer words are more significant
  const lengthBonus = totalLength / text.length;
  return Math.min(1, (matchCount * 0.1) + lengthBonus);
}

/**
 * Calculate bigram frequency score
 */
function calculateBigramScore(text) {
  if (text.length < 2) return 0;
  
  const allBigrams = [...INDONESIAN_BIGRAMS, ...ENGLISH_BIGRAMS];
  let matchCount = 0;
  let totalBigrams = text.length - 1;
  
  for (let i = 0; i < text.length - 1; i++) {
    const bigram = text.substring(i, i + 2);
    if (allBigrams.includes(bigram)) {
      matchCount++;
    }
  }
  
  return matchCount / totalBigrams;
}

/**
 * Calculate letter frequency score (Chi-squared test)
 */
function calculateFrequencyScore(text) {
  const letterCounts = {};
  
  // Count letters
  for (const char of text) {
    letterCounts[char] = (letterCounts[char] || 0) + 1;
  }
  
  // Calculate chi-squared for both languages
  const idScore = calculateChiSquared(letterCounts, text.length, INDONESIAN_LETTER_FREQ);
  const enScore = calculateChiSquared(letterCounts, text.length, ENGLISH_LETTER_FREQ);
  
  // Lower chi-squared is better (closer to expected frequency)
  // Convert to 0-1 score (lower is better, so we invert it)
  const bestScore = Math.min(idScore, enScore);
  return Math.max(0, 1 - (bestScore / 1000));
}

/**
 * Calculate chi-squared statistic
 */
function calculateChiSquared(observed, totalCount, expected) {
  let chiSquared = 0;
  
  for (const letter in expected) {
    const observedCount = observed[letter] || 0;
    const expectedCount = (expected[letter] / 100) * totalCount;
    
    if (expectedCount > 0) {
      chiSquared += Math.pow(observedCount - expectedCount, 2) / expectedCount;
    }
  }
  
  return chiSquared;
}

/**
 * Calculate readability score based on vowel/consonant ratio
 */
function calculateReadabilityScore(text) {
  const vowels = 'aeiou';
  let vowelCount = 0;
  
  for (const char of text) {
    if (vowels.includes(char)) {
      vowelCount++;
    }
  }
  
  const vowelRatio = vowelCount / text.length;
  
  // Ideal vowel ratio is around 40-45%
  const ideal = 0.42;
  const deviation = Math.abs(vowelRatio - ideal);
  
  return Math.max(0, 1 - (deviation * 2));
}

/**
 * Detect best pattern from ciphertext
 */
export function detectBestPatterns(ciphertext, blockSize, topN = 10) {
  const cleanCiphertext = ciphertext.replace(/\s/g, '');
  const size = parseInt(blockSize);
  
  if (isNaN(size) || size < 2) return [];
  
  // For block size > 6, use fast sampling (no brute force!)
  if (size > 6) {
    return geneticAlgorithmSearch(cleanCiphertext, size, topN);
  }
  
  // For small block sizes (2-6), use traditional brute force
  const permutations = generatePermutations(size);
  const results = [];
  
  permutations.forEach(perm => {
    const patternStr = perm.join(',');
    const decoded = decodeWithPattern(cleanCiphertext, size, perm);
    const score = scoreText(decoded);
    
    results.push({
      pattern: patternStr,
      decoded: decoded,
      score: score,
      confidence: getConfidenceLevel(score)
    });
  });
  
  // Sort by score (highest first)
  results.sort((a, b) => b.score - a.score);
  
  // Return top N results
  return results.slice(0, topN);
}

/**
 * DIVERSITY-FIRST Algorithm: Generate MANY unique patterns, score all, return best
 * No genetic evolution - just massive random + smart sampling
 */
function geneticAlgorithmSearch(ciphertext, size, topN) {
  const base = Array.from({ length: size }, (_, i) => i + 1);
  const allPatterns = new Map(); // pattern string -> {pattern, decoded, score}
  const patternToString = (p) => p.join(',');
  
  // Helper to add pattern if unique
  const addPattern = (pattern) => {
    const key = patternToString(pattern);
    if (!allPatterns.has(key)) {
      const decoded = decodeWithPattern(ciphertext, size, pattern);
      const score = quickScore(decoded);
      allPatterns.set(key, { pattern: [...pattern], decoded, score });
    }
  };
  
  // 1. Identity
  addPattern([...base]);
  
  // 2. Reverse
  addPattern([...base].reverse());
  
  // 3. All rotations/shifts
  for (let shift = 1; shift < size; shift++) {
    addPattern([...base.slice(shift), ...base.slice(0, shift)]);
  }
  
  // 4. Mirror patterns
  const mid = Math.floor(size / 2);
  addPattern([...base.slice(0, mid).reverse(), ...base.slice(mid)]);
  addPattern([...base.slice(0, mid), ...base.slice(mid).reverse()]);
  
  // 5. Swap adjacent pairs (all possibilities)
  for (let i = 0; i < size - 1; i++) {
    const pattern = [...base];
    [pattern[i], pattern[i + 1]] = [pattern[i + 1], pattern[i]];
    addPattern(pattern);
  }
  
  // 6. Swap distant pairs
  for (let i = 0; i < Math.floor(size / 2); i++) {
    const pattern = [...base];
    [pattern[i], pattern[size - 1 - i]] = [pattern[size - 1 - i], pattern[i]];
    addPattern(pattern);
  }
  
  // 7. Block swaps
  if (size >= 4) {
    const blockSize = Math.floor(size / 2);
    const block1 = base.slice(0, blockSize);
    const block2 = base.slice(blockSize);
    addPattern([...block2, ...block1]);
  }
  
  // 8. Every-other patterns
  const odds = base.filter((_, i) => i % 2 === 1);
  const evens = base.filter((_, i) => i % 2 === 0);
  addPattern([...odds, ...evens]);
  addPattern([...evens, ...odds]);
  
  // 9. MASSIVE random sampling (500+ unique patterns)
  let randomAttempts = 0;
  const maxRandom = 500;
  while (allPatterns.size < maxRandom && randomAttempts < maxRandom * 3) {
    randomAttempts++;
    const pattern = [...base];
    // Fisher-Yates shuffle
    for (let j = pattern.length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1));
      [pattern[j], pattern[k]] = [pattern[k], pattern[j]];
    }
    addPattern(pattern);
  }
  
  // Get top N unique patterns
  const sortedPatterns = Array.from(allPatterns.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
  
  // Return with confidence levels
  return sortedPatterns.map(p => ({
    pattern: patternToString(p.pattern),
    decoded: p.decoded,
    score: p.score,
    confidence: getConfidenceLevel(p.score)
  }));
}

/**
 * Decode ciphertext with given pattern
 */
function decodeWithPattern(ciphertext, size, pattern) {
  let decoded = '';
  const patternArray = pattern.map(n => n - 1); // 0-based
  
  for (let i = 0; i < ciphertext.length; i += size) {
    const block = ciphertext.slice(i, i + size);
    
    if (block.length === size) {
      const decodedBlock = new Array(block.length);
      for (let j = 0; j < patternArray.length; j++) {
        const originalPosition = patternArray[j];
        decodedBlock[originalPosition] = block[j];
      }
      decoded += decodedBlock.join('');
    } else {
      decoded += block;
    }
  }
  
  return decoded;
}

/**
 * Generate all permutations for a given size
 * For large sizes (>8), use smart sampling instead of all permutations
 */
function generatePermutations(n) {
  // For block size > 8, use smart sampling to avoid freeze
  if (n > 8) {
    return generateSmartSamples(n, 10000); // Sample 10,000 best guesses
  }
  
  const arr = Array.from({ length: n }, (_, i) => i + 1);
  const result = [];
  
  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };
  
  permute(arr);
  return result;
}

/**
 * Smart sampling for large block sizes using multiple strategies
 */
function generateSmartSamples(n, sampleSize) {
  const samples = new Set();
  const base = Array.from({ length: n }, (_, i) => i + 1);
  
  // Adaptive sample size based on block size to prevent freeze
  let adaptiveSampleSize;
  if (n <= 9) {
    adaptiveSampleSize = 2000;
  } else if (n <= 12) {
    adaptiveSampleSize = 1000;
  } else if (n <= 16) {
    adaptiveSampleSize = 500;
  } else {
    adaptiveSampleSize = 250; // Very large blocks
  }
  
  const targetSamples = Math.min(sampleSize, adaptiveSampleSize);
  
  // Strategy 1: Identity and simple shifts (most common patterns)
  samples.add(base.join(','));
  for (let shift = 1; shift < Math.min(n, 5); shift++) {
    const shifted = [...base.slice(shift), ...base.slice(0, shift)];
    samples.add(shifted.join(','));
  }
  
  // Strategy 2: Reverse patterns
  samples.add([...base].reverse().join(','));
  
  // Strategy 3: Common cipher patterns (alternating, grouped)
  if (n % 2 === 0) {
    const even = base.filter((_, i) => i % 2 === 0);
    const odd = base.filter((_, i) => i % 2 === 1);
    samples.add([...odd, ...even].join(','));
    samples.add([...even, ...odd].join(','));
  }
  
  // Strategy 4: Random swaps (controlled randomness)
  while (samples.size < targetSamples) {
    const pattern = [...base];
    
    // Perform random swaps (more swaps = more randomness)
    const numSwaps = Math.floor(Math.random() * n) + 1;
    for (let i = 0; i < numSwaps; i++) {
      const idx1 = Math.floor(Math.random() * n);
      const idx2 = Math.floor(Math.random() * n);
      [pattern[idx1], pattern[idx2]] = [pattern[idx2], pattern[idx1]];
    }
    
    samples.add(pattern.join(','));
  }
  
  // Convert back to array of arrays
  return Array.from(samples).map(s => s.split(',').map(Number));
}

/**
 * Get confidence level label based on score
 */
function getConfidenceLevel(score) {
  if (score >= 80) return 'Very High';
  if (score >= 60) return 'High';
  if (score >= 40) return 'Medium';
  if (score >= 20) return 'Low';
  return 'Very Low';
}
