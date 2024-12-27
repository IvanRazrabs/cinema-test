import {IEntity} from "../../Model/types.ts";
import {Category} from "../../Model/Category.ts";
import {Button, TextField} from "@mui/material";
import {useState} from "react";
import styles from "./Settings.module.css"
import {SubEditor} from "./SubEditor.tsx";


type Props = {
    entity: IEntity
    edit?: boolean
}

export const Settings = (props: Props) => {
    const {entity, edit} = props;
    const isCategory = entity instanceof Category

    const [isEdited, setIsEdited] = useState(!!edit)

    const [curName, setCurName] = useState<string>(entity.name)

    const headerPrefix =  isCategory ? `Категория: ` : `Подкатегория: `
    const headerName = entity.id === undefined && entity.name.length === 0 ? "Новая" : entity.name
    const header = headerPrefix + headerName


    const onEditHandler = () => {
        console.log("onEditHandler")
        setIsEdited(true)
    }

    const onSaveHandler = () => {
        console.log("onSaveHandler")
        setIsEdited(false)
    }

    const onCancelHandler = () => {
        console.log("onCancelHandler")
        setIsEdited(false)
    }

    const nameHandler = (newName: string) => {
        setCurName(newName)
    }




    return (
        <div className={styles.container}>
            <h1>{header}</h1>
            <TextField value={curName} disabled={!isEdited} onChange={(e) => {
                nameHandler(e.target.value)
            }}></TextField>

            {isCategory && <SubEditor edit={isEdited} subs={entity.subCategories}/>}

            <div className={styles.buttons} >
                {
                    !isEdited && <Button onClick={() => {
                        onEditHandler()
                    }}>Edit</Button>
                }

                {isEdited && <Button onClick={() => {onSaveHandler()}}>Save</Button>}
                {isEdited && <Button onClick={() => {onCancelHandler()}}>Cancel</Button>}
            </div>

        </div>
    )
}