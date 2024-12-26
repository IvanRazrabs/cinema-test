import {apiEmulator} from "../Shared/util.ts";
import {ICategory, IEntity, ISubCategory} from "../Model/types.ts";
import {Category} from "../Model/Category.ts";
// import {SubCategory} from "../Model/SubCategory.ts";
// import {Category} from "../Model/Category.ts";


interface GetAllCategoriesWithFilmsResponse {
    films: IEntity[]
    categories: ICategory[]
}

type SaveCategoryRequest = GetAllCategoriesWithFilmsResponse

type NewCategory = Omit<ICategory, "id">

export type DeletedEntity = Omit<IEntity, "name">

export type UpdatedCategory = IEntity & {updatedSubCategories: ISubCategory[], deleteSubCategories: DeletedEntity[], newSubCategories: ISubCategory[]}


interface SaveCategoryResponse {
    newCategories: NewCategory[]
    updatedCategories: UpdatedCategory[]
    deletedCategories: DeletedEntity[]
}


export class CategoryApi {

    async saveCategories(curData: GetAllCategoriesWithFilmsResponse){
        const defaultData = await this.fetchDefault()
        return  await apiEmulator<SaveCategoryRequest, SaveCategoryResponse> (this.dataComparison(defaultData, curData), defaultData)
    }

    async fetchDefault () {
        const response = await fetch("data.json")
        return await response.json() as GetAllCategoriesWithFilmsResponse
    }

    dataComparison (defaultData: GetAllCategoriesWithFilmsResponse, currentData: GetAllCategoriesWithFilmsResponse): SaveCategoryResponse{

        const {categories: currentCategories} = currentData
        const {categories: defaultCategories} = defaultData

        // новые
        const newCategories: NewCategory[] = Category.getNew(currentCategories)

        // удаленные
        const deletedCategories: DeletedEntity[] = Category.getDeleted(defaultCategories, currentCategories)

        // обновленные
        const updatedCategories = Category.getUpdated(defaultCategories, currentCategories)

        return {
            newCategories,
            updatedCategories,
            deletedCategories
        }

    }

}