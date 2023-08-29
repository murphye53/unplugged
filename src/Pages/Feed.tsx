import React, {useEffect, useState} from 'react';
import {useAuth0} from "@auth0/auth0-react";
import PostI from "../Models/PostI";
import {getPostsForFeed} from "../Clients/PostClient";
import {Container} from "react-bootstrap";
import Post from "../Components/Post";
import {ContentType} from "../Constants/enums";

function Feed() {
    const { user } = useAuth0();
    const [loadingContent, setLoadingContent] = useState<boolean>(true);
    const [posts, setPosts] = useState<PostI[]>([])

    useEffect(() => {
        if (user && user.sub)
            getPostsForFeed(user.sub)
                .then((response) => {
                    setPosts(response.data.Table1);
                    setLoadingContent(false);
                })

    }, [user])

    if (loadingContent) {
        return (<div className="text-center d-flex justify-content-center pt-5 mt-5">
            <div className="spinner-border" style={{width: 10 + 'vh', height: 10 + 'vh'}} role="status">
            </div>
        </div>)
    } else if (!posts || posts.length === 0) {
        return (
            <Container>
                <h3>Nobody that you follow has posted</h3>
            </Container>)
    } else {
        return (
            <Container className={'p-3'}>
                <h1>Feed</h1>
                {posts.map((post: PostI, index) => (
                    <Post key={index} postId={post.id} poster={post.poster} contentType={ContentType.Image} contentUrl={post.content_url} caption={post.caption}/>
                ))}
            </Container>
        )
    }
}

export default Feed;