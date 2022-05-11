import { useDepartments } from "../../../context/DepartmentContext"

export default function CountCategory() {

    const { departments } = useDepartments();

    return <h5>Total de Registros: {departments.length}</h5>
}