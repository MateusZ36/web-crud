import { useDepartments } from "../../../context/DepartmentContext"

export default function CountDepartment() {

    const { departments } = useDepartments();

    return <h5>{departments.length}</h5>
}