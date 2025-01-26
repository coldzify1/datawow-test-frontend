import { useState } from "react";
import Button from "../common/Button"
import useLogin from "@/hooks/useLogin";


const LoginPanel = () => {
  const [username,setUsername] = useState("");
  const {error,login,loading} = useLogin()
  const handleClickSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    login(username);
  }
  return (
    <div className="login-panel flex items-center justify-center order-2 md:order-1 w-full md:w-[62.5%]">
      <div className="inner-login-panel-box">
        <h2 className="mb-10 mt-28 md:mt-0">Sign in</h2>
        <input className="input block w-full" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}  />
        <Button className="w-full block mb-5" onClick={handleClickSignIn} disabled={loading}>Sign in</Button>
        { !!error && <div className="mt-2 text-xs text-red-700 font-bold">{error}</div>}
      </div>

    </div>
  )
}

export default LoginPanel