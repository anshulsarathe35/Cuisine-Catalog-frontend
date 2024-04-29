import { useEffect, useState } from "react"
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";

export const Home = () =>{
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [cookies, _] = useCookies();
    const userID = useGetUserID();
    
    useEffect(() =>{
        const fetchRecipe = async() =>{
            try {
                const response = await axios.get("https://cuisine-catalog-backend.onrender.com/recipes")
                setRecipes(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        const fetchSavedRecipe = async() =>{
            try {
                const response = await axios.get(`https://cuisine-catalog-backend.onrender.com/recipes/savedRecipes/ids/${userID}`)
                setSavedRecipes(response.data.savedRecipes);
                console.log(response.data)
            } catch (error) {
                console.error(error);
            }
        }

        fetchRecipe();
        fetchSavedRecipe();
    }, []);

    const saveRecipe =  async (recipeID) =>{
        try {
            const response = await axios.put("https://cuisine-catalog-backend.onrender.com/recipes", {
                recipeID,
                userID
            } , {headers: {authorization: cookies.access_token}});
            setSavedRecipes(response.data.savedRecipes);
        } catch (error) {
            alert("Please Login correctly")
            console.log(error)
        }
    }

    const isRecipeSaved = (id) => savedRecipes.includes(id);
    
    return (
    <div>
        <h1>Recipes</h1>
        <ul>
            {recipes.map((recipe) =>(
                <li key={recipe._id}>
                    <div>
                        <h2>{recipe.name}</h2>
                        <button onClick={() => saveRecipe(recipe._id)}
                        disabled={isRecipeSaved(recipe._id)}
                        >
                            {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                            </button>
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