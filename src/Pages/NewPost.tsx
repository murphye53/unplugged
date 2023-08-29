import React, {useState} from 'react';
import {Alert, Button, Container, Form, InputGroup, Row} from "react-bootstrap";
import uploadFileToBlob from "../Clients/AzureStorageClient";
import {useAuth0} from "@auth0/auth0-react";
import PostI from "../Models/PostI";
import {saveNewPost} from "../Clients/PostClient";
import {useNavigate} from "react-router-dom";

function NewPost() {
    let navigate = useNavigate();
    const {user} = useAuth0()
    const [file, setFile] = useState<File|undefined>()
    const [caption, setCaption] = useState()
    const [uploading, setUploading] = useState(false)
    const [failedUpload, setFailedUpload] = useState(false)
    // const [imagePreviewUrl, setImagePreviewUrl] = useState()

    // @ts-ignore
    function handleFileChange(event) {
        setFile(event.target.files[0])
    }

    // @ts-ignore
    function handleCaptionChange(event) {
        setCaption(event.target.value)
    }

    function submit() {
        setUploading(true)

        if (file && caption && user && user.sub) {
            let newFileName: string = user.sub + (new Date().getTime() / 1000).toString();
            let fileToUpload = new File([file], newFileName)
            uploadFileToBlob(fileToUpload)
                .then(()=>{
                    let contentUrl = 'https://unplugged.blob.core.windows.net/userposts/' + newFileName;
                    // @ts-ignore
                    let post: PostI = {content_url: contentUrl, poster: user.sub, caption: caption}

                    saveNewPost(post)
                        .then((resp) => {
                            if(resp.status === 200) {
                                setUploading(false)
                                navigate('/profile/' + user.nickname)
                            } else
                                setFailedUpload(true)
                        })
                })
        }
    }

    return (
        <Container className={"page d-flex flex-wrap justify-content-centre p-3 display-flex align-content-center text-align-center"}>
            <Row className={"w-100"}>
                <h1 className={"text-center p-3"}>Upload new post</h1>
            </Row>
            <Row className={"w-100 mx-auth d-flex justify-content-center"}>
                {failedUpload &&<Alert variant={'danger'}>
                    Failed to upload post. Please try again
                </Alert>}
                <input type="file"
                       accept={'image/*'}
                       className={"text-center"}
                       onChange={handleFileChange}/>
                {/*<Container fluid className={"fileUpload"}>*/}
                {/*    <AddBoxOutlined sx={{height: 'fit-content', width: "fit-content", maxHeight:'50vh', fontSize: '200', padding: 'auto', margin:'auto'}}/>*/}
                {/*    <h3 className={"w-100 text-center pb-3"}>Upload file</h3>*/}
                {/*</Container>*/}
                {/*{file && <Image src={file}/>}*/}
            </Row>
            <Row className={"w-100 py-5"}>
                <InputGroup>
                    <InputGroup.Text>Caption</InputGroup.Text>
                    <Form.Control as="textarea"
                                  size={"lg"}
                                  rows={3}
                                  maxLength={100}
                                  aria-label="With textarea"
                                  onChange={handleCaptionChange}
                    />
                </InputGroup>
            </Row>
            <Row className={"w-100 justify-content-end"}>
                <Button className={"w-50"} onClick={submit} disabled={uploading}>Publish</Button>
            </Row>
        </Container>
    );
}

export default NewPost;