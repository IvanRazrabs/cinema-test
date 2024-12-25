import {ICategory, ISubCategory} from "./types.ts";

export class Category implements ICategory{
    name: string;
    subCategories: ISubCategory[];
    id?: number

    constructor(name: string, subCategories?: ISubCategory[], id?: number) {
        this.name = name;
        this.subCategories = subCategories ? subCategories : []
        this.id = id;
    }

    addSubCategory(subCategory: ISubCategory) {
        if (this.subCategories.some(item => item.name === subCategory.name)) throw new Error(`Category with name: ${subCategory.name} already exists`)
        this.subCategories.push(subCategory)
        this.subCategories = [...this.subCategories]
    }

    removeSubCategory(subCategoryId: number) {
        const deleteIndex = this.subCategories.findIndex(item => item.id === subCategoryId);
        if (deleteIndex < 0) throw new  Error(`SubCategory with id: ${subCategoryId} does not exist`)
        this.subCategories = [...this.subCategories.splice(deleteIndex, 1)]
    }

}