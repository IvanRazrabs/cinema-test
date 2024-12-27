import {ISubCategory} from "./types.ts";
import { v4 as uuidv4 } from 'uuid';

export class SubCategory implements ISubCategory{
    id?: number;
    name: string;
    filmIds: number[];
    fakeId: string

    constructor(name: string, filmIds?: number[], id?: number) {
        this.id = id;
        this.name = name;
        this.filmIds = filmIds ? filmIds : [];
        this.fakeId = uuidv4()
    }

    removeFilm(id: number) {
        this.filmIds = [...this.filmIds.splice(this.filmIds.findIndex(item => item === id), 1)];
    }

    addFilm(id: number) {
        if (this.filmIds.some(item => item === id)) throw new  Error(`Has film with id: ${id}`);
        this.filmIds.push(id);
        this.filmIds = [...this.filmIds]
    }

    static areEqual (prev: SubCategory, current: SubCategory){
        const sameId = prev.id === current.id
        const sameName = prev.name === current.name;
        const sameFilms = prev.filmIds.sort.toString() === current.filmIds.sort.toString();
        return sameId && sameName && sameFilms
    }

    get isNew(){
        return !!this.id
    }

    isExist(baseSubcategories: SubCategory[]){
        return baseSubcategories.some(item => item.id === this.id)
    }

    static isUpdated (baseSubcategory: SubCategory, currentSubcategory: SubCategory) {
        const {id: baseId, name: baseName, filmIds: baseFilmIds} = baseSubcategory
        const {id, name, filmIds} = currentSubcategory

        if (id !== baseId) return false;

        const isSameName = name === baseName
        const isSameFilms = filmIds.sort().toString() === baseFilmIds.sort().toString()

        return !isSameName || !isSameFilms
    }

}