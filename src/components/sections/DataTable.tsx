import type { DataTableSection } from '../../content/types';
import { Inline } from './inline';

type Props = { section: DataTableSection };

export function DataTable({ section }: Props) {
  return (
    <figure className="data-table">
      <div className="data-table__scroll">
        <table>
          <thead>
            <tr>
              {section.columns.map((column) => (
                <th key={column} scope="col">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={cellIndex === 0 ? 'data-table__cell--nowrap' : undefined}
                  >
                    <Inline source={cell} />
                  </td>
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
