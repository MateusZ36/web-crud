import React from "react";
import { Button, Form, Table } from "react-bootstrap";

import Header from "../../components/Header";
import ModalForm from "../../components/ModalForm";
import CountDepartment from "./component/CountDepartment";

import { useDepartments } from "../../context/DepartmentContext";

export default function DepartmentPage() {

	const { departments,
		newDepartment,
		editDepartment,
		deleteDepartment,
		showModal,
		handleCloseModal,
		handleSubmit,
		departmentModal,
		setDepartmentModal
	} = useDepartments();

	return (
		<React.Fragment>
			<Header />

			<div className="container">
				<h2>Cadastro de Departamentos</h2>

				<Button variant="secondary" onClick={newDepartment}>Novo</Button>

				<br /><br />

				{
					departments.length === 0
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
									departments.map(
										departmentLoop => {
											return <tr key={departmentLoop.id}>
												<td>{departmentLoop.id}</td>
												<td>{departmentLoop.name}</td>
												<td>
													<Button variant="outline-secondary"
													        onClick={() => editDepartment(departmentLoop)}
													>
														Editar
													</Button> {' '}
													<Button variant="outline-secondary"
													        onClick={() => deleteDepartment(departmentLoop.id)}
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
							<CountDepartment />
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
								value={departmentModal.name}
								onChange={e => setDepartmentModal(
									{
										...departmentModal,
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