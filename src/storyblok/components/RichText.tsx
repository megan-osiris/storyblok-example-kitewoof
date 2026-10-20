import { StoryblokRichText, storyblokEditable } from '@storyblok/react';
import type { JSX } from 'react';
import type { RichTextBlok } from '../types';
import { sectionRichText } from '../richText';

type Props = { blok: RichTextBlok };

export function RichText({ blok }: Props): JSX.Element {
  return (
    <section className="text-section" {...storyblokEditable(blok)}>
      <StoryblokRichText
        document={blok.content}
        components={sectionRichText}
        wrapper={false}
      />
    </section>
  );
}
