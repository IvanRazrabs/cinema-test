export interface IEntity {
    id?: number
    name: string
}

export interface ISubCategory extends IEntity {
    filmIds: number[]
}

export interface ICategory extends IEntity {
    subCategories: ISubCategory[]
}




