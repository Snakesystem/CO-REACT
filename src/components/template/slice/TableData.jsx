import React from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community'

export default function DataGridTable(props) {

  const { header, url, nidkey } = props;
  
  const loadData = async ({ skip, limit }) => {

    const response =  await fetch(`${url}?tablename=instruksibca&skip=${skip}&limit=${limit}&search=&sort=&order=&filter=&nidkey=&nidvalue=`)
    const result = await response.json()
    
    // const uniqueNIDs = new Set();
    // const uniqueRows = [];
    
    // result.rows.forEach(row => {
    //   if (!uniqueNIDs.has(row.BankInstructionNID)) {
    //     uniqueNIDs.add(row.BankInstructionNID);
    //     uniqueRows.push(row);
    //   }
    // });

    return { data: result.rows, count: result.total };
  }

  const tableFormatter = (columns) => {
    return columns.map((column) => {
        const colName = column.name.toLowerCase();
        switch (colName) {
          case 'autonid':
            return { ...column, render: lockInject }
          case 'httpcode':
            return { ...column, render: StatusCodeFormatter }
          default:
            return { ...column, render: defaultFormatter };
        }
    })
  }

  const lockInject = ({ data, value }) => {
    if(data.BankInstructionNID === 675) {
      return <div className="text-primary">{value}</div>
    } else {
      return value
    }
  }

  const StatusCodeFormatter = ({ value }) => {
    if (value === 'SUCCESS') {
        return <div className="bg-success rounded text-center text-white mx-4">{value}</div>
    } else if (value === 'REJECTED') {
        return <div className="bg-danger rounded text-center text-white mx-4">{value}</div>
    } else {
        return <div>{value}</div>
    }
  }

  const defaultFormatter = ({ value }) => { 
    if (value) {
        return <div>{value}</div>
    }

    return "-"
  }

  return (
    <section> 
      <ReactDataGrid
        idProperty={`${nidkey}`}
        columns={tableFormatter(header)}
        pagination
        defaultLimit={50}
        dataSource={loadData}
      /> 
    </section>
  )
}
