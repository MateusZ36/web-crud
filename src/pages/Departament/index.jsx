import React from "react";
import { Button, Form, Table } from "react-bootstrap";

import Header from "../../components/Header";
import ModalForm from "../../components/ModalForm";
import CountDepartament from "./component/CountDepartament";

import { useDepartaments } from "../../context/DepartamentContext";

export default function DepartamentPage() {

    const { departaments,
        newDepartament,
        editDepartament,
        deleteDepartament,
        showModal,
        handleCloseModal,
        handleSubmit,
        departamentModal,
        setDepatamentModal
    } = useDepartaments();

    return (
        <React.Fragment>
            <Header />

            <div className="container">
                <h2>Cadastro de Departamentos</h2>

                <Button variant="secondary" onClick={newDepartament}>Novo</Button>

                <br /><br />

                {
                    departaments.length === 0
                        ? <div className='container'>
                            <h4>Nenhum registro cadastrado</h4>
                        </div>
                        : <React.Fragment>
                            <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Nome</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    departaments.map(
                                        departmentLoop => {
                                            return <tr key={departmentLoop.id}>
                                                <td>{departmentLoop.id}</td>
                                                <td>{departmentLoop.name}</td>
                                                <td>
                                                    <Button variant="outline-secondary"
                                                        onClick={() => editDepartament(departmentLoop)}
                                                    >
                                                        Editar
                                                    </Button> {' '}
                                                    <Button variant="outline-secondary"
                                                        onClick={() => deleteDepartament(departmentLoop.id)}
                                                    >
                                                        Excluir
                                                    </Button>
                                                </td>
                                            </tr>
                                        }
                                    )
                                }
                            </tbody>
                        </Table>
                        <CountDepartament />
                        </React.Fragment>
                }

                <ModalForm
                    title='Edição Registro'
                    showModal={showModal}
                    closeModal={handleCloseModal}
                >
                    <Form id='myForm' onSubmit={handleSubmit}>
                        <Form.Group size='lg' controlId="name">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                autoFocus
                                required={true}
                                value={departamentModal.name}
                                onChange={e => setDepatamentModal(
                                    {
                                        ...departamentModal,
                                        name: e.target.value
                                    }
                                )}
                            />
                        </Form.Group>
                    </Form>
                </ModalForm>


            </div>
        </React.Fragment>
    );
}