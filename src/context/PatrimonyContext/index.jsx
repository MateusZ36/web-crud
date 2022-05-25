import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';

const PatrimonyContext = createContext();

export default function PatrimonyProvider({children}){

	const [patrimonies, setPatrimonies] = useState([]);

	useEffect(
		() => {
			axios.get('http://localhost:8080/patrimony/all').then(
				response => {
					setPatrimonies(response.data)
				}
			)
		}, []
	)

	const [patrimonyModal, setPatrimonyModal] = useState(
		{ id: -1, name: '', price: 0, categories: [], departament: null }
	)

	const [showModal, setShowModal] = useState(false);
	const handleShowModal = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);

	const [typeCrud, setTypeCrud] = useState('NEW');

	function newPatrimony() {
		setTypeCrud('NEW');
		setPatrimonyModal({ id: -1, name: '', price: 0, categories: [], departament: null });
		handleShowModal();
	}

	function editPatrimony(patrimony) {
		setTypeCrud('EDIT');
		setPatrimonyModal(patrimony);
		handleShowModal();
	}

	function deletePatrimony(id) {
		let confirmDelete = window.confirm('Confirma a exclusão do ítem?');
		if (confirmDelete) {
			axios.delete(`http://localhost:8080/patrimony/${id}`);

			let novaLista = patrimonies.filter(item => item.id !== id);

			setPatrimonies([
				...novaLista
			])
		}
	}

	function handleSubmit(event) {

		if (typeCrud === 'NEW') {
			axios.post('http://localhost:8080/patrimony', patrimonyModal).then(
				response => {
					setPatrimonies([
						...patrimonies,
						response.data
					])
				}
			)
		} else {
			axios.put(`http://localhost:8080/patrimony/${patrimonyModal.id}`,
				patrimonyModal);
			let patrimoniesList = patrimonies;
			for (let index = 0; index < patrimonies.length; index++) {
				const element = patrimonies[index];
				if (element.id === patrimonyModal.id) {
					patrimoniesList[index] = patrimonyModal;
				}
			}
			setPatrimonies([
				...patrimoniesList
			])
		}
		handleCloseModal();
		event.preventDefault();
	}

	return (
		<PatrimonyContext.Provider value={{
			patrimonies,
			setPatrimonies,
			newPatrimony,
			editPatrimony,
			deletePatrimony,
			showModal,
			handleCloseModal,
			handleSubmit,
			patrimonyModal,
			setPatrimonyModal
		}}>
			{children}
		</PatrimonyContext.Provider>
	);
}

export function usePatrimonies(){
	const context = useContext(PatrimonyContext);
	const {
		patrimonies,
		setPatrimonies,
		newPatrimony,
		editPatrimony,
		deletePatrimony,
		showModal,
		handleCloseModal,
		handleSubmit,
		patrimonyModal,
		setPatrimonyModal
	} = context;
	return {
		patrimonies,
		setPatrimonies,
		newPatrimony,
		editPatrimony,
		deletePatrimony,
		showModal,
		handleCloseModal,
		handleSubmit,
		patrimonyModal,
		setPatrimonyModal
	};
}