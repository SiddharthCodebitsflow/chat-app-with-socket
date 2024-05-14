import Toast from 'react-bootstrap/Toast';

function ToastMessage(props) {
  return (
    <div className='container d-flex w-100 justify-content-end position-absolute end-0 top-0'>
      <Toast
        className="d-inline-block m-1"
        bg={props.bg}
      >
        <Toast.Header >
          <img
            src="holder.js/20x20?text=%20"
            className="rounded me-2"
            alt=""
          />
          <strong className="me-auto text-black">{props.type}</strong>
          <small>{props.time}</small>
        </Toast.Header>
        <Toast.Body className="text-white">
          {props.message}
        </Toast.Body>
      </Toast>
    </div>
  );
}

export default ToastMessage;