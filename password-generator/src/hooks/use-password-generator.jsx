import { useState } from "react";

const usePasswordGenerator = () => {
    const[password,setPassword] = useState("");
    const[errorMessage,setErrorMessage] = useState("");
    const generatePassword = (checkboxData,length) =>{
        let charSet = ""
        let generatedPassword = ""
        const selectedOptions = checkboxData.filter(checkbox=>checkbox.state)
        if(selectedOptions.length===0)
        {
            setErrorMessage("select atleast one option")
            setPassword("")
            return
        }
        selectedOptions.forEach((element) => {
            switch(element.title)
            {
                case "Include Uppercase Letters":
                    charSet += "ABCDeFGHIJKLMNOPQRSTUVWXYZ";
                    break;
                case "Include Lowercase Letters":
                    charSet += "abcdefghijklmnopqrstuvwxyz";
                    break;
                case "Include Numbers":
                    charSet += "0123456789";
                    break;
                case "Include Symbol":
                    charSet += "!@#$%^&*";
                    break;
                default:
                    charSet="";
                    break
            }
        });

        for(let i = 0; i< length;i++)
        {
            const randomIndex = Math.floor(Math.random()*charSet.length)
            generatedPassword += charSet[randomIndex];
        }

        setPassword(generatedPassword)
        setErrorMessage("")
    }
    return {password,errorMessage,generatePassword};
};


export default usePasswordGenerator