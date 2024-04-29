// import { useState } from "react"
// import axios from "axios";
// import { useGetUserID } from "../hooks/useGetUserID";

// export const CreateRecipe = () =>{
//     const userID = useGetUserID();
//     const [recipe, setRecipe] = useState({
//         name: "",
//         description: "",
//         ingredients: [],
//         instructions: "",
//         imageURL: "",
//         cookingTime: 0,
//         ownerInfo: userID, 
//     });

//     const handleChange = (event)=>{
//         const {name, value} = event.target;
//         setRecipe({...recipe, [name]: value});
//     }

//     // console.log(recipe);
//     const handleIngredientChange = (event, idx) =>{
//         const {value} = event.target;
//         const ingredients = [...recipe.ingredients];
//         ingredients[idx] = value;
//         setRecipe({...recipe, ingredients});
//     }

//     const addIngredient = () =>{
//         setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]});
//     }

//     const onSubmit = async (event) =>{
//         event.preventDefault();
//         try {
//             await axios.post("http://localhost:3001/recipes", recipe);
//             alert("Recipe created sucessfully!!");
//         } catch (error) {
//             console.error(error)
//         }
//     }
//     return (
//         <div className="create-recipe">
//         <h2>Create Recipe</h2>
//         <form onSubmit={onSubmit}>
//             <label htmlFor="name"> Name </label>
//             <input id="name" type="text" name="name" onChange={handleChange}/>

//             <label htmlFor="description"> Description </label>
//             <textarea id="description" type="text" name="description" onChange={handleChange}></textarea>

//             <label htmlFor="ingredients"> Ingredients </label>
//             {recipe.ingredients.map((ingredient, idx) =>(
//                 <input name="ingredients" key={idx} type="text" value={ingredient} onChange={(event) => handleIngredientChange(event, idx)}/>
//             ))}
//             <button onClick={addIngredient} type="button"> Add Ingredient</button>

//             <label htmlFor="instructions"> Instructions </label>
//             <textarea id="instructions" type="text" name="instructions" onChange={handleChange}></textarea>

//             <label htmlFor="imageURL"> ImageURL </label>
//             <input id="imageURL" type="text" name="imamgeURL" onChange={handleChange}/><br/>

//             <label htmlFor="cookingTime"> Cooking Time (minutes) </label>
//             <input id="cookingTime" type="number" name="cookingTime" onChange={handleChange}/>

//             <button type="submit"> Create Recipe </button>
//         </form>
//     </div>
//     )
// }

import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageURL: "",
    cookingTime: 0,
    ownerInfo: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        `https://cuisine-catalog-backend.onrender.com/recipes`,
        recipe,
        {
          headers: { authorization: cookies.access_token },
        }
      );
      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={recipe.name}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={recipe.description}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)}
          />
        ))}
        <button type="button" onClick={handleAddIngredient}>
          Add Ingredient
        </button>
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imageURL">Image URL</label>
        <input
          type="text"
          id="imageURL"
          name="imageURL"
          value={recipe.imageURL}
          onChange={handleChange}
        />
        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          value={recipe.cookingTime}
          onChange={handleChange}
        />
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};