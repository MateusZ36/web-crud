import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';
import {toast} from "react-toastify";

const CategoryContext = createContext();

export default function CategoryProvider({children}){

	const [categories, setCategories] = useState([]);

	useEffect(
		() => {
			axios.get('http://localhost:8080/category/all').then(
				response => {
					setCategories(response.data)
				}
			)
		}, []
	)

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
			axios.delete(`http://localhost:8080/category/${id}`).then(
				()=>{
					setCategories([...categories.filter(item => item.id !== id)])
				}
			).catch(
				e=>toast.error(JSON.parse(e.request.response).message, ));
		}
	}

	function handleSubmit(event) {
		if (typeCrud === 'NEW') {
			axios.post('http://localhost:8080/category', categoryModal).then(
				response => {
					setCategories([
						...categories,
						response.data
					])
				}
			)
		} else {
			axios.put(`http://localhost:8080/category/${categoryModal.id}`,
				categoryModal);
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
			setCategoryModal
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
		setCategoryModal
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
		setCategoryModal
	};
}