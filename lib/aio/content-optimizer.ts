interface AIOptimizationResult {
  optimizedContent: string
  voiceSearchQueries: string[]
  featuredSnippetContent: string
  entityMap: Map<string, string>
  sgeOptimizations: string[]
  bingChatOptimizations: string[]
  perplexityOptimizations: string[]
}

interface ContentSection {
  type: 'answer' | 'list' | 'comparison' | 'howto' | 'definition'
  content: string
  keywords: string[]
}

export class AIOContentOptimizer {
  /**
   * Optimize content for AI-powered search engines
   */
  static optimizeForAIO(content: string, focusKeyword: string): AIOptimizationResult {
    const voiceSearchQueries = this.generateVoiceSearchQueries(content, focusKeyword)
    const featuredSnippetContent = this.extractFeaturedSnippetContent(content)
    const entityMap = this.extractEntities(content)
    const sgeOptimizations = this.optimizeForSGE(content)
    const bingChatOptimizations = this.optimizeForBingChat(content)
    const perplexityOptimizations = this.optimizeForPerplexity(content)

    const optimizedContent = this.enhanceContentWithAIOMarkup(content, {
      voiceSearchQueries,
      featuredSnippetContent,
      entityMap,
      sgeOptimizations
    })

    return {
      optimizedContent,
      voiceSearchQueries,
      featuredSnippetContent,
      entityMap,
      sgeOptimizations,
      bingChatOptimizations,
      perplexityOptimizations
    }
  }

  /**
   * Generate ERAS-specific voice search queries
   */
  private static generateVoiceSearchQueries(content: string, focusKeyword: string): string[] {
    const queries: string[] = []

    // Question-based queries for ERAS
    const questionWords = ['what', 'how', 'when', 'where', 'why', 'which', 'who']
    questionWords.forEach(word => {
      queries.push(`${word} is ${focusKeyword}`)
      queries.push(`${word} should I ${focusKeyword}`)
      queries.push(`${word} do I need ${focusKeyword}`)
    })

    // ERAS-specific conversational queries
    queries.push(`help me with my ${focusKeyword}`)
    queries.push(`review my ${focusKeyword}`)
    queries.push(`improve my ${focusKeyword}`)
    queries.push(`fix my ${focusKeyword}`)
    queries.push(`edit my ERAS ${focusKeyword}`)

    // Medical residency specific
    queries.push(`${focusKeyword} for residency application`)
    queries.push(`${focusKeyword} for medical students`)
    queries.push(`${focusKeyword} for IMGs`)
    queries.push(`${focusKeyword} for match`)

    // Action-based queries
    queries.push(`get ${focusKeyword} reviewed`)
    queries.push(`professional ${focusKeyword} review`)
    queries.push(`${focusKeyword} editing service`)
    queries.push(`best ${focusKeyword} reviewer`)

    return queries
  }

  /**
   * Extract content optimized for featured snippets
   */
  private static extractFeaturedSnippetContent(content: string): string {
    const snippetPatterns = [
      // Definition patterns
      /(.+?)\s+is\s+(.{50,300}\.)/gi,
      /(.+?)\s+are\s+(.{50,300}\.)/gi,

      // List patterns
      /(?:steps|ways|tips|methods)[\s\S]{0,50}?(?:\d+\.|[-•])\s+(.{20,200})/gi,

      // Comparison patterns
      /(.+?)\s+vs\s+(.+?)[:.](.{50,300})/gi,

      // How-to patterns
      /how\s+to\s+(.+?)[:.]?\s*(.{50,300}\.)/gi,

      // ERAS-specific patterns
      /ERAS\s+(.+?)\s+should\s+(.{50,300}\.)/gi,
      /personal statement\s+(.{50,300}\.)/gi,
      /residency application\s+(.{50,300}\.)/gi
    ]

    let bestSnippet = ''
    let maxScore = 0

    snippetPatterns.forEach(pattern => {
      const matches = content.match(pattern)
      if (matches) {
        matches.forEach(match => {
          const score = this.scoreSnippetQuality(match)
          if (score > maxScore) {
            maxScore = score
            bestSnippet = match
          }
        })
      }
    })

    // Format for featured snippet
    if (bestSnippet) {
      bestSnippet = bestSnippet
        .replace(/\s+/g, ' ')
        .trim()
        .substring(0, 320) // Google's featured snippet limit
    }

    return bestSnippet
  }

  /**
   * Score snippet quality for featured snippet potential
   */
  private static scoreSnippetQuality(snippet: string): number {
    let score = 0

    // Length score (ideal: 40-60 words)
    const wordCount = snippet.split(/\s+/).length
    if (wordCount >= 40 && wordCount <= 60) score += 30
    else if (wordCount >= 30 && wordCount <= 70) score += 20
    else if (wordCount >= 20 && wordCount <= 80) score += 10

    // Contains numbers or statistics
    if (/\d+/.test(snippet)) score += 20

    // Contains structured elements (lists, steps)
    if (/(?:\d+\.|[-•]|\bstep\s+\d+)/i.test(snippet)) score += 15

    // Direct answer format
    if (/^(.*?)\s+(is|are|means|refers to)/i.test(snippet)) score += 25

    // Contains ERAS-specific keywords
    if (/\b(ERAS|residency|match|personal statement|CV|application)\b/i.test(snippet)) score += 20

    // Contains keywords indicating definition or explanation
    if (/\b(defined|means|refers|consists|includes)\b/i.test(snippet)) score += 10

    return score
  }

