import '../CSS/Navbar.css';

function Navbar({setIsOpen, setModalTitle, setModalItem}) {
    return (
        <div className='nav'>
            <div className="nav-list">
                <span className='mis-inv'>
                    <i className="fa fa-shopping-basket basket" aria-hidden="true"></i>
                    MIS Inventory
                </span>
                <div className="nav-item">
                    <button className='btn-add' onClick={() => {
                        setIsOpen(currModal => !currModal)
                        setModalItem(currModalItem => ({
                            ...currModalItem,
                            id: '',
                            name: '',
                            description: '',
                            icon: '',
                            color: ''
                        }))
                        setModalTitle('Add New List Item')
                    }}>
                        <i className="fa fa-plus " aria-hidden="true"></i>
                    </button>
                    <i className="fa fa-user-circle user-acct" aria-hidden="true"></i>
                </div>
            </div>
        </div>
    )
}

export default Navbar;