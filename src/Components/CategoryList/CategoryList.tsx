import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import {useState} from "react";
import {Category} from "../../Model/Category.ts";
import {SettingsButton} from "../SettingsButton/SettingsButton.tsx";
import {SubCategory} from "../../Model/SubCategory.ts";
import {IEntity} from "../../Model/types.ts";

type Props = {
    categories: Category[]
    filmsSelector: (ids: number[]) => void
    entitySelector: (entity: IEntity) => void
}

export const CategoryList = (props: Props) => {
    const {categories, filmsSelector, entitySelector} = props
    const [expanded, setExpanded] = useState<string[]>(categories.flatMap(item => [item.fakeId].concat(item.subCategories.map(sub => sub.fakeId))))
    const flatMap = categories.flatMap(item => [item.fakeId].concat(item.subCategories.map(sub => sub.fakeId)))
    console.log("expanded: ", expanded)
    console.log("flatMap: ", flatMap)



    const itemClickHandler = (id: string) => {

        console.log("clicked: ", id)
        const cat  = categories.find(cat => cat.fakeId === id)
        if (cat) {
            const films =  cat.films
            console.log("films: ", films)
            filmsSelector(films)
        }else{
            for (const cat of categories){
                const subCat = cat.subCategories.find(sub => sub.fakeId === id)
                if (subCat) {
                    const films =  subCat.filmIds
                    console.log("films: ", films)
                    // return films
                    filmsSelector(films)
                }
            }

        }
    }

    const settingsClickHandler = (item: Category | SubCategory) => {
        console.log(`Click on ${item.name}`)
        entitySelector(item)
    }


    return (
        <SimpleTreeView  onItemClick={(_e, id) => {
            itemClickHandler(id)
        }}>
            {categories.map(category => {
                return (
                    <TreeItem key={category.fakeId} itemId={category.fakeId} label={
                        <div>
                            {category.name}
                            <SettingsButton onClick={(e) => {
                                e.stopPropagation()
                                settingsClickHandler(category)
                            }}/>
                        </div>
                    }>
                        {category.subCategories.map(subCat => {
                            return (
                                <TreeItem key={subCat.fakeId} itemId={subCat.fakeId} label={
                                    <div>
                                        {subCat.name}
                                        <SettingsButton onClick={(e) => {
                                            e.stopPropagation()
                                            settingsClickHandler(subCat)
                                        }}/>
                                    </div>
                                }>
                                </TreeItem>
                            )
                        })}
                    </TreeItem>
                )

            })}
        </SimpleTreeView>
    )
}