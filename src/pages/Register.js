import './register.css';

function Register() {
  return (
    <div className="wrapper">
        <form action="">
            <h1>Register</h1>
            <div class="input-box">
                <input type="email" placeholder="Email" required />
                <i className='bx bx-envelope'></i>
            </div>
            <div className="input-box">
                <input type="text" placeholder="Username" required />
                <i className='bx bx-user'></i>
            </div>
            <div className="input-box">
                <input type="password" placeholder="Password" required />
                <i className='bx bx-lock-alt'></i>
            </div>
            <button type="submit" className="btn">Register</button>
        </form>
    </div>
  );
}

export default Register;