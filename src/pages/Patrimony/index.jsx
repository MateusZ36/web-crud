import React from "react";
import {Button, Col, Form, Row, Table} from "react-bootstrap";
import Select from "react-dropdown-select";

import Header from "../../components/Header";
import ModalForm from "../../components/ModalForm";
import CountPatrimony from "./component/CountPatrimony";


import {usePatrimonies} from "../../context/PatrimonyContext";
import {useDepartments} from "../../context/DepartmentContext";
import {useCategories} from "../../context/CategoryContext";

export default function PatrimonyPage() {

	const { patrimonies,
		newPatrimony,
		editPatrimony,
		deletePatrimony,
		showModal,
		handleCloseModal,
		handleSubmit,
		patrimonyModal,
		setPatrimonyModal
	} = usePatrimonies();

	const {departments, getDepartmentNameById} = useDepartments();
	const {categories, getCategoryNameById} = useCategories();
	let selectedCategory;

	return (
		<React.Fragment>
			<Header />
			<div className="container">
				<h2>Cadastro de Patrimônios</h2>
				<Button variant="secondary" onClick={newPatrimony}>Novo</Button>
				<br /><br />
				{
					patrimonies.length === 0
						? <div className='container'>
							<h4>Nenhum registro cadastrado</h4>
						</div>
						: <React.Fragment>
							<Table striped bordered hover>
								<thead>
								<tr>
									<th>Código</th>
									<th>Nome</th>
									<th>Descrição</th>
									<th>Preço</th>
									<th>Departamento</th>
									<th>Categorias</th>
									<th>Ação</th>
								</tr>
								</thead>
								<tbody>
								{
									patrimonies.map(
										patrimonyLoop => {
											return <tr key={patrimonyLoop.id}>
												<td>{patrimonyLoop.id}</td>
												<td>{patrimonyLoop.name}</td>
												<td>{patrimonyLoop.description}</td>
												<td>{patrimonyLoop.price}</td>
												<td>{getDepartmentNameById(parseInt(patrimonyLoop.department))}</td>
												<td>{patrimonyLoop.categories.map(c=><li>{getCategoryNameById(parseInt(c.id))}</li>)}</td>
												<td>
													<Button variant="outline-secondary" onClick={() => editPatrimony(patrimonyLoop)}>
														Editar
													</Button>
													{' '}
													<Button variant="outline-secondary" onClick={() => deletePatrimony(patrimonyLoop.id)}>
														Excluir
													</Button>
												</td>
											</tr>
										}
									)
								}
								</tbody>
							</Table>
							<CountPatrimony />
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
								value={patrimonyModal.name}
								onChange={e => setPatrimonyModal(
									{
										...patrimonyModal,
										name: e.target.value
									}
								)}
							/>
							<Form.Label>Descrição</Form.Label>
							<Form.Control
								as="textarea"
								required={true}
								value={patrimonyModal.description}
								onChange={e => setPatrimonyModal(
									{
										...patrimonyModal,
										description: e.target.value
								}
									)}
							/>
							<Row>
								<Col>
									<Form.Label>Preço</Form.Label>
									<Form.Control
										type="number"
										step="0.1"
										required={true}
										value={patrimonyModal.price}
										onChange={e => setPatrimonyModal(
											{
												...patrimonyModal,
											  price: e.target.value
										}
											)}
									/>
							</Col>
							<Col>
								<Form.Label>Departamento</Form.Label>
								<Form.Select
									required={true}
									value={patrimonyModal.department}
									onChange={e => setPatrimonyModal(
										{
											...patrimonyModal,
											department: e.target.value
									})}
								>
									<option value="">Departamento</option>
									{departments.map(d=>{return <option value={d.id}>{d.name}</option>})}
								</Form.Select>
							</Col>
							</Row>
							<hr/>
							<h5>Informe as Categorias</h5>
							<Form.Label>Categoria</Form.Label>
							<Select
								required={true}
								placeholder="Selecione as categorias"
	              color={"brown"}
	              searchBy={"name"}
	              clearable={true}
	              searchable={true}
	              create={false}
	              keepOpen={false}
	              multi={true}
	              values={patrimonyModal.categories}
	              labelField={"name"}
	              valueField={"id"}
	              options={categories}
								keepSelectedInList={false}
	              onChange={e => {
									setPatrimonyModal(
			              {
				              ...patrimonyModal,
				              categories: e
			              }
		              )
	              }
	              }
	              noDataLabel="Nenhuma categoria encontrada"
							/>

						</Form.Group>
					</Form>
				</ModalForm>


			</div>
		</React.Fragment>
	);
}