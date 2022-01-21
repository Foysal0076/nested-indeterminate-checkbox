import React, { useEffect, useState } from 'react'

const Posts = () => {
    const [posts, setPosts] = useState()
    const [newId, setNewId] = useState()
    const [postDetails, setPostDetails] = useState([])
    const [postIds, setPostIds] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchPosts = async () => {
        try {
            let response = await fetch('https://jsonplaceholder.typicode.com/posts')
            if (response.ok) {
                const data = await response.json()
                setPosts(data)
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
            setPostDetails([...postDetails, ...dataArray])
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        let ids = []
        if (Array.isArray(postDetails)) {
            ids = postDetails?.map((post) => post?.id)
        }
        if (!ids.includes(newId)) {
            fetchSinglePost([newId])
        }

    }, [newId])
    useEffect(() => {
        if (Array.isArray(posts)) {
            const ids = posts?.map((post) => post?.id)
            fetchSinglePost(ids.slice(0, 3))
        }
    }, [posts])

    useEffect(() => {
        fetchPosts()
    }, [])

    const loadNewData = () => {
        const id = posts[postDetails.length].id
        setNewId(id)
    }

    window.onscroll = function () {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            loadNewData()
        }
    }

    return (
        <div style={{ padding: '3rem' }}>
            <div style={{
                // display: 'flex',
                // alignItems: 'center',
                // justifyContent: 'center'
            }}>
                {Array.isArray(posts) && posts.slice(0, 10).map((post) => (
                    <div key={post?.id} style={{ display: 'block', padding: '1rem', background: 'grey', marginBottom: '1rem' }}>
                        {post?.title}
                    </div>

                ))}
            </div>
            <h2>Single Post</h2>
            <div style={{
            }}>
                {Array.isArray(postDetails) && postDetails.map((post) => (
                    <div key={post?.id} style={{ display: 'block', padding: '1rem', background: 'grey', marginBottom: '1rem' }}>
                        {post?.body}
                    </div>

                ))}
            </div>
            <div>
                {loading && (
                    <h3 style={{ color: 'red' }}>Loading ...</h3>
                )}
            </div>
        </div>
    )
}

export default Posts