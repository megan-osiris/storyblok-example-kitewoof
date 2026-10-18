import type { TextBlock, TextSectionSection } from '../../content/types';
import { Inline } from './inline';

type Props = { section: TextSectionSection };

function renderBlock(block: TextBlock, index: number) {
  if (block.kind === 'p') {
    return (
      <p key={index} className="text-section__p">
        <Inline source={block.text} />
      </p>
    );
  }
  if (block.kind === 'ul') {
    return (
      <ul key={index} className="text-section__ul">
        {block.items.map((item, itemIndex) => (
          <li key={itemIndex} className="text-section__li">
            <span className="text-section__bullet" aria-hidden="true" />
            <span>
              <Inline source={item} />
            </span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ol key={index} className="text-section__ol">
      {block.items.map((item, itemIndex) => (
        <li key={itemIndex} className="text-section__li">
          <span className="text-section__number" aria-hidden="true">
            {itemIndex + 1}
          </span>
          <span>
            <Inline source={item} />
          </span>
        </li>
      ))}
    </ol>
  );
}

export function TextSection({ section }: Props) {
  return (
    <section id={section.anchor} className="text-section">
      <h2 className="text-section__heading">{section.heading}</h2>
      {section.blocks.map(renderBlock)}
    </section>
  );
}
