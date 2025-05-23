import {Link} from 'react-router-dom';
import {useContext, useEffect} from "react";
import {UserContext} from "./UserContext";

export default function Header() {
  const {setUserInfo, userInfo} = useContext(UserContext)
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',

    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, [setUserInfo]);


  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
      
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;
  return(
    <header>
        <Link to = "/" className = "logo">InternshipArticles</Link>
        <nav> 
          {username && (
            <>
              <Link to = "/share"> Share your Story</Link>
              <a onClick={logout}>logout</a>
            </>
          )}
          {!username && (
            <>
            <Link to = "/login">Log In</Link>
            <Link to = "/register">Register</Link>
            </>
            
    
          )}
        
        </nav>
      </header>
  );
}