import type { ComponentType } from 'react';
import type { Section } from '../../content/types';
import { RichText } from './RichText';
import { Callout } from './Callout';
import { DataTable } from './DataTable';
import { CodeBlock } from './CodeBlock';

type SectionComponent<S extends Section> = ComponentType<{ section: S }>;

export const componentMap: {
  [S in Section as S['component']]: SectionComponent<S>;
} = {
  rich_text: RichText,
  callout: Callout,
  data_table: DataTable,
  code_block: CodeBlock,
};
