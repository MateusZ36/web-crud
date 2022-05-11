import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

class ModalForm extends Component {

    render() {
        return (
            <Modal show={this.props.showModal}>
                <Modal.Header>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {this.props.children}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.closeModal}>Fechar</Button>
                    <Button variant="primary" type='submit' form='myForm'>Salvar</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default ModalForm;