import { Link } from 'react-router-dom';
import './loginstyle.css';

function Login() {
  return (
    <div className="wrapper">
        <form action="">
            <h1>Login</h1>
            <div className="input-box">
                <input type="text" name="username" placeholder="Username" required />
                <i className='bx bx-user'></i>
            </div>
            <div className="input-box">
                <input type="password" name="password" placeholder="Password" required />
                <i className='bx bx-lock-alt'></i>
            </div>
            <button type="submit" class="btn">Login</button>
            <div className="register-link">
                <p>Tidak punya akun?<Link to='/register'> Register</Link></p>
            </div>
        </form>
    </div>
  );
}

export default Login;