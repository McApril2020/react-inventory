import { useState } from 'react';
import Alert from './Alert';
import axios from 'axios';
import '../CSS/AddListItem.css';

function AddListItem({datas,list, setIsAdd, setRefresh,setListWarning}) {
    const {name, id} = list;
    const [serial, setSerial] = useState('');
    const [model, setModel] = useState('');
    const [specs, setSpecs] = useState('');
    const [type, setType] = useState('');
    const [status, setStatus] = useState('');
    const [location, setLocation] = useState('');
    const [show, setShow] = useState(false);
    const [warning, setWarning] = useState({});

    function submit() {
        if(serial != '' && model != '' && specs != '' && type != '' && status != '' && location != '') {

            const isExist = datas.filter(f => f.serial_no == serial);
            if(isExist.length > 0) {
                setShow(true);
                setWarning(currWarning => ({
                    ...currWarning,
                    isOn: true,
                    alert: 'warning',
                    message: `Serial No. ${serial} is Already Exist`
                }))
                return;
            }

            const fdata = {
                item_id: id,
                name: model,
                serial_no: serial,
                specs,
                isWorking: status,
                usage_type: type,
                location
            }

            axios({
                method: 'post',
                url: 'http://localhost:3000/api/mini-inventory/save_list',
                data: fdata
            }).then((response) => {
                if(response.data.success) {
                    // CONTINUE TO DEV
                    setIsAdd(false);
                    setRefresh(true);

                    setTimeout(() => {setRefresh(false);}, 1000)
                }
            }).catch(err => {
                // CONTINUE TO DEV
            })
        } else {
            setShow(true);
            setWarning(currWarning => ({
                ...currWarning,
                isOn: true,
                alert: 'warning',
                message:'All Fields Are Required'
            }))
        }
    }
    
    return (
        <>
            <div className="form-container">
                <form className="add-list-form" onSubmit={(e) => {
                    e.preventDefault();
                    submit();
                }}>
                    <p className="form-title">Add New {name}</p>
                    <div className="input-container">
                        <input type="text" name="serial" value={serial} placeholder={`${name} Serial No.`} onChange={(e) => {
                            setSerial(e.target.value)
                        }}/>
                        <span>
                        </span>
                    </div>
                    <div className="input-container">
                        <input type="text" name="model" value={model} placeholder={`${name} Model`} onChange={(e) => {
                            setModel(e.target.value)
                        }}/>
                    </div>
                    <div className="input-container">
                        <input type="text" name="specs" value={specs} placeholder={`${name} Specification`} onChange={(e) => {
                            setSpecs(e.target.value)
                        }}/>
                    </div>
                    <div className="input-container">
                        <input type="text" name="type" value={type} placeholder={`${name} Usage Type`} onChange={(e) => {
                            setType(e.target.value)
                        }}/>    
                    </div>
                    <div className="input-container">
                        <input type="text" name="status" value={status} placeholder={`${name} Status`} onChange={(e) => {
                             setStatus(e.target.value)
                        }}/>
                    </div>
                    <div className="input-container">
                        <input type="text" name="location" value={location} placeholder={`${name} Location`} onChange={(e) => {
                            setLocation(e.target.value)
                        }}/>
                    </div>
                    <div className="btn-form">
                        <button type="submit" className="submit-btn close-btn" onClick={() => {
                            setIsAdd(false)
                        }}>
                            Close
                        </button>
                        <button type="submit" className="submit-btn add-btn">
                            ADD
                        </button>
                    </div>
                </form>
                {show && (<Alert warning={warning} setWarning={setWarning} setShow={setShow}/>)}
            </div>
        </>
    )
}

export default AddListItem;