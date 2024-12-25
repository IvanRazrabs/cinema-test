import {useEffect, useState} from 'react'

import './App.css'
import {CategoryApi} from "./API/CategoryApi.ts";
import {ICategory, IEntity} from "./Model/types.ts";
import {CategoryList} from "./Components/CategoryList.tsx";

const categoryAPI = new CategoryApi();

function App() {



    const [films, setFilms] = useState<IEntity[]>([])
    const [categories, setCategories] = useState<ICategory[]>([])

    useEffect(() => {
        categoryAPI.fetchDefault()
            .then(data => {
                const {films, categories} = data
                setFilms(films)
                setCategories(categories)
            })

    }, []);

    console.log('films:', films)
    console.log('categories:', categories)


  return (
    <>
        <CategoryList categories={categories}/>
    </>
  )
}

export default App