  /**
   * Extract medical education entities for knowledge graph
   */
  private static extractEntities(content: string): Map<string, string> {
    const entities = new Map<string, string>()

    // Medical education terms
    const educationPatterns = [
      /\b(ERAS|NRMP|match|residency|fellowship)\b/gi,
      /\b(USMLE|Step 1|Step 2|Step 3|COMLEX)\b/gi,
      /\b(IMG|FMG|US MD|DO|Caribbean)\b/gi
    ]

    // Document types
    const documentPatterns = [
      /\b(personal statement|CV|curriculum vitae|MSPE)\b/gi,
      /\b(letter of recommendation|LOR|SLOE)\b/gi,
      /\b(experience description|research experience|publication)\b/gi
    ]

    // Specialties
    const specialtyPatterns = [
      /\b(internal medicine|surgery|pediatrics|psychiatry)\b/gi,
      /\b(radiology|anesthesiology|emergency medicine|family medicine)\b/gi,
      /\b(ophthalmology|dermatology|orthopedics|pathology)\b/gi
    ]

    // Extract entities
    educationPatterns.forEach(pattern => {
      const matches = content.match(pattern)
      if (matches) {
        matches.forEach(match => {
          entities.set(match.toLowerCase(), 'MedicalEducation')
        })
      }
    })

    documentPatterns.forEach(pattern => {
      const matches = content.match(pattern)
      if (matches) {
        matches.forEach(match => {
          entities.set(match.toLowerCase(), 'ApplicationDocument')
        })
      }
    })

    specialtyPatterns.forEach(pattern => {
      const matches = content.match(pattern)
      if (matches) {
        matches.forEach(match => {
          entities.set(match.toLowerCase(), 'MedicalSpecialty')
        })
      }
    })

    return entities
  }

  /**
   * Optimize content for Google's SGE (Search Generative Experience)
   */
  private static optimizeForSGE(content: string): string[] {
    const optimizations: string[] = []

    // Check for direct answers
    if (content.match(/^[^.!?]{0,100}(is|are|means|refers to)/i)) {
      optimizations.push('✓ Direct answer format detected')
    } else {
      optimizations.push('⚠ Add direct answer in first paragraph')
    }

    // Check for structured data
    if (content.includes('<ul>') || content.includes('<ol>')) {
      optimizations.push('✓ Structured lists for SGE extraction')
    } else {
      optimizations.push('⚠ Add structured lists for better SGE visibility')
    }

    // Check for comparative content
    if (content.match(/\b(vs|versus|compared to|better than|difference between)\b/i)) {
      optimizations.push('✓ Comparative content for SGE comparisons')
    }

    // Check for authoritative citations
    if (content.match(/\b(according to|research shows|studies indicate|data suggests|AAMC|NRMP data)\b/i)) {
      optimizations.push('✓ Authoritative language for SGE trust signals')
    } else {
      optimizations.push('⚠ Add authoritative citations')
    }

    // Check for temporal markers
    if (content.match(/\b(2024|2025|recent|latest|current|updated|match cycle)\b/i)) {
      optimizations.push('✓ Temporal markers for freshness')
    } else {
      optimizations.push('⚠ Add temporal markers for content freshness')
    }

    // ERAS-specific checks
    if (content.match(/\b(match rate|success rate|acceptance rate)\b/i)) {
      optimizations.push('✓ Statistical data for credibility')
    }

    return optimizations
  }

  /**
   * Optimize for Bing Chat
   */
  private static optimizeForBingChat(content: string): string[] {
    const optimizations: string[] = []

    // Check for source citations
    if (content.match(/\[[0-9]+\]|\(source:.*?\)|\(NRMP.*?\)|\(AAMC.*?\)/i)) {
      optimizations.push('✓ Source citations for Bing Chat')
    } else {
      optimizations.push('⚠ Add numbered citations [1], [2], etc.')
    }

    // Check for factual statements
    const factualIndicators = /\b(\d+%|\d+\s+out of\s+\d+|approximately|exactly|specifically|match data)\b/i
    if (factualIndicators.test(content)) {
      optimizations.push('✓ Specific factual data present')
    }

    // Check for clear conclusions
    if (content.match(/\b(in conclusion|to summarize|the key takeaway|bottom line|most importantly)\b/i)) {
      optimizations.push('✓ Clear conclusions for Bing Chat summaries')
    }

    return optimizations
  }

