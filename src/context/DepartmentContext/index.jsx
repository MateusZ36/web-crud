import React, { createContext, useState, useContext} from 'react';

const DepartmentContext = createContext();

export default function DepartmentProvider({children}){

	const [departments, setDepartments] = useState([]);
	const [departmentModal, setDepartmentModal] = useState(
		{ id: -1, name: '' }
	)

	const [showModal, setShowModal] = useState(false);
	const handleShowModal = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);

	const [typeCrud, setTypeCrud] = useState('NEW');

	function newDepartment() {
		setTypeCrud('NEW');
		setDepartmentModal({ id: -1, name: '' });
		handleShowModal();
	}

	function editDepartment(department) {
		setTypeCrud('EDIT');
		setDepartmentModal(department);
		handleShowModal();
	}

	function deleteDepartment(id) {
		let confirmDelete = window.confirm('Confirma a exclusão do ítem?');
		if (confirmDelete) {
			let novaLista = departments.filter(item => item.id !== id);
			setDepartments([
				...novaLista
			])
		}
	}

	function handleSubmit(event) {

		if (typeCrud === 'NEW') {
			let lastId = 0;
			if (departments.length > 0) {
				lastId = departments[departments.length - 1].id;
			}
			setDepartments([
				...departments,
				{
					id: lastId + 1,
					name: departmentModal.name
				}
			]);
		} else {
			let departmentsList = departments;
			for (let index = 0; index < departments.length; index++) {
				const element = departments[index];
				if (element.id === departmentModal.id) {
					departmentsList[index] = departmentModal;
				}
			}
			setDepartments([
				...departmentsList
			])
		}
		handleCloseModal();
		event.preventDefault();
	}

	function getDepartmentNameById(id) {
		let filteredDepartments = departments.filter(d => d.id === id)
		return filteredDepartments.length>0?filteredDepartments[0].name:null;
	}

	return (
		<DepartmentContext.Provider value={{
			departments,
			setDepartments,
			newDepartment,
			editDepartment,
			deleteDepartment,
			showModal,
			handleCloseModal,
			handleSubmit,
			departmentModal,
			setDepartmentModal,
			getDepartmentNameById
		}}>
			{children}
		</DepartmentContext.Provider>
	);
}

export function useDepartments(){
	const context = useContext(DepartmentContext);
	const {
		departments,
		setDepartments,
		newDepartment,
		editDepartment,
		deleteDepartment,
		showModal,
		handleCloseModal,
		handleSubmit,
		departmentModal,
		setDepartmentModal,
		getDepartmentNameById
	} = context;
	return {
		departments,
		setDepartments,
		newDepartment,
		editDepartment,
		deleteDepartment,
		showModal,
		handleCloseModal,
		handleSubmit,
		departmentModal,
		setDepartmentModal,
		getDepartmentNameById
	};
}