import type { StoryblokReactRichTextComponentMap } from '@storyblok/react';
import {
  BulletList,
  CalloutParagraph,
  InlineCode,
  ListItem,
  OrderedList,
  RichTextLink,
  SectionHeading,
  SectionParagraph,
} from './richTextNodes';

const shared: StoryblokReactRichTextComponentMap = {
  bullet_list: BulletList,
  ordered_list: OrderedList,
  list_item: ListItem,
  code: InlineCode,
  link: RichTextLink,
};

// For rich_text blocks: styled like the original text_section.
export const sectionRichText: StoryblokReactRichTextComponentMap = {
  ...shared,
  heading: SectionHeading,
  paragraph: SectionParagraph,
};

// For callout bodies: paragraphs styled like the original callout__content.
export const calloutRichText: StoryblokReactRichTextComponentMap = {
  ...shared,
  paragraph: CalloutParagraph,
};
