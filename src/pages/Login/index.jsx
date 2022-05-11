import { Link } from "react-router-dom";

export default function LoginPage() {
    return(
        <div>
            <h1>Login</h1>
            <hr />
            <Link to='/dashboard'>Entrar no Sistema</Link>
        </div>
    );
}