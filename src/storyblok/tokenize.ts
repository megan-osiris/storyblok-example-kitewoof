export type Token = { text: string; color: string };

export const TOKEN_COLOR = {
  plain: '#E6E8EC',
  comment: '#8B93A0',
  string: '#9FE0C4',
  keyword: '#C9B8FF',
  number: '#F5C38B',
  command: '#8FC7FF',
} as const;

const SHELL_RE = /(#.*$)|("(?:[^"\\]|\\.)*"|'[^']*')|\b(export|cd|sudo)\b/g;
const JS_RE =
  /(\/\/.*$)|("(?:[^"\\]|\\.)*"|'[^']*'|`[^`]*`)|\b(import|from|const|let|var|await|async|new|export|return|function|if|else)\b|\b(\d+)\b/g;

function pickColor(match: RegExpExecArray): string {
  if (match[1] !== undefined) return TOKEN_COLOR.comment;
  if (match[2] !== undefined) return TOKEN_COLOR.string;
  if (match[3] !== undefined) return TOKEN_COLOR.keyword;
  return TOKEN_COLOR.number;
}

export function tokenize(line: string, language: string): Token[] {
  const isShell = language === 'bash' || language === 'shell';
  const re = new RegExp(isShell ? SHELL_RE : JS_RE);
  const out: Token[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(line))) {
    if (match.index > last) {
      out.push({ text: line.slice(last, match.index), color: TOKEN_COLOR.plain });
    }
    out.push({ text: match[0], color: pickColor(match) });
    last = re.lastIndex;
  }
  if (last < line.length) {
    out.push({ text: line.slice(last), color: TOKEN_COLOR.plain });
  }

  if (isShell && out.length > 0 && out[0].color === TOKEN_COLOR.plain) {
    const head = out[0].text.match(/^(\s*)(\S+)(.*)$/);
    if (head) {
      const [, leading, command, rest] = head;
      out.splice(
        0,
        1,
        { text: leading + command, color: TOKEN_COLOR.command },
        { text: rest, color: TOKEN_COLOR.plain },
      );
    }
  }

  return out;
}

const LANGUAGE_LABEL: Record<string, string> = {
  bash: 'Shell',
  shell: 'Shell',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  python: 'Python',
  json: 'JSON',
  text: 'Text',
};

// `code_block.language` is free text in Storyblok, so unknown values show as typed.
export function languageLabel(language: string): string {
  return LANGUAGE_LABEL[language] ?? language;
}
