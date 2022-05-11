import React, { createContext, useState, useContext} from 'react';

const PatrimonyContext = createContext();

export default function PatrimonyProvider({children}){

	const [patrimonies, setPatrimonies] = useState([]);

	const [patrimonyModal, setPatrimonyModal] = useState(
		{ id: -1, name: '', description: "", price: 0, department: null, categories: []}
	)

	const [showModal, setShowModal] = useState(false);
	const handleShowModal = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);

	const [typeCrud, setTypeCrud] = useState('NEW');

	function newPatrimony() {
		setTypeCrud('NEW');
		setPatrimonyModal({ id: -1, name: '', description: "", price: 0, department: null, categories:[]});
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
			let novaLista = patrimonies.filter(item => item.id !== id);

			setPatrimonies([
				...novaLista
			])
		}
	}

	function handleSubmit(event) {
		console.log(patrimonyModal);
		if (typeCrud === 'NEW') {
			let lastId = 0;
			if (patrimonies.length > 0) {
				lastId = patrimonies[patrimonies.length - 1].id;
			}
			setPatrimonies([
				...patrimonies,
				{
					id: lastId + 1,
					name: patrimonyModal.name,
					description: patrimonyModal.description,
					price: patrimonyModal.price,
					department: patrimonyModal.department,
					categories: patrimonyModal.categories
				}
			]);
		} else {
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