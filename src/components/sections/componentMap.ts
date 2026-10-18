import type { ComponentType } from 'react';
import type { Section } from '../../content/types';
import { TextSection } from './TextSection';
import { Callout } from './Callout';
import { CodeBlock } from './CodeBlock';
import { DataTable } from './DataTable';

type SectionComponent<S extends Section> = ComponentType<{ section: S }>;

export const componentMap: {
  [S in Section as S['component']]: SectionComponent<S>;
} = {
  text_section: TextSection,
  callout: Callout,
  code_block: CodeBlock,
  data_table: DataTable,
};
