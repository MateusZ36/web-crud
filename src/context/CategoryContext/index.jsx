import React, { createContext, useState, useContext} from 'react';

const CategoryContext = createContext();

export default function CategoryProvider({children}){

	const [categories, setCategories] = useState([]);

	const [categoryModal, setCategoryModal] = useState(
		{ id: -1, name: '' }
	)

	const [showModal, setShowModal] = useState(false);
	const handleShowModal = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);

	const [typeCrud, setTypeCrud] = useState('NEW');

	function newCategory() {
		setTypeCrud('NEW');
		setCategoryModal({ id: -1, name: '' });
		handleShowModal();
	}

	function editCategory(category) {
		setTypeCrud('EDIT');
		setCategoryModal(category);
		handleShowModal();
	}

	function deleteCategory(id) {
		let confirmDelete = window.confirm('Confirma a exclusão do ítem?');
		if (confirmDelete) {
			let novaLista = categories.filter(item => item.id !== id);

			setCategories([
				...novaLista
			])
		}
	}

	function handleSubmit(event) {
		if (typeCrud === 'NEW') {
			let lastId = 0;
			if (categories.length > 0) {
				lastId = categories[categories.length - 1].id;
			}
			setCategories([
				...categories,
				{
					id: lastId + 1,
					name: categoryModal.name
				}
			]);
		} else {
			let categoriesList = categories;
			for (let index = 0; index < categories.length; index++) {
				const element = categories[index];
				if (element.id === categoryModal.id) {
					categoriesList[index] = categoryModal;
				}
			}
			setCategories([
				...categoriesList
			])
		}
		handleCloseModal();
		event.preventDefault();
	}

	function getCategoryNameById(id) {
		let filteredCategories = categories.filter(d => d.id === id)
		return filteredCategories.length>0?filteredCategories[0].name:null;
	}

	return (
		<CategoryContext.Provider value={{
			categories,
			setCategories,
			newCategory,
			editCategory,
			deleteCategory,
			showModal,
			handleCloseModal,
			handleSubmit,
			categoryModal,
			setCategoryModal,
			getCategoryNameById
		}}>
			{children}
		</CategoryContext.Provider>
	);
}

export function useCategories(){
	const context = useContext(CategoryContext);
	const {
		categories,
		setCategories,
		newCategory,
		editCategory,
		deleteCategory,
		showModal,
		handleCloseModal,
		handleSubmit,
		categoryModal,
		setCategoryModal,
		getCategoryNameById
	} = context;
	return {
		categories,
		setCategories,
		newCategory,
		editCategory,
		deleteCategory,
		showModal,
		handleCloseModal,
		handleSubmit,
		categoryModal,
		setCategoryModal,
		getCategoryNameById
	};
}