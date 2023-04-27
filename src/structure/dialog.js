import { Modal } from 'react-bootstrap';
import { useEffect } from 'react';

function Dialog(props) {

  const funs=props.funs;

  const self={
    hideDialog:()=>{
      console.log('good to go');
      funs.hide();
    },
  }

  useEffect(() => {

  }, []);

  return (
    <Modal show={props.show} size="lg" onHide={self.hideDialog}>
      <Modal.Header closeButton>
        <Modal.Title >{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        {props.content}
      </Modal.Body>
    </Modal>
  );
}
export default Dialog;