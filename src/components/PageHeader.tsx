type Props = {
  title: string;
  description: string;
};

export function PageHeader({ title, description }: Props) {
  return (
    <header className="page-header">
      <h1 className="page-header__title">{title}</h1>
      <p className="page-header__description">{description}</p>
    </header>
  );
}
