import PropTypes from 'prop-types';
import { useState } from 'react';
import AddItem from './AddItem';
import '../CSS/Items.css';

function Items({list, setLists}) {
    const {name, description, color, icon} = list;
    // const item_len = props.item_len;
    // const index = props.indx;
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

    const [isEdit, setisEdit] = useState(false);
    const [list_name, setList_name] = useState(name)
  
    return (
        <>
            <div className="card">
                <i className={icon} style={stl} onClick={() => {
                console.log('icon')
            }}></i>
                <div className="card-content" >
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
                </div>
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