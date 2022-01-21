import React, { useState } from 'react'
import usePost from '../hook/usePost'

const PostsV2 = () => {
    const [newId, setNewId] = useState()

    const [loading, postList, postDetailsList] = usePost(newId)

    const loadNewData = () => {
        const id = postList[postDetailsList.length].id
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
                {Array.isArray(postList) && postList.slice(0, 10).map((post) => (
                    <div key={post?.id} style={{ display: 'block', padding: '1rem', background: 'grey', marginBottom: '1rem' }}>
                        {post?.title}
                    </div>

                ))}
            </div>
            <h2>Single Post</h2>
            <div style={{
            }}>
                {Array.isArray(postDetailsList) && postDetailsList.map((post) => (
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

export default PostsV2