// "js-e2e-browser-file-upload-storage-blob/azure-storage-blob.ts at main,
// Azure-Samples/js-e2e-browser-file-upload-storage-blob",
// GitHub, 2022. [Online].
// Available: https://github.com/Azure-Samples/js-e2e-browser-file-upload-storage-blob/blob/main/src/azure-storage-blob.ts.

import { BlobServiceClient, ContainerClient} from '@azure/storage-blob';

const containerName = `userposts`;
const sasToken = 'sp=r&st=2023-08-28T04:20:31Z&se=2023-08-30T12:20:31Z&sip=0.0.0.0-255.255.255.255&sv=2022-11-02&sr=c&sig=Bs0D7Y5kfmTPHh9zwWH84QPwP6lScJHD6Wjw67wrO0Y%3D';
const storageAccountName = 'unplugged';
// </snippet_package>

// <snippet_isStorageConfigured>
// Feature flag - disable storage feature to app if not configured
export const isStorageConfigured = () => {
    return (!storageAccountName || !sasToken) ? false : true;
}
// </snippet_isStorageConfigured>

// <snippet_getBlobsInContainer>
// return list of blobs in container to display
const getBlobsInContainer = async (containerClient: ContainerClient) => {
    const returnedBlobUrls: string[] = [];

    // get list of blobs in container
    // eslint-disable-next-line
    for await (const blob of containerClient.listBlobsFlat()) {
        // if image is public, just construct URL
        returnedBlobUrls.push(
            `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`
        );
    }

    return returnedBlobUrls;
}
// </snippet_getBlobsInContainer>

// <snippet_createBlobInContainer>
const createBlobInContainer = async (containerClient: ContainerClient, file: File) => {

    // create blobClient for container
    const blobClient = containerClient.getBlockBlobClient(file.name);
    
    // set mimetype as determined from browser with file upload control
    const options = { blobHTTPHeaders: { blobContentType: file.type } };

    // upload file
    await blobClient.uploadData(file, options);
}
// </snippet_createBlobInContainer>

// <snippet_uploadFileToBlob>
const uploadFileToBlob = async (file: File | null): Promise<string[]> => {
    if (!file) return [];

    // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
    const blobService = new BlobServiceClient(
        `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    );

    // get Container - full public read access
    const containerClient: ContainerClient = blobService.getContainerClient(containerName);
    await containerClient.createIfNotExists({
        access: 'container',
    });

    // upload file
    await createBlobInContainer(containerClient, file);

    // get list of blobs in container
    return getBlobsInContainer(containerClient);
};
// </snippet_uploadFileToBlob>

export default uploadFileToBlob;