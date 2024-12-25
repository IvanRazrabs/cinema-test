import {ISubCategory} from "./types.ts";

export class SubCategory implements ISubCategory{
    id?: number;
    name: string;
    filmIds: number[];

    constructor(name: string, filmIds?: number[], id?: number) {
        this.id = id;
        this.name = name;
        this.filmIds = filmIds ? filmIds : [];
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



}