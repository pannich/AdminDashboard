interface Props<T> {
  columns: (keyof T)[];
  data: T[];
}

export default function DataTable<T>({ columns, data }: Props<T>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={String(col)}>{String(col)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map(col => (
              <td key={String(col)}>{String(row[col])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
