import {apiEmulator} from "../Shared/util.ts";
import {ICategory, IEntity, ISubCategory} from "../Model/types.ts";


interface GetAllCategoriesWithFilmsResponse {
    films: IEntity[]
    categories: ICategory[]
}

type SaveCategoryRequest = GetAllCategoriesWithFilmsResponse

type NewCategory = Omit<ICategory, "id">

type DeletedEntity = Omit<IEntity, "name">

type UpdatedCategory = IEntity & {updatedSubCategories: ISubCategory[], deleteSubCategories: DeletedEntity}


interface SaveCategoryResponse {
    newCategories: NewCategory[]
    updatedCategories: UpdatedCategory[]
    deletedCategories: DeletedEntity[]
}


export class CategoryApi {

    async saveCategories(){
        const defaultData = await this.fetchDefault()
        return  await apiEmulator<SaveCategoryRequest, SaveCategoryResponse> (defaultData)
    }

    async fetchDefault () {
        const response = await fetch("data.json")
        return await response.json()
    }

    dataComparison (defaultData: GetAllCategoriesWithFilmsResponse, currentData: GetAllCategoriesWithFilmsResponse){
        // новые - это все без id
        const {categories: currentCategories} = currentData
        const {categories: defaultCategories} = defaultData

        const newCategories: NewCategory[] = currentCategories.filter(item => item.id === undefined)

        // удаленные это все отсутствующие в текущем
        const deletedCategories: DeletedEntity[] = defaultCategories.reduce((acc, item) => {
            if (!currentCategories.some(curItem => curItem.id === item.id)) return [...acc, {id: item.id}]
            return acc

        }, [] as DeletedEntity[])

        //
        const updatedCategories: UpdatedCategory[] = []
        // дефолтные - удаленные
        defaultCategories.forEach(defCat => {

            const {id, name, subCategories} = defCat

            currentCategories.forEach(curCat => {
                const {id: curId, name: curName, subCategories: curSubCategories} = curCat
                //забираем только те у которых одинаковые id
                if (id === curId) {
                    const sameName = name === curName


                }






            })

        })




        return {
            newCategories,
            updatedCategories,
            deletedCategories
        }

    }

}