import { useState, useEffect } from 'react';
import '../CSS/Alert.css';

function Alert({warning, setWarning, setShow}) {
    const [isVisible, setIsVisible] = useState(true);
    const color = warning.alert == 'warning' ? 'orange' :  warning.alert == 'success' ? 'green' : 'bue' 
    const type = warning.alert == 'warning' ? 'WARNING' :  warning.alert == 'SUCCESS' ? 'green' : 'INFO' 
    
    useEffect(() => {
        const empty = Object.keys(warning)

        if(empty.length > 0) {
            setTimeout(() => {
                setIsVisible(false);
                setShow(false)
            }, 5000)

            // setShow(false)
        } else {
            setWarning(currWarning => ({...currWarning,
                isOn: false,
            }))
        }

    }, []);
   
    const icon = {
        width: '35px',
        height: '35px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color,
        borderRadius: '50%',
        marginLeft: '8px',
    };


    return (
        <>
            {warning.isOn && (
                <div className={`cards ${isVisible ? 'fade-in' : 'fade-out'}`}>
                    <div className="" style={icon}>
                        <i className="fa fa-exclamation-triangle alert-icon" aria-hidden="true"></i>
                    </div>
                    <div className="message-text-container">
                        <p className="message-text" style={{color : color}}>{type}</p>
                        <p className="sub-text">{warning.message}</p>
                    </div>
                    <div>
                        <button className="circle-button" onClick={() => {
                                setIsVisible(false);
                            }}><i className="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </div> 
                </div>
            )}
            {/* <div className={`cards ${isVisible ? 'fade-in' : 'fade-out'}`}>
                    <div className="" style={icon}>
                        <i className="fa fa-exclamation-triangle icon-alert" aria-hidden="true"></i>
                    </div>
                    <div className="message-text-container">
                        <p className="message-text" style={{color : color}}>{type}</p>
                        <p className="sub-text">{warning.message}</p>
                    </div>
                    <div>
                        <button className="circle-button" onClick={() => {
                            setIsVisible(false);
                        }}>
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </div> 
                </div>
             */}
        </>
    )
}
export default Alert;