  /**
   * Optimize for Perplexity AI
   */
  private static optimizeForPerplexity(content: string): string[] {
    const optimizations: string[] = []

    // Check for Q&A format
    if (content.match(/<h[2-3]>.*?\?<\/h[2-3]>/i)) {
      optimizations.push('✓ Question-based headers for Perplexity')
    } else {
      optimizations.push('⚠ Convert some headers to questions')
    }

    // Check for comprehensive coverage
    const sections = content.match(/<h2>/gi)
    if (sections && sections.length >= 5) {
      optimizations.push('✓ Comprehensive topic coverage')
    }

    // Check for technical depth
    if (content.match(/\b(methodology|strategy|approach|technique|framework|process)\b/i)) {
      optimizations.push('✓ Technical depth for Perplexity\'s academic focus')
    }

    // ERAS-specific depth
    if (content.match(/\b(red flags|common mistakes|reviewer perspective|program director)\b/i)) {
      optimizations.push('✓ Expert insights for credibility')
    }

    return optimizations
  }

  /**
   * Enhance content with AIO-specific markup
   */
  private static enhanceContentWithAIOMarkup(
    content: string,
    optimizations: {
      voiceSearchQueries: string[]
      featuredSnippetContent: string
      entityMap: Map<string, string>
      sgeOptimizations: string[]
    }
  ): string {
    let enhancedContent = content

    // Add voice search schema
    if (optimizations.voiceSearchQueries.length > 0) {
      const voiceSearchMeta = `<!-- Voice Search Optimized Queries:
${optimizations.voiceSearchQueries.map(q => `  - ${q}`).join('\n')}
-->`
      enhancedContent = voiceSearchMeta + '\n' + enhancedContent
    }

    // Add featured snippet markup
    if (optimizations.featuredSnippetContent) {
      const snippetMarkup = `<div class="featured-snippet" data-snippet="true">
  <p>${optimizations.featuredSnippetContent}</p>
</div>`

      // Insert after first paragraph
      const firstParagraphEnd = enhancedContent.indexOf('</p>') + 4
      enhancedContent =
        enhancedContent.slice(0, firstParagraphEnd) +
        '\n' + snippetMarkup + '\n' +
        enhancedContent.slice(firstParagraphEnd)
    }

    // Add entity markup
    optimizations.entityMap.forEach((type, entity) => {
      const entityRegex = new RegExp(`\\b${entity}\\b`, 'gi')
      enhancedContent = enhancedContent.replace(
        entityRegex,
        `<span data-entity="${type}" data-entity-name="${entity}">${entity}</span>`
      )
    })

    return enhancedContent
  }

  /**
   * Generate AI-first content structure for ERAS
   */
  static generateAIFirstStructure(topic: string): ContentSection[] {
    return [
      {
        type: 'definition',
        content: `Direct definition of ${topic} in ERAS context`,
        keywords: ['what is', 'definition', 'meaning', 'ERAS']
      },
      {
        type: 'answer',
        content: `Quick answer about ${topic} for residency applicants`,
        keywords: ['quick answer', 'summary', 'overview', 'key points']
      },
      {
        type: 'list',
        content: `Key points about ${topic} for match success`,
        keywords: ['tips', 'strategies', 'best practices', 'match']
      },
      {
        type: 'comparison',
        content: `${topic} compared to other application components`,
        keywords: ['vs', 'versus', 'comparison', 'difference']
      },
      {
        type: 'howto',
        content: `Step-by-step guide for ${topic} in ERAS`,
        keywords: ['how to', 'steps', 'guide', 'process', 'tutorial']
      }
    ]
  }

  /**
   * Score content for AIO readiness
   */
  static scoreAIOReadiness(content: string): number {
    let score = 0
    const maxScore = 100

    // Check for direct answers (20 points)
    if (content.match(/^[^.!?]{0,200}(is|are|means|refers to)/im)) {
      score += 20
    }

    // Check for structured content (15 points)
    const lists = content.match(/<[ou]l>/gi)
    if (lists && lists.length >= 2) {
      score += 15
    }

    // Check for questions in headers (15 points)
    const questionHeaders = content.match(/<h[2-3]>.*?\?<\/h[2-3]>/gi)
    if (questionHeaders && questionHeaders.length >= 3) {
      score += 15
    }

    // Check for conversational tone (10 points)
    const conversationalPhrases = content.match(/\b(you|your|you're|you'll)\b/gi)
    if (conversationalPhrases && conversationalPhrases.length >= 10) {
      score += 10
    }

    // Check for temporal relevance (10 points)
    if (content.match(/\b(202[4-5]|recent|latest|updated|current|match cycle)\b/i)) {
      score += 10
    }

    // Check for statistics and data (10 points)
    const statistics = content.match(/\d+%|\d+\s+out of\s+\d+|match rate/gi)
    if (statistics && statistics.length >= 3) {
      score += 10
    }

    // Check for entity richness (10 points)
    const entities = this.extractEntities(content)
    if (entities.size >= 5) {
      score += 10
    }

    // Check for comprehensive coverage (10 points)
    const wordCount = content.split(/\s+/).length
    if (wordCount >= 1500) {
      score += 10
    }

    return Math.min(score, maxScore)
  }
}