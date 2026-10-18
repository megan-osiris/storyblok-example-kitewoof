export type InlineSpanKind = 'text' | 'link' | 'code' | 'strong';

export type InlineSource = string;

export type TextParagraphBlock = { kind: 'p'; text: InlineSource };
export type TextListBlock = { kind: 'ul' | 'ol'; items: InlineSource[] };
export type TextBlock = TextParagraphBlock | TextListBlock;

export type TextSectionSection = {
  component: 'text_section';
  _uid: string;
  anchor?: string;
  heading: string;
  blocks: TextBlock[];
};

export type CalloutVariant = 'note' | 'warning';

export type CalloutSection = {
  component: 'callout';
  _uid: string;
  variant: CalloutVariant;
  title: string;
  body: InlineSource;
};

export type CodeLanguage =
  | 'bash'
  | 'shell'
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'json'
  | 'text';

export type CodeBlockSection = {
  component: 'code_block';
  _uid: string;
  language: CodeLanguage;
  filename: string;
  code: string;
};

export type DataTableSection = {
  component: 'data_table';
  _uid: string;
  columns: string[];
  rows: InlineSource[][];
  caption?: string;
};

export type Section =
  | TextSectionSection
  | CalloutSection
  | CodeBlockSection
  | DataTableSection;

export type PageMeta = {
  readTime?: string;
  updated?: string;
};

export type Page = {
  title: string;
  description: string;
  meta?: PageMeta;
  body: Section[];
};
