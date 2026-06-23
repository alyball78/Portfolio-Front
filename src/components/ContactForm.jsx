import { useForm } from "react-hook-form";
import { useState} from "react";
import { useFetch } from "../hooks/useFetch";
import { toast } from "sonner";

const ContactForm = () => {
const [err, setErr] = useState(null);
const [loading, setLoading] = useState(false);

const {
register,
handleSubmit,
reset,
setError,
formState: {errors},
} = useForm ({ mode: "onTouch"});
const {apiFetch} = useFetch();
const sendMessage= async (data) => {
    try {
        const result = await apiFetch("/contact",
{method: "post", 
body: JSON.stringify(data),
});

            if (result?.validationErrors) {
                result.validationErrors.forEach((validationError) => {
                    setError(validationError.path, { message: validationError.msg });
                });
                return;
            }

            toast.success(result.message);
            reset();
        } catch (error) {   
            setErr(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>"Chargement en cours"</p>;
    if (err) return <p>{"Erreur en cours : " + err}</p>;
  
    return (
    <>
    <h2>Nous contacter</h2>
    <form onSubmit={handleSubmit(sendMessage)}>
<fieldset>
<label htmlFor="name">Votre nom</label>
                <input 
                type="text"
                id="name"
                {...register("name", {
                    required: "Le champ nom est requis",
                    minLength:{
                        value: 2,
                        message: "min 2",
},
                }  )}/>
                {errors.name && <p>{errors.name.message}</p>  }
                </fieldset>
                <fieldset>
<label htmlFor="email">Votre adresse mail</label>
<input 
type="email" 
id="email"
{...register("email", {
    required: "l'email est requis",
    pattern: {
        value: /\S+@\S+\.\S+/,
        message: "Le format de l'email saisi n'est pas conforme",
    },
}
)}/>
{errors.email && <p>{errors.email.message}</p> }
                </fieldset>
    <fieldset>

<textarea 
                        rows="5"
                        cols="33"

id="message"
placeholder="Votre message"
{...register("message", {
required: "Le champ message est requis",
minLength: {
    value: 10,
    message: "10",

}, })}/>
{errors.message && <p>{errors.message.message}</p>  }
</fieldset>
                <button type="submit">Envoyer le message</button>

    
    </form>
    
    
    </>
    )

    };    
    export default ContactForm
