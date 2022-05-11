import {usePatrimonies} from "../../../context/PatrimonyContext";

export default function CountPatrimony() {

    const { patrimonies } = usePatrimonies();

    return <h5>{patrimonies.length}</h5>
}