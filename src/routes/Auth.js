import { authService } from "fbase";
import React, {useState} from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {target : {name, value}, } = event;
        if(name === "email") {
            setEmail(value);
        } else if(name === "password") {
            setPassword(value);
        }
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        try {
            let data;

            if(newAccount) {
                const data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                const data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log(data);
        } catch(error) {   
            setError(error.message.replace("Firebase:", ""));
        }    
    };

    const toggleAccount = () => setNewAccount(prev => !prev);


    return(
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} name="email" type="email" placeholder="Email" required value={email}/>
                <input onChange={onChange} name="password" type="password" placeholder="Password" required value={password}/>
                <input type="submit" value={newAccount ? "Create Account" : "Sign In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</span>
            <div>
                <button>Continue with Google</button>
            </div>
        </div>
        );
    }
 export default Auth;