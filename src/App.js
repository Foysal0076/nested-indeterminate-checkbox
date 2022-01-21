import React, { useEffect, useState } from "react"
import "./styles.css"
import List from "./List"
import { status } from "./constants"
import Posts from "./component/Posts"
import PostsV2 from "./component/PostsV2"

const customData = [
    {
        id: 1,
        name: 'Parent',
        items: [
            {
                id: 21,
                name: 'First Children',
                items: [
                    { id: 31, name: 'First Grand Children' },
                    { id: 32, name: 'Second Grand Children' },
                ]
            },
            {
                id: 22,
                name: 'Second Children',
                items: [
                    { id: 33, name: 'Fourth Grand Children' },
                    { id: 34, name: 'Fifth Grand Children' },
                ]
            },
            {
                id: 23,
                name: 'Third Children',
                items: [
                    { id: 35, name: 'Sixth Grand Children' },
                    { id: 36, name: 'Seventh Grand Children' },
                ]
            },
        ]
    }
]
const customData1 = [
    {
        id: 1,
        name: 'Parent',
        status: 1,
        items: [
            {
                id: 21,
                name: 'First Children',
                status: 1,
                items: [
                    { id: 31, name: 'First Grand Children', status: 1, },
                    { id: 32, name: 'Second Grand Children', status: 1, },
                ]
            },
            {
                id: 22,
                name: 'Second Children',
                status: 1,
                items: [
                    { id: 33, name: 'Fourth Grand Children', status: 1, },
                    { id: 34, name: 'Fifth Grand Children', status: 1, },
                ]
            },
            {
                id: 23,
                name: 'Third Children',
                status: 1,
                items: [
                    { id: 35, name: 'Sixth Grand Children', status: 1, },
                    { id: 36, name: 'Seventh Grand Children', status: 1, },
                ]
            },
        ]
    }
]

// const a = findParentStatus(customData1, 31)
// console.log({ a })

const data = [
    {
        id: 1,
        name: "Table",
        items: [
            { id: 3, name: "Bar Table" },
            { id: 4, name: "Dining" },
            { id: 5, name: "Coffee Table" }
        ]
    },
    {
        id: 2,
        name: "Chairs",
        items: [
            {
                id: 6,
                name: "High Chair",
                items: [{ id: 11, name: "Foldable" }]
            },
            { id: 7, name: "Bar Stool" },
            {
                id: 8,
                name: "Office Chairs",
                items: [
                    {
                        id: 9,
                        name: "Executive"
                    },
                    { id: 10, name: "Balance" }
                ]
            }
        ]
    }
]
const data1 = [
    {
        id: 1,
        name: "Table",
        items: [
            { id: 3, name: "Bar Table", status: 1 },
            { id: 4, name: "Dining", status: 1 },
            { id: 5, name: "Coffee Table", status: 1 }
        ],
        status: 1
    },
    {
        id: 2,
        name: "Chairs",
        items: [
            {
                id: 6,
                name: "High Chair",
                items: [{ id: 11, name: "Foldable", status: 1 }],
                status: 1
            },
            { id: 7, name: "Bar Stool", status: 1 },
            {
                id: 8,
                name: "Office Chairs",
                items: [
                    {
                        id: 9,
                        name: "Executive",
                        status: 1
                    },
                    { id: 10, name: "Balance", status: 1 }
                ],
                status: 1
            }
        ],
        status: 1
    }
]

export default function App() {

    const [parentStatus, setParentStatus] = useState()

    const findParentStatus = (mainData, childrenId) => {
        let parentId = null
        if (mainData.id === childrenId) {
            return false
        }
        if (mainData.items) {
            for (let index = 0; index < mainData.items.length; index++) {
                if (mainData.items[index].id === childrenId) {
                    setParentStatus(mainData.id)
                    console.log(mainData.id)
                    parentId = mainData.id
                    break
                } else {
                    findParentStatus(mainData.items[index], childrenId)
                }
            }
            if (parentId) {
                return parentId
            } else {
                return 1
            }
            // mainData.items.forEach(item => {
            //     if (item.id === childrenId) {
            //         setParentStatus(mainData.id)
            //         console.log(mainData.id)
            //         return mainData.id
            //     } else {
            //         findParentStatus(item, childrenId)
            //     }
            // })
        }
        return 1
    }

    const setStatus = (root, status) => {
        root.status = status
        if (Array.isArray(root.items)) {
            return root.items.forEach((item) => {
                setStatus(item, status)
            })
        }
    }

    const computeStatus = (items) => {
        let checked = 0
        let indeterminate = 0

        items.forEach((item) => {
            if (item.status && item.status === status.checked) checked++
            if (item.status && item.status === status.indeterminate) indeterminate++
        })

        if (checked === items.length) {
            return status.checked
        } else if (checked > 0 || indeterminate > 0) {
            return status.indeterminate
        }
    }

    // Depth-first traversal
    const traverse = (root, needle, status) => {
        let id
        let items

        if (Array.isArray(root)) {
            items = root
        } else {
            id = root.id
            items = root.items
        }

        // return if needle is found
        // we don't have to compute the status of the items if root.id === needle
        if (id === needle) {
            return setStatus(root, status)
        }

        if (!items) {
            return root
        } else {
            items.forEach((item) => traverse(item, needle, status))
            root.status = computeStatus(items)
        }
    }

    const [items, setItems] = useState(customData)
    const compute = (checkboxId, status) => {
        const parent = findParentStatus(items[0], checkboxId)
        console.log({ parent })
        traverse(items, checkboxId, status)
        setItems(items.slice())
    }

    useEffect(() => {
        setItems(customData1)
    }, [])

    return (
        <div className="App">
            {/* <button onClick={() => findParentStatus(customData1[0], 31)}>Check</button> */}
            {/* <List items={items} compute={compute} /> */}
            <h1>Posts</h1>
            {/* <Posts /> */}
            <PostsV2 />
        </div>
    )
}
