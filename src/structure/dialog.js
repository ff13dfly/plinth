import { Modal } from 'react-bootstrap';
import { useEffect,useState} from 'react';

function Dialog(props) {

  let [info,setInfo]=useState('');
  let [show,setShow]=useState(false);

  useEffect(() => {
    setInfo('Done');
  }, []);

  return (
    <Modal show={show}>
      <Modal.Header closeButton>
        <Modal.Title >{info}</Modal.Title>
      </Modal.Header>
      <Modal.Body ></Modal.Body>
    </Modal>
  );
}
export default Dialog;