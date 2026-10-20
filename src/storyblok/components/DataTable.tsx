import { storyblokEditable } from '@storyblok/react';
import type { JSX } from 'react';
import type { DataTableBlok } from '../types';

type Props = { blok: DataTableBlok };

export function DataTable({ blok }: Props): JSX.Element {
  const headRow = blok.table?.thead ?? [];
  const bodyRows = blok.table?.tbody ?? [];

  return (
    <figure className="data-table" {...storyblokEditable(blok)}>
      <div className="data-table__scroll">
        <table>
          <thead>
            <tr>
              {headRow.map((cell) => (
                <th key={cell._uid} scope="col">
                  {cell.value}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bodyRows.map((row) => (
              <tr key={row._uid}>
                {row.body.map((cell, cellIndex) => (
                  <td
                    key={cell._uid}
                    className={
                      cellIndex === 0 ? 'data-table__cell--nowrap' : undefined
                    }
                  >
                    {cell.value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {blok.caption && (
        <figcaption className="data-table__caption">{blok.caption}</figcaption>
      )}
    </figure>
  );
}
