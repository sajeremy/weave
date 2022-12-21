import './Modal.scss';

const Modal = ({component: Component, close}) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <img className="close-button" src={require('../../assets/CloseModal.png')} onClick={() => close()}/>
                <Component />
            </div>
        </div>
    )
}

export default Modal;