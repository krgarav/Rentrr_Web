import React from 'react';
import { useTable } from 'react-table';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ChartTables from '@/widgets/ChartTables';
import { useLocation } from 'react-router-dom';
import { MessageCard } from '@/widgets/cards';
import { Button } from '@material-tailwind/react';
const RentTable = () => {
  const location = useLocation();
  console.log(location.state);
  const data = React.useMemo(
    () => [
      { id: 1, name: 'Alice', age: 25, city: 'New York' },
      { id: 2, name: 'Bob', age: 30, city: 'San Francisco' },
      { id: 3, name: 'Charlie', age: 35, city: 'Los Angeles' },
      { id: 4, name: 'David', age: 40, city: 'Chicago' },
      { id: 5, name: 'gaurav', age: 40, city: 'Chicago' },
    ],
    []
  );

  // Columns definition
  const columns = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Age', accessor: 'age' },
      { Header: 'City', accessor: 'city' },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  // Export to PDF function
  const exportToPdf = () => {
    const doc = new jsPDF();
    const table = document.querySelector('#myTable');
    doc.autoTable({ html: table });
    doc.save('export.pdf');
  };

  return (
    <div>
        
      <button onClick={exportToPdf}>Export to PDF</button>
      {/* <table {...getTableProps()} id="myTable" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} style={{ border: '1px solid black', padding: '8px' }}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} style={{ border: '1px solid black', padding: '8px' }}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table> */}

       <MessageCard
                          {...location.state}
                          // {...props}
                          action={
                            <Button variant="text" size="sm">
                              reply
                            </Button>
                          }
                        />
<ChartTables/>

      
    </div>
  );
};

export default RentTable;
