import type { DataTableSection } from '../../content/types';

type Props = { section: DataTableSection };

export function DataTable({ section }: Props) {
  return (
    <figure className="data-table">
      <div className="data-table__scroll">
        <table>
          <thead>
            <tr>
              {section.headers.map((header) => (
                <th key={header} scope="col">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {section.caption && (
        <figcaption className="data-table__caption">{section.caption}</figcaption>
      )}
    </figure>
  );
}
