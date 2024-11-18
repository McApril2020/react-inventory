import { useState, useEffect } from 'react';
import Alert from './Alert';
import axios from 'axios';
import '../CSS/Modal.css';

function Modal({setIsOpen, setRefresh, modal_title,modal_item}) {
    const [name, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState('');
    const [color, setColor] = useState('');
    const [show, setShow] = useState(false);
    const [warning, setWarning] = useState({});
    const [isUpdate, setIsUpdate] = useState(false)

    useEffect(() => {
        const obj = Object.keys(modal_item)
        
        if(obj.length > 0) {
            setTitle(modal_item.name);
            setDescription(modal_item.description);
            setIcon(modal_item.icon);
            setColor(modal_item.color);
            setIsUpdate(true);
        } else {
            console.log('from add')
        }
    }, [modal_item])

    async function add() {
        if(name != '' && description != '' && icon != '' && color != '') {
            let type = '';
            const fdata = {
                name,
                description,
                icon,
                color,
            }
            
            if(isUpdate) {
                fdata['id'] = modal_item.id;
                type = 'update';
            } else {
                type = 'add';
            }

            axios({
                method: 'post',
                url: `http://localhost:3000/api/mini-inventory/${type}`,
                data: fdata
            }).then(response => {
                if(response.data.success) {
                    setShow(true);
                    setWarning(currWarning => ({
                        ...currWarning,
                        isOn: true,
                        alert: 'success',
                        message: response.data.message
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
                    <h2>{modal_title}</h2>
                    <div className="form-modal">
                        <form>
                            <input type="text" id="name" name="name" value={name} required placeholder='Title' onChange={(e) => {
                                setTitle(e.target.value)
                            }}/>
                            <input type="text" id="description" name="description" value={description} required placeholder='Description' onChange={(e) => {
                                setDescription(e.target.value)
                            }}/>
                            <input type="text" id="icon" name="icon" value={icon} required placeholder='Icon of your List' onChange={(e) => {
                                setIcon(e.target.value)
                            }}/>
                            <input type="text" id="color" name="color" value={color} required placeholder='Color of your List' onChange={(e) => {
                                setColor(e.target.value)
                            }}/>
                        </form>
                    </div>
                    <div className='btn-modal'>
                        <button className="button1" onClick={() => {
                            setIsOpen(false)
                            setIsUpdate(false);
                        }}>CLOSE</button>
                        <button className="button2" onClick={add}>ADD ITEM</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;