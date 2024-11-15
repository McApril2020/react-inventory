import { useState } from 'react';
import Alert from './Alert';
import axios from 'axios';
import '../CSS/Modal.css';

function Modal({setIsOpen, lists, setLists, setRefresh}) {
    const [name, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState('');
    const [color, setColor] = useState('');
    const [show, setShow] = useState(false)
    const [warning, setWarning] = useState({});

    async function add() {
        if(name != '' && description != '' && icon != '' && color != '') {
            const fdata = {
                name,
                description,
                icon,
                color,
            }
            
            axios({
                method: 'post',
                url: 'http://localhost:3000/api/mini-inventory/add',
                data: fdata
            }).then(response => {
                if(response.data.success) {
                    setShow(true);
                    setWarning(currWarning => ({
                        ...currWarning,
                        isOn: true,
                        alert: 'success',
                        message: 'Successfully Saved!'
                    }))
                    setIsOpen(false);
                    setRefresh(true);
                }
            }).catch(err => {
                setShow(true);
                setWarning(currWarning => ({
                    ...currWarning,
                    isOn: true,
                    alert: 'warning',
                    message: err
                }))
            })
        } else {
            setShow(true);
            setWarning(currWarning => ({
                ...currWarning,
                isOn: true,
                alert: 'warning',
                message: 'All Fields Are Required!'
            }))
        }
    }

    return (
        <>
            {show && (<Alert warning={warning} setWarning={setWarning} setShow={setShow}/>)}
            <div className='container-modal'>
                <div className="modal">
                    <h2>Add New List Item</h2>
                    <div className="form-modal">
                        <form>
                            <input type="text" id="name" name="name" required placeholder='Title' onChange={(e) => {
                                setTitle(e.target.value)
                            }}/>
                            <input type="text" id="description" name="decription" required placeholder='Description' onChange={(e) => {
                                setDescription(e.target.value)
                            }}/>
                            <input type="text" id="icon" name="icon" required placeholder='Icon of your List' onChange={(e) => {
                                setIcon(e.target.value)
                            }}/>
                            <input type="text" id="color" name="color" required placeholder='Color of your List' onChange={(e) => {
                                setColor(e.target.value)
                            }}/>
                        </form>
                    </div>
                    <div className='btn-modal'>
                        <button className="button1" onClick={() => {
                            setIsOpen(false)
                        }}>CLOSE</button>
                        <button className="button2" onClick={add}>ADD ITEM</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;