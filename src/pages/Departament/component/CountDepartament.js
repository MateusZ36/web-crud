import { useDepartaments } from "../../../context/DepartamentContext"

export default function CountDepartament() {

    const { departaments } = useDepartaments();

    return <h5>Total de Registros: {departaments.length}</h5>
}