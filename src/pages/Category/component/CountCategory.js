import {useCategories} from "../../../context/CategoryContext";

export default function CountCategory() {

    const { categories } = useCategories();

    return <h5>{categories.length}</h5>
}