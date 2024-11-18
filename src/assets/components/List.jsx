import { Link, useParams, useLocation } from "react-router-dom"; 
import { useState, useEffect } from "react";
import '../CSS/List.css';
import axios from 'axios';
import Navbar from "./Navbar";
import Loader from "./Loader";
import AddListItem from "./AddListItem.jsx";

function List() {
    const location = useLocation();
    const list = location.state;
    const [refresh, setRefresh] = useState(false);
    const [datas, setData] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const [isAdd, setIsAdd] = useState(false);

    const stl = {
        fontSize: '2vw',
        color: list.color,
    }
    useEffect(() => {
        setIsLoad(true);
        axios({
            method: 'get',
            url: `http://localhost:3000/api/mini-inventory/get_item/${list.id}`
        }).then(response => {
            if(response.data.length > 0) {
                setData(response.data)

                setTimeout(() => {
                    setIsLoad(false);
                }, 1500)
            }
        }).catch(err => {
            console.log(err)
        })
    }, [refresh])
    
    return (
        <>  
            <Navbar />
            {isLoad ? (
                <div>
                    <div className="loader-container">
                        <Loader />
                    </div>
                </div>
                
            ) : (
                <div className="container">
                <div>
                    <div className="btn-container">
                        <Link to={'/'}>
                            <button className="btn-back">
                                <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
                            </button>
                        </Link>
                        <button className="btn-add-list" onClick={() => {
                            setIsAdd(true)
                        }}>
                            <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                    </div>
                    
                    {isAdd && (<AddListItem 
                        list={list} 
                        setIsAdd={setIsAdd} 
                        setRefresh={setRefresh} 
                        datas={datas}

                    />)}

                    {datas.map((data) => (
                       <div className="card-list">
                            <div className="img icon-container">
                                <i className={`${list.icon}`} style={stl} aria-hidden="true"></i>
                            </div>
                            <div className="textBox">
                                <div className="textContent">
                                    <p className="h1">Name : {data.name}</p>
                                    <span className="span">Location  : {data.current_location}</span>
                                </div>
                                <div className="sub-txt">
                                    <p className="p">Serial No, : {data.serial_no}</p>
                                    <p className="p">Specification : {data.specs}</p>
                                    <p className="p">Usage Type : {data.usage_type}</p>
                                    <p className="p">Status Type : {data.isWorking == 1 ? 'Working' : 'Defective'}</p>  
                                </div>
                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            )}
            
        </>
    )
}

export default List;