import React from 'react'
import { useContext } from "react";
import { useForm } from "react-hook-form"; 
import { useFetch } from '../hooks/useFetch';
import { AuthContext } from '../context/AuthContext';
const LoginPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { apiFetch } = useFetch();
  const { login } = useContext(AuthContext);


  const onSubmitForm = async (data) => {
  // appel apiFetch ici

    const res = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }) 
  
    login(res.token);
  };

return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
    <div>
    <label htmlFor="email">Votre adresse mail</label>
    <input type="email" placeholder="email" id="email" {...register('email', { required: true })} />
    {errors.email && <p>Email requis</p>}
    </div>
    <div>
      <label htmlFor="password">Votre mot de passe</label>
    <input
      type="password"
      placeholder="mot de passe"
      id="password"
      {...register("password", {
        required: "Le mot de passe est obligatoire",
      })}/>
    </div>
  <div>
  <input type="submit" value="Se connecter" />
    </div>
  </form>
);

}
export default LoginPage;