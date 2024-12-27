import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import IconButton from "@mui/material/IconButton";
import {MouseEventHandler} from "react";

type Props = {
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined
}

export const SettingsButton = (props: Props) => {
    const {onClick} = props
    return (<IconButton size="small" onClick={onClick}>
                <SettingsOutlinedIcon/>
            </IconButton>
    )
}