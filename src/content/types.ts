export type RichTextSection = {
  component: 'rich_text';
  _uid: string;
  html: string;
};

export type CalloutVariant = 'note' | 'tip' | 'warning';

export type CalloutSection = {
  component: 'callout';
  _uid: string;
  variant: CalloutVariant;
  title?: string;
  html: string;
};

export type DataTableSection = {
  component: 'data_table';
  _uid: string;
  caption?: string;
  headers: string[];
  rows: string[][];
};

export type CodeBlockSection = {
  component: 'code_block';
  _uid: string;
  language: string;
  filename?: string;
  code: string;
};

export type Section =
  | RichTextSection
  | CalloutSection
  | DataTableSection
  | CodeBlockSection;

export type Page = {
  title: string;
  description: string;
  body: Section[];
};
