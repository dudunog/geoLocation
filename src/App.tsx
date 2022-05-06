import { useCallback, useMemo, useRef, useState } from 'react'
import { Button } from './components/Button';
import { GeoLocation } from './components/GeoLocation';
import { Modal } from './components/Modal';
import { Table } from './components/Table'

import './App.css'

function App() {
  const columns = useMemo(
    () => [
      {
        Header: 'Nome',
        accessor: 'name'
      },
      {
        Header: 'Localização',
        accessor: 'location'
      },
      {
        Header: 'Última atualização',
        accessor: 'lastUpdate'
      },
      {
        Header: 'Editar',
        accessor: 'edit',
        Cell: ({ row }: any) => (
          <Button
            onClick={() => showModalHandle("edit", row)}
            text="Editar"
          />
        ),
      },
      {
        Header: 'Exibir',
        accessor: 'view',
        Cell: ({ row }: any) => (
          <Button
            onClick={() => showModalHandle("view", row)}
            text="Exibir"
          />
        ),
      },
    ],
    []
  )
  const serverData = useMemo(
    () => [
      {
        name: 'Minsk',
        location: '51.505, -0.09',
        lastUpdate: '06/05/2022',
      },
      {
        name: 'Shopping Via Sul',
        location: '-3.7947457, -38.4794949',
        lastUpdate: '06/05/2022',
      },
      {
        name: 'London',
        location: '2389.505, 192.09',
        lastUpdate: '06/05/2022',
      },
      {
        name: 'London',
        location: '899.505, -1984.09',
        lastUpdate: '06/05/2022',
      },
      {
        name: 'London',
        location: '5.505, -4.09',
        lastUpdate: '06/05/2022',
      },
      {
        name: 'London',
        location: '10.505, -50.09',
        lastUpdate: '06/05/2022',
      },
      {
        name: 'London',
        location: '670.505, -123.09',
        lastUpdate: '06/05/2022',
      },
      {
        name: 'Lond1on',
        location: '20.505, -123.09',
        lastUpdate: '06/05/2022',
      },
      {
        name: 'London',
        location: '20.505, -123.09',
        lastUpdate: '06/05/2022',
      },
      {
        name: 'London',
        location: '20.505, -123.09',
        lastUpdate: '06/05/2022',
      },
      {
        name: 'London',
        location: '20.505, -123.09',
        lastUpdate: '06/05/2022',
      },
      {
        name: 'London',
        location: '20.505, -123.09',
        lastUpdate: '06/05/2022',
      },
      {
        name: 'London',
        location: '20.505, -123.09',
        lastUpdate: '06/05/2022',
      },
      {
        name: 'London',
        location: '20.505, -123.09',
        lastUpdate: '06/05/2022',
      },
      {
        name: 'London',
        location: '20.505, -123.09',
        lastUpdate: '06/05/2022',
      },
      {
        name: 'London',
        location: '20.505, -123.09',
        lastUpdate: '06/05/2022',
      },
      {
        name: 'London',
        location: '20.505, -123.09',
        lastUpdate: '06/05/2022',
      },
    ],
    []
  )

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [pageCount, setPageCount] = useState(0)
  const fetchIdRef = useRef(0)
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [activeRow, setActiveRow] = useState("");
  const [carName, setCarName] = useState("");

  const fetchData = useCallback(({ pageSize, pageIndex }) => {
  // Give this fetch an ID
  const fetchId = ++fetchIdRef.current
    // Set the loading state
    setLoading(true)

    // We'll even set a delay to simulate a server here
    setTimeout(() => {
      // Only update the data if this is the latest fetch
      if (fetchId === fetchIdRef.current) {
        const startRow = pageSize * pageIndex
        const endRow = startRow + pageSize
        setData(serverData.slice(startRow, endRow))

        // Your server could send back total page count.
        // For now we'll just fake it, too
        setPageCount(Math.ceil(serverData.length / pageSize))

        setLoading(false)
      }
    }, 1000)
  }, [])

  function showModalHandle(modal: string, row: any): void {
    if (modal == "edit") {
      setShowEditModal(true);
    } else {
      setShowViewModal(false);
      setActiveRow(row.original.location);
      setCarName(row.original.name);
      setShowViewModal(true);
    }
  };

  function hideModalHandle(modal: string): void {
    if (modal == "edit") {
      setShowEditModal(false);
    } else {
      setShowViewModal(false);
    }
  };

  return (
    <>
      <Table
        columns={columns}
        data={data}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
      />

      <Modal show={showEditModal} handleClose={() => hideModalHandle("edit")}>
        <p>Modal de edição!</p>
      </Modal>

      {showViewModal && ([
        <div className="map">
          <GeoLocation
            carName={carName}
            position={[activeRow ? Number(activeRow.split(",")[0]) : 0, activeRow ? Number(activeRow.split(",")[1]) : 0]}
          />
        </div>
      ])}
    </>
  )
}

export default App
