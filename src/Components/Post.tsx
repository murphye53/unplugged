import * as React from 'react';
import {useEffect, useState} from 'react';
import {ContentType} from "../Constants/enums";
import {Button, ButtonGroup, Card, Container, Image, Row, Col, Form, InputGroup} from "react-bootstrap";
import {useAuth0} from "@auth0/auth0-react";
import {getUserByID} from "../Clients/UserClient";
import {useNavigate} from "react-router-dom";
import {deleteLike, getPostLikes, saveLike} from "../Clients/LikeClient";
import UserI from "../Models/UserI";
import CommentI from "../Models/CommentI";
import {deleteComment, getCommentsForPost, saveComment} from "../Clients/CommentClient";
import {Delete} from "@mui/icons-material";

interface PostProps {
    postId: number
    poster: string;
    contentType: ContentType;
    contentUrl: string;
    caption: string;
}

function Post(props:PostProps) {
    let navigate = useNavigate();
    const {user} = useAuth0();
    const [loading, setLoading] = useState<boolean>(true);
    const [liked, setLiked] = useState<boolean>(false);
    const [poster, setPoster] = useState<UserI>();
    const [comments, setComments] = useState<CommentI[]>();
    const [newComment, setNewComment] = useState<string>();


    useEffect(() => {
        getUserByID(props.poster)
            .then((response) => setPoster(response.data));

        getPostLikes(props.postId).then((response) => {
                if (response.data.Table1 && user) { // @ts-ignore
                    if (response.data.Table1
                        // @ts-ignore
                        .filter((like) => like.userId === user.sub)
                        .length > 0)
                        setLiked(true)
                }
            }
        )

        getCommentsForPost(props.postId)
            .then((resp) => {
                if (resp.data.Table1) {
                    setComments(resp.data.Table1)
                }
                setLoading(false)
            })

    }, [])

    function likePost() {
        if (user?.sub)
            saveLike(props.postId, user.sub)
                .then(() => setLiked(true))
    }

    function unlikePost() {
        if (user?.sub) {
            setLiked(false);
            deleteLike(props.postId, user.sub);
        }
    }

    function handleDelete(commentID: number) {
        deleteComment(commentID)
            .then(() => setComments(comments?.filter((comment) => comment.id !== commentID)))
    }

    // @ts-ignore
    function handleCommentChange(event) {
        setNewComment(event.target.value)
    }

    function saveNewComment() {
        if (newComment && user && user.sub) {
            let newcomm: { postId: number; comment: string; commenter: string } = {
                postId: props.postId,
                comment: newComment,
                commenter: user.sub
            }
            saveComment(newcomm).then(() =>
                getCommentsForPost(props.postId)
                    .then((resp) => {
                        if (resp.data.Table1) {
                            setComments(resp.data.Table1)
                        }
                    })
            )
        }
    }

    if (loading) {
        return (<div className="text-center d-flex justify-content-center pt-5 mt-5">
            <div className="spinner-border" style={{width: 10 + 'vh', height: 10 + 'vh'}} role="status">
            </div>
        </div>)
    } else return (
        <Card className={'m-3'}>
            <Card.Img variant="top" src={props.contentUrl}/>
            <Card.Body>
                <div className={'d-flex align-bottom py-1'} onClick={() => navigate("/profile/" + poster?.username)}>
                    <Image roundedCircle
                           src={poster?.avatar_url}
                           className={"userAvatar d-none d-md-flex"}
                           style={{}}
                    />
                    <Card.Title style={{
                        height: '100%',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        marginLeft: '1rem'
                    }}>{poster?.username}</Card.Title>
                </div>
                <Card.Text className={'p-2'}>{props.caption}</Card.Text>
                <Container>
                    {comments && comments.length>0 && <h5>Comments</h5>}
                    {comments?.map((comment, index) => (
                        <Row key={index}>
                            <Col xs={2}>
                                <h6>{(comment.username)}</h6>
                            </Col>
                            <Col xs={8}>
                                <p>{comment.comment}</p>
                            </Col>
                            {comment.commenter === user?.sub && (
                                <Col xs={1}>
                                    <Delete onClick={ ()=> handleDelete(comment.id)}/>
                                </Col>)}
                        </Row>))}
                    <InputGroup>
                        <InputGroup.Text>New Comment</InputGroup.Text>
                        <Form.Control as="textarea"
                                      size={"sm"}
                                      rows={1}
                                      maxLength={100}
                                      aria-label="With textarea"
                                      onChange={handleCommentChange}
                        />
                    </InputGroup>
                </Container>

                <ButtonGroup style={{float: 'right', paddingTop:'0.5rem'}}>
                    {liked ?
                        <Button variant={'danger'} onClick={() => unlikePost()}>Unlike</Button>
                        : <Button variant={'primary'} onClick={() => likePost()}>Like</Button>}
                    <Button variant={'secondary'} onClick={() => saveNewComment()}>Comment</Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
    );
};

export default Post;