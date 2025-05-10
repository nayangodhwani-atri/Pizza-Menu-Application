import React from 'react';
import './styles.css';
import {Link,useNavigate} from 'react-router-dom';
import {useTable,Column,Row} from 'react-table';

interface Pizza {
    id: number;
    name: string;
    toppings: string[];
    Favourite: boolean;
    delivery: boolean;
  }

interface PizzaDataProps {
    pizzas: Pizza[];
    deletePizza?: (id: number) => void;
  }

const PizzaDataReact: React.FC<PizzaDataProps> = ({ pizzas,deletePizza }) => {
    const navigate = useNavigate();
    const data = React.useMemo(() => pizzas, [pizzas])

    console.log(pizzas);

    const columns: Column<Pizza>[] =  React.useMemo(

        () => [
        {
            Header:"Edit",accessor:"id",
            Cell: ({ row }: { row: Row<Pizza> }) => (
                <Link to={`/edit/${row.original.id}`}>Edit</Link>
              ), 
        },
        {
            Header:"Name",accessor:"name"
        },
        {
            Header:"Toppings",accessor:"toppings",
            Cell: ({ value }: { value: string[] }) => value.join(', '),
        },
        {
            Header:"Favourite",accessor:"Favourite",
            Cell: ({ value }: { value: boolean }) => (value ? 'Yes' : 'No'),
        },
        {
            Header:"Delivery",accessor:"delivery",
            Cell: ({ value }: { value: boolean }) => (value ? 'Yes' : 'No'),
        },
        {
          id: 'delete',
          Header: 'Delete',
          accessor: 'id',
          Cell: ({ row }: { row: Row<Pizza> }) => (
            <button
            className="delete-button"
              onClick={() => {
                if (deletePizza) {
                  deletePizza(row.original.id);
                  navigate('/');
                }
              }}
              style={{ color: 'red', cursor: 'pointer', border: 'none', background: 'none' }}
            >
              Delete
            </button>
          ),
        }
    ],
    []
    );
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
      });
      return (
        <div className="home-page">
          <h1 className="title">Pizza Hut</h1>
        <div className="table-container">
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} key={column.id}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={row.id}>
                    {row.cells.map((cell) => {
                      return <td {...cell.getCellProps()} key={cell.column.id}>{cell.render('Cell')}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Link to="/add-pizza">
            <button className="button" style={{ marginTop: '20px' }}>
              Add Pizza
            </button>
          </Link> 
        </div>
        </div>
      );
};

export default PizzaDataReact;