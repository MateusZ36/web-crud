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

	const {departments} = useDepartments();
	const {categories} = useCategories();

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
												<td>{patrimonyLoop.departament.name}</td>
												<td>{patrimonyLoop.categories.map(c=><li>{c.name}</li>)}</td>
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
							<h4>Total de Registros:</h4>
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
							<Select
								required={true}
								placeholder="Selecione o departamento"
	              color="brown"
	              searchBy="name"
	              clearable={true}
	              searchable={true}
	              create={false}
	              keepOpen={false}
	              multi={false}
	              values={[patrimonyModal.departament]}
	              labelField="name"
	              valueField="id"
	              options={departments}
								keepSelectedInList={false}
	              onChange={e => {
									setPatrimonyModal(
			              {
				              ...patrimonyModal,
				              departament: e[0]
			              }
		              )
	              }
	              }
	              noDataLabel="Nenhum departamento encontrado"
							/>
							</Col>
							</Row>
							<hr/>
							<h5>Informe as Categorias</h5>
							<Form.Label>Categoria</Form.Label>
							<Select
								required={true}
								placeholder="Selecione as Categorias"
	              color="brown"
	              searchBy="name"
	              clearable={true}
	              searchable={true}
	              create={false}
	              keepOpen={false}
	              multi={true}
	              values={patrimonyModal.categories}
	              labelField="name"
	              valueField="id"
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