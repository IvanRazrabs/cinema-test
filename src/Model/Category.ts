import {ICategory} from "./types.ts";
import {SubCategory} from "./SubCategory.ts";
import {DeletedEntity, UpdatedCategory} from "../API/CategoryApi.ts";
import { v4 as uuidv4 } from 'uuid';

export class Category implements ICategory{
    name: string;
    subCategories: SubCategory[];
    id?: number
    fakeId: string

    constructor(name: string, subCategories?: SubCategory[], id?: number) {
        this.name = name;
        this.subCategories = subCategories ? subCategories : []
        this.id = id;
        this.fakeId = uuidv4()
    }

    get films() {
        let result = new Set<number>()
        for (const sub of this.subCategories) {
            for (const id of sub.filmIds) {
                result.add(id)
            }
        }

        return [...result]
    }

    static getNew (curCats: ICategory[]){
        return curCats.filter(item => item.id === undefined);
    }

    addSubCategory(subCategory: SubCategory) {
        if (this.subCategories.some(item => item.name === subCategory.name)) throw new Error(`Category with name: ${subCategory.name} already exists`)
        this.subCategories.push(subCategory)
        this.subCategories = [...this.subCategories]
    }

    removeSubCategory(subCategoryId: number) {
        const deleteIndex = this.subCategories.findIndex(item => item.id === subCategoryId);
        if (deleteIndex < 0) throw new  Error(`SubCategory with id: ${subCategoryId} does not exist`)
        this.subCategories = [...this.subCategories.splice(deleteIndex, 1)]
    }

    // static isUpdated (baseCategory: Category, currentCategory: Category) {
    //     const {id: baseId, name: baseName} = baseCategory
    //     const {id, name} = currentCategory
    //     if (baseId !== id) return false
    //     const isSameName = baseName === name
    //     let updatedSubCategories = []
    //     let deletedSubCategories = Category.getDeletedSubs(baseCategory, currentCategory)
    //
    //
    // }


    static isExist (category: ICategory, categories: ICategory[]) {
        return categories.some(item => item.id === category.id)
    }

    static getUpdated (baseCategories: ICategory[], curCategories: ICategory[]) {
        let updatedCategories: UpdatedCategory[] = []

        for (const baseCat of baseCategories){
            for (const curCat of curCategories){
                if (baseCat.id === curCat.id) {
                    const isSameName = baseCat.name === curCat.name
                    const deletedSubs = Category.getDeletedSubs(baseCat, curCat)
                    const updatedSubs = Category.getUpdatedSubCategories(baseCat, curCat)
                    const newSubs = curCat.subCategories.filter(item => item.id === undefined)

                    if (!isSameName || deletedSubs.length > 0 || updatedSubs.length > 0 || newSubs.length > 0) updatedCategories.push({
                        id: curCat.id,
                        name: curCat.name,
                        updatedSubCategories: updatedSubs,
                        deleteSubCategories: deletedSubs,
                        newSubCategories: newSubs,
                    })
                }
            }
        }

        return updatedCategories


    }



    static getDeletedSubs = (baseCat: ICategory, curCat: ICategory) => {
        let deletedSubs: DeletedEntity[] = []
        const {id: baseId, subCategories: baseSubCats} = baseCat
        const {id, subCategories} = curCat
        if (id !== baseId) return deletedSubs
        for (const item of baseSubCats) {
            if (!item.isExist(subCategories)) deletedSubs.push({id: item.id})
        }
        return deletedSubs
    }

    static getUpdatedSubCategories(baseCat: ICategory, curCat: ICategory) {
        let updatedSubs: SubCategory[] = []
        const {id: baseId, subCategories: baseSubCats} = baseCat
        const {id, subCategories} = curCat
        if (id !== baseId) return updatedSubs
        for (const item of baseSubCats) {
            for (const curSubCat of subCategories){
                if (SubCategory.isUpdated(item, curSubCat)) updatedSubs.push(curSubCat)
            }
        }
        return updatedSubs
    }



    areEqual (prev: Category, current: Category){
        const sameId = prev.id === current.id
        const sameName = prev.name === current.name;

        const sameSubs = prev.subCategories.reduce((acc, prevSubCat) => {
            current.subCategories.forEach(curSubCat => {
                if (SubCategory.areEqual(prevSubCat, curSubCat)) return true
            })

            return acc
        }, false)


        return sameId && sameName && sameSubs
    }

    static getDeleted (baseCats: ICategory[], curCats: ICategory[]) {
        let deleted: DeletedEntity[] = []
        for (const baseCat of baseCats) {
            if (!Category.isExist(baseCat, curCats)) deleted.push({id: baseCat.id})
        }
        return deleted
    }

}