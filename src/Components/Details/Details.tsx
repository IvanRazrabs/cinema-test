import {IEntity} from "../../Model/types.ts";
import {FilmList} from "./FilmList.tsx";
import {Settings} from "./Settings.tsx";

type Props = {
    films?: IEntity[]
    entity: IEntity | null
}

export const Details = (props: Props) => {
    const {films, entity} = props

    const edit = entity?.name.length === 0 && entity.id === undefined

    const render = () =>  {
        if (films && films.length > 0) {
            return <FilmList films={films}/>
        }else if (entity) {
            return <Settings entity={entity} edit={edit}/>
        }else{
            return <div>No data to display</div>
        }

    }

    return render()
    }