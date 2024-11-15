import { useState, useEffect } from 'react'
import Items from './assets/components/Items.jsx';
import Navbar from './assets/components/Navbar.jsx';
import Modal from './assets/components/Modal.jsx';
import Alert from './assets/components/Alert.jsx';
import './App.css'

function App() {

  const [show, setShow] = useState(false)
  const [lists, setLists] = useState([]);
  const [warning, setWarning] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetch_items = async () => {
      console.log('test')
      try {
        const response = await fetch('http://localhost:3000/api/mini-inventory/items');
        if(response.ok) {
          const data = await response.json();

          data.forEach(e => {
            e['icon'] = `fa ${e.icon}`
          });

          setLists(data);
        } else {
          setShow(true);
          setWarning(currWarning => ({
            ...currWarning,
            isOn: true,
            alert: 'warning',
            message: 'Failed to Fetch Data, Contact your Administrator!'
          }))
        }
      } catch (error) {
          setShow(true);
          setWarning(currWarning => ({
            ...currWarning,
            isOn: true,
            alert: 'warning',
            message: 'Unable to connect API, Contact your Administrator!'
          }))
      }
    }

    fetch_items();
  }, [refresh]);

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      {show && (<Alert warning={warning} setWarning={setWarning} setShow={setShow}/>)}
      <Navbar setIsOpen={setIsOpen}/>
      <div className="container">
        {lists.map((list) => (
          list.status == 1 ? (
            <Items list={list} key={list.id} setLists={setLists}/>
          ) : ''
        ))}
      </div>
      {isOpen && (
        <Modal 
          setIsOpen={setIsOpen} 
          lists={lists} 
          setLists={setLists} 
          setRefresh={setRefresh}/>
      )}
    </div>
  )
}

export default App
