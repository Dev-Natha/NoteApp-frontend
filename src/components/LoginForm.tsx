// import { Link } from "react-router-dom"
// import { CiLogin } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom"
import "../css/Auth.css"
import { useState } from "react"
type registerResponse = {jwt:string, py:{exp:string, iat:string, id:number}}

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()

  function submitForm(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    const loginData = {username, password}
     fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(loginData)
    }).then((resp) => resp.json()).then((data:string[] | registerResponse) =>{
        if (typeof data === 'object' && data !== null && 'jwt' in data && 'py' in data) {
            alert("Login successful")
            setErrorMessage("")
            navigate('/')

        } else {
            setErrorMessage(data[0])
        }
    }).catch((err) => console.log(err))
}
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-0 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="/note-appicon.png"
            alt="Your Company"
          />
          <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
        <p style={{color:"#ff3737", fontWeight:"bold", margin:"0", padding:"0"}}>{errorMessage && errorMessage}</p>
          <form className="space-y-6" action="" method="POST" onSubmit={(e) => submitForm(e)}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 sm:text-sm sm:leading-6"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-2 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Register
            </Link>
          </p>
        </div>
      </div>

  )
}

export default LoginForm