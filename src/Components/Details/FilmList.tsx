import styles from './FilmList.module.css'
import {IEntity} from "../../Model/types.ts";
import {Card, CardContent, CardHeader} from "@mui/material";
import CameraAltIcon from '@mui/icons-material/CameraAlt';

type Props = {
    films: IEntity[]
}

export const FilmList = (props: Props) => {
    const {films} = props

    return (
        <div className={styles.details}>
            {films.map(item => {
                return (
                    <Card sx={{ width: 345, height: 345 }} key={item.id}>
                        <CardHeader
                            title={item.name}
                            sx={{textAlign: "center"}}
                        />
                        <CardContent>
                            <CameraAltIcon sx={{width: "100%", height: "100%", opacity: 0.4}} />
                        </CardContent>

                    </Card>
                )
            })}
        </div>
    )
}