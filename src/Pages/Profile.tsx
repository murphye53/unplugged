import React, {useEffect, useState} from 'react';
import {getAllUsers, getUserByID} from "../Clients/UserClient";
import UserI from "../Models/UserI";
import {useAuth0} from "@auth0/auth0-react";
import {Button, Col, Container, Image} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {follow, getFollowers, unfollow} from "../Clients/FollowClient";
import PostI from "../Models/PostI";
import {getPostsByPoster} from "../Clients/PostClient";
import Post from "../Components/Post";
import {ContentType} from "../Constants/enums";

function Profile() {
    const {user} = useAuth0();
    const {username} = useParams();

    const [activeUser, setActiveUser] = useState<UserI | null>(null);
    const [requestedUser, setRequestedUser] = useState<UserI | undefined>(undefined);
    const [followers, setFollowers] = useState<number | undefined>(undefined);
    const [loadingRequestedUser, setLoadingRequestedUser] = useState<boolean>(true);
    const [currentUserFollowsProfile, setCurrentUserFollowsProfile] = useState<boolean>(false);
    const [profilePosts, setProfilePosts] = useState<PostI[]>();


    useEffect(() => {
        if (user) {
            getUserByID(user.sub)
                .then((response) => setActiveUser(response.data))
        }

        getAllUsers()
                .then((respose) => respose.data
                    .forEach((user_) => {
                        if (user_.username === username) {
                            setRequestedUser(user_)

                            getFollowers(user_.id)
                                .then((followerResponse) => {
                                if(followerResponse.data.Table1)
                                    setFollowers(followerResponse.data.Table1.length)
                                    // @ts-ignore
                                    followerResponse.data.Table1.forEach((follower) => {
                                            if (follower.follower === user?.sub) {
                                                setCurrentUserFollowsProfile(true)
                                            }
                                        }
                                    )
                                })

                            if (!profilePosts)
                                getPostsByPoster(user_?.id)
                                    .then((response) => setProfilePosts(response.data.Table1))
                            setLoadingRequestedUser(false)
                        }
                    }))
    }, [user])

    function handleFollow(){
        if(activeUser && requestedUser){
            follow(activeUser?.id, requestedUser?.id)
        }
        setCurrentUserFollowsProfile(true)
    }

    function handleUnfollow(){
        if(activeUser && requestedUser){
            unfollow(activeUser?.id, requestedUser?.id)
        }
        setCurrentUserFollowsProfile(false)
    }


    if (loadingRequestedUser) {
        return (<div className="text-center d-flex justify-content-center pt-5 mt-5">
            <div className="spinner-border" style={{width: 10 + 'vh', height: 10 + 'vh'}} role="status">
            </div>
        </div>)
    } else {
        return (
            <Container className={"mt-3"}>
                <Container fluid className={"d-flex p-3"}
                           style={{
                               maxWidth: '540px',
                               borderStyle: 'solid',
                               borderWidth: 'medium',
                               borderRadius: '7px'
                           }}>
                    <Col className={"w-25"} xs={3} sm={2}>
                        <Image roundedCircle={true} src={requestedUser?.avatar_url}
                               style={{width: 100 + "%", maxWidth: '150px', margin: 'auto'}}></Image>
                    </Col>
                    <Col
                        style={{
                            paddingLeft: '2rem',
                            height: '100%'
                        }}>
                        <h1>{requestedUser?.username}</h1>
                        <p>{requestedUser?.bio}</p>
                        {followers && <p >{followers} followers</p>}
                    </Col>
                    {activeUser && activeUser.username === username && <Button variant={'danger'}>Edit</Button>}

                    {activeUser && activeUser.username !== username && (currentUserFollowsProfile ?
                        <Button variant={'danger'} onClick={handleUnfollow}>Unfollow</Button>
                        : <Button variant={'primary'} onClick={handleFollow}>Follow</Button>)}
                </Container>

            <Container className={'text-align-center'}>

                {profilePosts && profilePosts.length>0 && profilePosts.map((post: PostI, index) => (
                    <Post key={index} postId={post.id} poster={post.poster} contentType={ContentType.Image} contentUrl={post.content_url} caption={post.caption}/>
                ))}
                {!profilePosts && <h1>User has no posts</h1>}
            </Container>
            </Container>
        );
    }
}

export default Profile;