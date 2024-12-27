import {useEffect, useState} from 'react'

import './App.css'
import {CategoryApi} from "./API/CategoryApi.ts";
import {IEntity} from "./Model/types.ts";
import {CategoryList} from "./Components/CategoryList/CategoryList.tsx";
import {Details} from "./Components/Details/Details.tsx";
import {Category} from "./Model/Category.ts";
import {SubCategory} from "./Model/SubCategory.ts";
import {Button} from "@mui/material";

const categoryAPI = new CategoryApi();

function App() {

    const [allFilms, setAllFilms] = useState<IEntity[]>([])
    const [categories, setCategories] = useState<Category[]>([])

    const [showFilms, setShowFilms] = useState<IEntity[]>([])
    const [selectedEntity, setSelectedEntity] = useState<IEntity | null>(null)


    console.log(categories)


    useEffect(() => {
        categoryAPI.fetchDefault()
            .then(data => {
                const {films, categories} = data
                setAllFilms(films)
                setCategories(categories.map(cat => {
                    const subCats = cat.subCategories.map(subCat => new SubCategory(subCat.name, subCat.filmIds, subCat.id))
                    return new Category(cat.name, subCats, cat.id)
                }))
            })

    }, []);

    const filmsSelectorHandler = (filmIds: number[]) => {
        const result: IEntity[] = []

        for (const id of filmIds) {
            const film  = allFilms.find(item => item.id === id)
            if (film) result.push(film)
        }
        setShowFilms(result)
        setSelectedEntity(null)
    }

    const entitySelectorHandler = (entity: IEntity) => {
        setSelectedEntity(entity)
        setShowFilms([])
    }

    const addCategoryHandler = () => {
        console.log("addCategoryHandler")
        const newCat = new Category("")
        setSelectedEntity(newCat)
        setShowFilms([])

    }

    console.log('films:', allFilms)
    console.log('categories:', categories)


  return (
    <>
        <header>
            <h1>Cinema MVP</h1>
            <Button onClick={() => {addCategoryHandler()}}>Add category</Button>
        </header>
        <div className="content">
            <CategoryList categories={categories} filmsSelector={filmsSelectorHandler} entitySelector={entitySelectorHandler} />
            <Details films={showFilms} entity={selectedEntity} />
        </div>
        <footer>Footer</footer>

    </>
  )
}

export default App
