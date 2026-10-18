import type { CalloutSection } from '../../content/types';

type Props = { section: CalloutSection };

const ICONS: Record<CalloutSection['variant'], string> = {
  note: 'i',
  tip: '*',
  warning: '!',
};

export function Callout({ section }: Props) {
  return (
    <aside className={`callout callout--${section.variant}`} role="note">
      <div className="callout__icon" aria-hidden="true">
        {ICONS[section.variant]}
      </div>
      <div className="callout__body">
        {section.title && <p className="callout__title">{section.title}</p>}
        <div
          className="callout__content"
          dangerouslySetInnerHTML={{ __html: section.html }}
        />
      </div>
    </aside>
  );
}
