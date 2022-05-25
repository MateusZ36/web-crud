import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';
import {toast} from "react-toastify";

const DepartmentContext = createContext();

export default function DepartmentProvider({children}){

	const [departments, setDepartments] = useState([]);

	useEffect(
		() => {
			axios.get('http://localhost:8080/departament/all').then(
				response => {
					setDepartments(response.data)
				}
			)
		}, []
	)

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
			axios.delete(`http://localhost:8080/departament/${id}`).then(
				()=>{
					setDepartments([...departments.filter(item => item.id !== id)])
				}
			).catch(
				e=>toast.error(JSON.parse(e.request.response).message, )
			);
		}
	}

	function handleSubmit(event) {

		if (typeCrud === 'NEW') {
			axios.post('http://localhost:8080/departament', departmentModal).then(
				response => {
					setDepartments([
						...departments,
						response.data
					])
				}
			)
		} else {
			axios.put(`http://localhost:8080/departament/${departmentModal.id}`,
				departmentModal);
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
			setDepartmentModal
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
		setDepartmentModal
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
		setDepartmentModal
	};
}