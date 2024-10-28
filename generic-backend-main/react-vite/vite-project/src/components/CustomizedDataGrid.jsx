import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { findManyClientes } from '../api/server';

export default function CustomizedDataGrid() {
  const [rows, setRows] = useState([]); 
  const [columns, setColumns] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await findManyClientes();
        
        if (data.length > 0) {
          const firstItem = data[0];

          const colunaData = Object.keys(firstItem)
          .filter((key) => key !== 'customerId')
          .map((key) => ({
            field: key, 
            headerName: key.replace(/([A-Z])/g, ' $1').trim(), 
            width: 170,

            
          }));

          setColumns(colunaData); 

    
          const linhaData = data.map((item) => ({
            id: item.customerId,
            ...item 
          }));

          setRows(linhaData); 
        }

      } catch (error) {
        setError(error.message);
        console.error("Error fetching data: ", error.message, error.stack);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);


  if (loading) {
    return <div>Carregando...</div>; 
  }
  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <DataGrid
   
      checkboxSelection
      rows={rows}
      columns={columns}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize
      density="compact"
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: 'outlined',
              size: 'small',
            },
            columnInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            operatorInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: 'outlined',
                size: 'small',
              },
            },
          },
        },
      }}
    />
  );
}