import React from "react";
import { Button, Form, Table } from "react-bootstrap";

import Header from "../../components/Header";
import ModalForm from "../../components/ModalForm";
import CountCategory from "./component/CountCategory";

import { useCategories } from "../../context/CategoryContext";

export default function CategoryPage() {

    const { categories,
        newCategory,
        editCategory,
        deleteCategory,
        showModal,
        handleCloseModal,
        handleSubmit,
        categoryModal,
        setCategoryModal
    } = useCategories();

    return (
        <React.Fragment>
            <Header />

            <div className="container">
                <h2>Cadastro de Categorias</h2>

                <Button variant="secondary" onClick={newCategory}>Novo</Button>

                <br /><br />

                {
                    categories.length === 0
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
                                    categories.map(
                                        categoryLoop => {
                                            return <tr key={categoryLoop.id}>
                                                <td>{categoryLoop.id}</td>
                                                <td>{categoryLoop.name}</td>
                                                <td>
                                                    <Button variant="outline-secondary"
                                                        onClick={() => editCategory(categoryLoop)}
                                                    >
                                                        Editar
                                                    </Button> {' '}
                                                    <Button variant="outline-secondary"
                                                        onClick={() => deleteCategory(categoryLoop.id)}
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
                        <h4>Total de Registros:</h4>
                        <CountCategory />
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
                                value={categoryModal.name}
                                onChange={e => setCategoryModal(
                                    {
                                        ...categoryModal,
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