export const countCharacters = (text: string): number => {
  return text.length;
};

export const countWords = (text: string): number => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

export const truncateText = (text: string, maxChars: number): string => {
  if (text.length <= maxChars) return text;
  return text.substring(0, maxChars);
};

export const validateCharLimit = (text: string, limit: number): boolean => {
  return text.length <= limit;
};

export const ERAS_LIMITS = {
  EXPERIENCE_DESCRIPTION: 750,
  MOST_MEANINGFUL: 300,
  IMPACTFUL_EXPERIENCE: 300,
  PERSONAL_STATEMENT: 28000, // Approximately 5300 words
  HOBBIES: 300,
};

export const calculateReadingTime = (text: string): number => {
  const wordsPerMinute = 200;
  const wordCount = countWords(text);
  return Math.ceil(wordCount / wordsPerMinute);
};

export const highlightKeywords = (text: string, keywords: string[]): string => {
  let highlightedText = text;
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    highlightedText = highlightedText.replace(regex, `<mark>$&</mark>`);
  });
  return highlightedText;
};

export const extractKeywords = (text: string): string[] => {
  // Common medical and ERAS keywords to look for
  const medicalKeywords = [
    'clinical', 'research', 'patient', 'care', 'leadership', 'teamwork',
    'communication', 'skills', 'experience', 'rotation', 'elective',
    'publication', 'presentation', 'volunteer', 'community', 'service',
    'mentorship', 'teaching', 'innovation', 'quality', 'improvement',
    'evidence-based', 'diagnosis', 'treatment', 'management', 'outcomes'
  ];
  
  const foundKeywords: string[] = [];
  const textLower = text.toLowerCase();
  
  medicalKeywords.forEach(keyword => {
    if (textLower.includes(keyword)) {
      foundKeywords.push(keyword);
    }
  });
  
  return foundKeywords;
};