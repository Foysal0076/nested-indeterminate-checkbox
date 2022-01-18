import React from "react"
import { useEffect, useState } from "react/cjs/react.development"
import Checkbox from "./Checkbox"
import { status } from "./constants"

const List = (props) => {
    const { items, compute } = props

    // console.log({ items })

    // return (
    //     <ul>
    //         {items.map((item) => {
    //             let childList = null
    //             if (Array.isArray(item.items)) {
    //                 childList = <List items={item.items} compute={compute} />
    //             }
    //             return (
    //                 <li key={item.id}>
    //                     <Checkbox
    //                         id={item.id}
    //                         name={item.name}
    //                         checked={item.status === status.checked}
    //                         indeterminate={item.status === status.indeterminate}
    //                         compute={compute}
    //                     />
    //                     <label htmlFor={item.name}>{item.name}</label>
    //                     {childList}
    //                 </li>
    //             )
    //         })}
    //     </ul>
    // )
    return (
        <>
            <div style={{ display: 'flex' }}>
                <Checkbox
                    id={items[0].id}
                    name={items[0].name}
                    checked={items[0].status === status.checked}
                    indeterminate={items[0].status === status.indeterminate}
                    compute={compute}
                />
                <label htmlFor={items[0].name}>{items[0].name}</label>
            </div>
            {Array.isArray(items[0].items) && items[0].items.map(item => (
                <div style={{ display: 'flex', marginLeft: '12px' }}>
                    <Checkbox
                        id={item.id}
                        name={item.name}
                        checked={item.status === status.checked}
                        indeterminate={item.status === status.indeterminate}
                        compute={compute}
                    />
                    <label htmlFor={item.name}>{item.name}</label>
                </div>
            ))}
            <br />
            {Array.isArray(items[0]?.items) && items[0].items.map(item => {
                if (Array.isArray(item?.items)) {
                    // console.log(item.status)
                    return (
                        <>
                            {item.status !== status.unchecked && item.status && (
                                <>
                                    <br />
                                    <div style={{ display: 'flex' }}>
                                        <Checkbox
                                            id={item.id}
                                            name={item.name}
                                            checked={item.status === status.checked}
                                            indeterminate={item.status === status.indeterminate}
                                            compute={compute}
                                        />
                                        <label htmlFor={item.name}>{item.name}</label>
                                    </div>

                                    {Array.isArray(item.items) && item.items.map(item => (
                                        <div style={{ display: 'flex', marginLeft: '12px' }}>
                                            <Checkbox
                                                id={item.id}
                                                name={item.name}
                                                checked={item.status === status.checked}
                                                indeterminate={item.status === status.indeterminate}
                                                compute={compute}
                                            />
                                            <label htmlFor={item.name}>{item.name}</label>
                                        </div>
                                    ))}
                                    <br />
                                </>
                            )}

                        </>
                    )
                }
            })}

        </>
    )
}

export default React.memo(List)