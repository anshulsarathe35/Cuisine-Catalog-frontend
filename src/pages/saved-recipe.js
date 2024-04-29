import { useEffect, useState } from "react"
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";

export const SavedRecipe = () =>{
    const [savedRecipes, setSavedRecipes] = useState([]);
    const userID = useGetUserID();
    const [cookies, _] = useCookies();
    useEffect(() =>{
        const fetchSavedRecipe = async() =>{
            try {
                const response = await axios.get(`https://cuisine-catalog-backend.onrender.com/recipes/savedRecipes/${userID}`,
                {headers: {authorization: cookies.access_token}})
                setSavedRecipes(response.data.savedRecipes);
                console.log(response.data)
            } catch (error) {
                console.error(error);
            }
        }

        fetchSavedRecipe();
    }, []);
    
    return (
    <div>
        <h1>Saved Recipes</h1>
        <ul>
            {savedRecipes.map((recipe) =>(
                <li key={recipe._id}>
                    <div>
                        <h2>{recipe.name}</h2>
                    </div>
                    <div className="instructions">
                        <p>{recipe.instructions}</p>
                    </div>
                    <img src={recipe.imageURL} alt={recipe.name}/>
                    <p>Cooking Time : {recipe.cookingTime} (minutes)</p>
                </li>
            ))}
        </ul>
    </div>
    );
}