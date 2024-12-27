import {SubCategory} from "../../Model/SubCategory.ts";
import {Button} from "@mui/material";

type Props = {
    edit: boolean
    subs: SubCategory[]
}

export const SubEditor = (props: Props) => {
    const { edit, subs } = props

    return (
        <ul>
            {subs.map(item => {
                return <li key={item.id}>{item.name}</li>
            })}
            {edit && <li key="edit-sub-button"><Button>+</Button></li>}
        </ul>
    )
}