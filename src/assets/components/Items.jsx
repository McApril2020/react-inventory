import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import AddItem from './AddItem';
import Alert from './Alert';
import axios from 'axios';
import '../CSS/Items.css';
import {Link} from 'react-router-dom';

function Items({list, setLists, setIsOpen, setModalTitle, setModalItem, setRefresh}) {
    const {name, description, color, icon} = list;
    const [show, setShow] = useState(false);
    const [warning, setWarning] = useState({});

    const stl = {
        textAlign: 'center',   
        fontSize: '100px',    
        color: color,          
        display: 'flex',       
        justifyContent: 'center', 
        alignItems: 'center',  
        height: '150px', 
        cursor: 'pointer'
    }

    useEffect(() => {
        return () => {
            setTimeout(() => {
                setRefresh(false)
            }, 500)
        }
    }, [setRefresh])

    async function remove() {
        axios({
            method: 'post',
            url: 'http://localhost:3000/api/mini-inventory/delete',
            data: {id: list.id}
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
        
        // setShow(true);
        // setWarning(currWarning => ({
        //     ...currWarning,
        //     isOn: true,
        //     alert: 'warning',
        //     message: 'Deleted'
        // }))
    }   
  
    return (
        <>   
            {show && (<Alert warning={warning} setWarning={setWarning} setShow={setShow}/>)}
            <div className="card">
                <Link key={list.id} to={`/list/${list.title}`} state={list}>
                    <i className={icon} style={stl}></i>
                </Link>
                <div className="card-content" >
                    <h2 className="card-title">{name}</h2>
                    <p className="card-description">{description} </p>
                    <div className="btn-container">
                        <button className="circular-button btn-plus" onClick={() => {
                                setModalItem(currModalItem => ({
                                    ...currModalItem,
                                    id: list.id,
                                    name: list.name,
                                    description: list.description,
                                    icon: list.icon,
                                    color: list.color
                                }))
                                setIsOpen(currModal => !currModal)
                                setModalTitle(`Update ${list.name} List`)
                            }}>
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                        <button className="circular-button btn-minus" onClick={remove}>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                    </div>
                </div>
                {/* <div className="card-content" >
                    
                    {isEdit ? <input 
                                type="text" 
                                name="name" 
                                id='name' 
                                value={list_name} 
                                className="transparent-input" 
                                placeholder="Enter text here" 
                                onChange={(e) => {
                                    e.preventDefault();
                                    setList_name(e.target.value)
                                }}/> 
                            : <h2 className="card-title">{name}</h2>}
                    <p className="card-description">{description} </p>
                    <div className="btn-container">
                        {isEdit ? (
                                    <div className='group-btn'>
                                        <button className="circular-button btn-save" onClick={() => {
                                                setLists(currListState => {
                                                    return currListState.map(currList => {
                                                        if(currList.id == list.id) {
                                                            console.log('in')
                                                            return {
                                                                ...currList,
                                                                name: list_name
                                                            }
                                                        }
                                                        return currList
                                                    })
                                                })
                                                setisEdit(currIsEdit => !currIsEdit)
                                            }}>
                                            <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                                        </button>
                                        <button className="circular-button btn-cancel" onClick={() => {
                                                setisEdit(currIsEdit => !currIsEdit)
                                            }}>
                                            <i className="fa fa-thumbs-down" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                    ) 
                                : (
                                        <button className="circular-button btn-plus" onClick={() => {
                                            setisEdit(currIsEdit => !currIsEdit)
                                        }}>
                                            <i className="fa fa-pencil" aria-hidden="true"></i>
                                        </button>
                                   )
                        }
                        <button className="circular-button btn-minus" onClick={() => {
                            setLists((currListState) => {
                                return currListState.map(currList => {
                                    if(currList.id == list.id) {
                                        return {
                                            ...currList, 
                                            status: 0
                                        }
                                    } 
                                    return currList
                                })
                            })
                        }}>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                    </div>
                </div> */}
            </div>
            {/* {item_len == (index + 1) && (
                <div className="btn-con">
                    <div className='btn-chld'>
                        <AddItem />
                    </div>
                </div>
            )} */}
        </>
    )
    // if(item_len == index + 1) {
    //     const cntr_btn = {
    //         display: 'flex',
    //         alignItems: 'center',
    //         justifyContent: 'center'
    //     }
    //     return (
    //         <div style={cntr_btn}>
    //             <AddItem />
    //         </div>
    //     )
    // } else {
        
    // }
}

Items.propTypes = {
  list: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }),
//   setLists: PropTypes.func.isRequired
}

export default Items;