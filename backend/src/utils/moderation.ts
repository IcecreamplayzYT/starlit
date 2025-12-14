const BAD_WORDS = [
  // Common profanity
  'fuck', 'shit', 'ass', 'bitch', 'damn', 'crap', 'piss', 'dick', 'cock',
  'pussy', 'asshole', 'bastard', 'slut', 'whore', 'cunt', 'dipshit', 'motherfucking',
  // Racial slurs (abbreviated)
  'nigger', 'nigga', 'chink', 'spic', 'wetback', 'kike', 'gook',
  // Homophobic slurs
  'fag', 'faggot', 'dyke', 'tranny',
  // Other offensive terms
  'retard', 'retarded',
  // Pedophile-related
  'pedo', 'pedophile', 'childporn', 'cp',
  // Nazi/hate related
  'nazi', 'hitler', 'heil',
];

// Leetspeak substitutions
const LEET_MAP: { [key: string]: string } = {
  '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's',
  '7': 't', '8': 'b', '@': 'a', '$': 's', '!': 'i'
};

// Known malicious image hosting domains
const BLOCKED_IMAGE_DOMAINS = [
  'malware.com',
  'virus.net',
  // Add more as needed
];

// Known NSFW image hosting patterns
const NSFW_PATTERNS = [
  /porn/i, /xxx/i, /nsfw/i, /adult/i, /18\+/i,
  /nude/i, /naked/i, /sex/i
];

export function normalizeLeetspeak(text: string): string {
  let normalized = text.toLowerCase();
  for (const [leet, char] of Object.entries(LEET_MAP)) {
    normalized = normalized.split(leet).join(char);
  }
  // Remove special chars that might be used to bypass
  normalized = normalized.replace(/[^a-z0-9\s]/g, '');
  return normalized;
}

export function containsBadWords(text: string): { found: boolean; words: string[] } {
  const normalized = normalizeLeetspeak(text);
  const foundWords: string[] = [];
  
  for (const word of BAD_WORDS) {
    // Check for exact match or as part of word
    const regex = new RegExp(`\\b${word}\\b|${word}`, 'gi');
    if (regex.test(normalized)) {
      foundWords.push(word);
    }
  }
  
  return {
    found: foundWords.length > 0,
    words: foundWords
  };
}

export function filterBadWords(text: string): string {
  let filtered = text;
  const normalized = normalizeLeetspeak(text);
  
  for (const word of BAD_WORDS) {
    const regex = new RegExp(word, 'gi');
    if (regex.test(normalized)) {
      // Replace in original text (case-insensitive)
      const originalRegex = new RegExp(word, 'gi');
      filtered = filtered.replace(originalRegex, '*'.repeat(word.length));
    }
  }
  
  return filtered;
}

export function isImageUrlSafe(url: string): { safe: boolean; reason?: string } {
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname.toLowerCase();
    
    // Check blocked domains
    for (const blocked of BLOCKED_IMAGE_DOMAINS) {
      if (domain.includes(blocked)) {
        return { safe: false, reason: 'Domain is blocked' };
      }
    }
    
    // Check NSFW patterns in URL
    for (const pattern of NSFW_PATTERNS) {
      if (pattern.test(url)) {
        return { safe: false, reason: 'URL contains inappropriate content indicators' };
      }
    }
    
    // Check file extension
    const path = urlObj.pathname.toLowerCase();
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const hasValidExt = validExtensions.some(ext => path.endsWith(ext));
    
    // Allow URLs without extensions (like imgur direct links)
    if (path.includes('.') && !hasValidExt) {
      return { safe: false, reason: 'Invalid image format' };
    }
    
    return { safe: true };
  } catch {
    return { safe: false, reason: 'Invalid URL format' };
  }
}

export function validateProfileContent(data: {
  displayName?: string;
  headline?: string;
  bio?: string;
  description?: string;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  const fieldsToCheck = [
    { name: 'Display Name', value: data.displayName },
    { name: 'Headline', value: data.headline },
    { name: 'Bio', value: data.bio },
    { name: 'Description', value: data.description }
  ];
  
  for (const field of fieldsToCheck) {
    if (field.value) {
      const check = containsBadWords(field.value);
      if (check.found) {
        errors.push(`${field.name} contains inappropriate language`);
      }
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

export function validateImageUrls(urls: string[]): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  for (const url of urls) {
    if (url) {
      const check = isImageUrlSafe(url);
      if (!check.safe) {
        errors.push(`Image URL rejected: ${check.reason}`);
      }
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}