export const LINKTO = {
  vocabulary: ['文字語彙'],
  grammar: ['文法', '読解'],
  listening: ['聴解'],
  vocabugrammar: ['文字語彙', '文法', '読解'],
  random: ['文字語彙'],
};

export const JPTOEN = {
  文字語彙: 'Vocabulary',
  文法: 'Grammar',
  読解: 'Reading',
  聴解: 'Listening',
};

export const level = {
  N5: {
    name: 'N5',
    sectionJp: [
      'げんごちしき<span>（もじ・ごい）</span>',
      '<ruby>言語知識<rp>(</rp><rt>げんごちしき</rt><rp>)</rp></ruby><span><ruby>（文法）<rp>(</rp><rt>ぶんぽう</rt><rp>)</rp></ruby></span>・<ruby>読解<rp>(</rp><rt>どっかい</rt><rp>)</rp></ruby>',
      '<ruby>聴解<rp>(</rp><rt>ちょうかい</rt><rp>)</rp></ruby>',
    ],
    sectionEn: [
      'Language Knowledge (Vocabulary)',
      'Language Knowledge (Grammar) - Reading',
      'Listening',
    ],
    timeOut: [25, 50, 30],
    section: ['vocabulary', 'grammar', 'listening'],
  },
  N4: {
    name: 'N4',
    sectionJp: [
      'げんごちしき<span>（もじ・ごい）</span>',
      '<ruby>言語知識<rp>(</rp><rt>げんごちしき</rt><rp>)</rp></ruby><span><ruby>（文法）<rp>(</rp><rt>ぶんぽう</rt><rp>)</rp></ruby></span>・<ruby>読解<rp>(</rp><rt>どっかい</rt><rp>)</rp></ruby>',
      '<ruby>聴解<rp>(</rp><rt>ちょうかい</rt><rp>)</rp></ruby>',
    ],
    sectionEn: [
      'Language Knowledge (Vocabulary)',
      'Language Knowledge (Grammar) - Reading',
      'Listening',
    ],
    timeOut: [30, 60, 35],
    section: ['vocabulary', 'grammar', 'listening'],
  },
  N3: {
    name: 'N3',
    sectionJp: [
      'げんごちしき<span>（もじ・ごい）</span>',
      '<ruby>言語知識<rp>(</rp><rt>げんごちしき</rt><rp>)</rp></ruby><span><ruby>（文法）<rp>(</rp><rt>ぶんぽう</rt><rp>)</rp></ruby></span>・<ruby>読解<rp>(</rp><rt>どっかい</rt><rp>)</rp></ruby>',
      '<ruby>聴解<rp>(</rp><rt>ちょうかい</rt><rp>)</rp></ruby>',
    ],
    sectionEn: [
      'Language Knowledge (Vocabulary)',
      'Language Knowledge (Grammar) - Reading',
      'Listening',
    ],
    timeOut: [30, 70, 40],
    section: ['vocabulary', 'grammar', 'listening'],
  },
  N2: {
    name: 'N2',
    sectionJp: ['言語知識<span>（文法・語彙・文法）</span>・読解', '聴解'],
    sectionEn: [
      'Language Knowledge (Vocabulary/Grammar) - Reading',
      'Listening',
    ],
    timeOut: [105, 50],
    section: ['vocabugrammar', 'listening'],
  },
  N1: {
    name: 'N1',
    sectionJp: ['言語知識<span>（文法・語彙・文法）</span>・読解', '聴解'],
    sectionEn: [
      'Language Knowledge (Vocabulary/Grammar) - Reading',
      'Listening',
    ],
    timeOut: [110, 60],
    section: ['vocabugrammar', 'listening'],
  },
};
