import {ICategory} from "../Model/types.ts";

type Props = {
    categories: ICategory[]
}

export const CategoryList = (props: Props) => {
    const {categories} = props
    return (
        <ul>
            {categories.map((category: ICategory) => (
                <li key={category.id}>
                    <div>{category.id}</div>
                    <div>{category.name}</div>
                </li>
            ))}
        </ul>
    )
}