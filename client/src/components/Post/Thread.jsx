import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPosts } from "../../actions/post.actions"
import { isEmpty } from "../Utils"
import Card from "./Card"

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true)
  const [count, setCount] = useState(5)
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.postReducer)

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPost(true)
    }
  }

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts(count))
      // setLoadPost(false) prevent to launch the function infinitely with the callback below.
      setLoadPost(false)
      setCount(count + 5)
    }

    // Infinite scroll
    window.addEventListener("scroll", loadMore)
    return () => window.removeEventListener("scroll", loadMore)
  }, [loadPost, dispatch, count])

  return (
    <ul className="home__thread-list">
      {!isEmpty(posts[0]) &&
        posts.map((post) => {
          return (
            <Card
              post={post}
              key={post._id}
            />
          )
        })}
    </ul>
  )
}

export default Thread
