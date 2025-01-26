import BoardPanel from "@/components/login/BoardPanel";
import LoginPanel from "@/components/login/LoginPanel";


const LoginPage = () => {

  return (
    <div className="login-page flex md:flex-row flex-col">
      <LoginPanel/>
      <BoardPanel/>
    </div>
  )
}

export default LoginPage;