import React, { useContext } from "react";
import { loginUser } from "../actions/authentication.action";
import LoginForm from "../components/LoginForm"

const Login = () => {
    const context = useContext(AuthGlobal);
    const [showChild, setShowChild] = useState(false);
    useEffect(() => {
      if (context.stateUser.isAuthenticated === true) {
        props.history.push("/");
      }
      setShowChild(true);
    }, [context.stateUser.isAuthenticated, props.history]);
  
    if(!showChild){
      return null;
    } else {
      return <LoginForm />
    }
  }
  
  export default Login;