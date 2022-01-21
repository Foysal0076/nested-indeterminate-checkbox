import { useEffect, useState } from 'react/cjs/react.development'

const usePost = (newId) => {
    const [postList, setPostList] = useState([])
    const [postDetailsList, setPostDetailsList] = useState([])

    const [loading, setLoading] = useState(false)

    const fetchPostList = async () => {
        try {
            let response = await fetch('https://jsonplaceholder.typicode.com/posts')
            if (response.ok) {
                const data = await response.json()
                setPostList(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchSinglePost = async (ids) => {
        try {
            setLoading(true)
            let dataArray = []
            for (let index = 0; index < ids.length; index++) {
                let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${ids[index]}`)
                if (response.ok) {
                    const data = await response.json()
                    dataArray.push(data)
                }
            }
            setPostDetailsList([...postDetailsList, ...dataArray])
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        let ids = []
        if (Array.isArray(postDetailsList)) {
            ids = postDetailsList?.map((post) => post?.id)
        }
        if (!ids.includes(newId)) {
            fetchSinglePost([newId])
        }

    }, [newId])

    useEffect(() => {
        if (Array.isArray(postList)) {
            const ids = postList?.map((post) => post?.id)
            fetchSinglePost(ids.slice(0, 3))
        }
    }, [postList])

    useEffect(() => {
        fetchPostList()
    }, [])

    return [loading, postList, postDetailsList]
}

export default usePost