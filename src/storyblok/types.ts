import type {
  ISbStoryData,
  StoryblokRichTextInput,
} from '@storyblok/react';

export type SbBase = {
  _uid: string;
  _editable?: string;
};

export type SbRichTextDoc = StoryblokRichTextInput;

export type SbAsset = {
  id: number | null;
  filename: string;
  alt: string | null;
  name: string;
  title: string | null;
  focus: string | null;
};

export type SbLink = {
  id: string;
  url: string;
  linktype: 'story' | 'url' | 'asset' | 'email';
  fieldtype: 'multilink';
  cached_url: string;
  email?: string;
  target?: '_self' | '_blank';
};

export type SbTable = {
  fieldtype: 'table';
  thead: { _uid: string; value: string; component: '_table_head' }[];
  tbody: {
    _uid: string;
    component: '_table_row';
    body: { _uid: string; value: string; component: '_table_col' }[];
  }[];
};

export type RichTextBlok = SbBase & {
  component: 'rich_text';
  content: SbRichTextDoc;
};

export type CalloutBlok = SbBase & {
  component: 'callout';
  variant: 'note' | 'tip' | 'warning';
  title: string;
  content: SbRichTextDoc;
};

export type DataTableBlok = SbBase & {
  component: 'data_table';
  caption: string;
  table: SbTable;
};

export type CodeBlockBlok = SbBase & {
  component: 'code_block';
  language: string;
  filename: string;
  code: string;
};

export type BodyBlok =
  | RichTextBlok
  | CalloutBlok
  | DataTableBlok
  | CodeBlockBlok;

export type DocPageBlok = SbBase & {
  component: 'doc_page';
  title: string;
  description: string;
  body: BodyBlok[];
};

export type NavLinkBlok = SbBase & {
  component: 'nav_link';
  label: string;
  link: SbLink;
};

export type NavGroupBlok = SbBase & {
  component: 'nav_group';
  title: string;
  links: NavLinkBlok[];
};

export type SiteConfigBlok = SbBase & {
  component: 'site_config';
  site_name: string;
  logo: SbAsset;
  header_links: NavLinkBlok[];
  sidebar_groups: NavGroupBlok[];
};

export type DocPageStory = ISbStoryData<DocPageBlok>;
export type SiteConfigStory = ISbStoryData<SiteConfigBlok>;
