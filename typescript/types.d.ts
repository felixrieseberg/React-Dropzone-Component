import * as React from 'react';
import * as Dropzone from 'dropzone';

/* type aliases for callbacks */
type VoidCallback = () => any;
type InitCallback = (dropzone: Dropzone) => any;
type DragEventCallback = (event: DragEvent) => any;
type FileCallback = (file: Dropzone.DropzoneFile) => any;
type FileArrayCallback = (files: Dropzone.DropzoneFile[]) => any;
type ThumbnailCallback = (file: Dropzone.DropzoneFile, dataUrl: string) => any;
type ErrorCallback = (file: Dropzone.DropzoneFile, message: string | Error) => any;
type ErrorMultipleCallback = (files: Dropzone.DropzoneFile[], message: string | Error) => any;
type UploadProgressCallback = (file: Dropzone.DropzoneFile, progress: number, bytesSent: number) => any;
type TotalUploadProgressCallback = (totalProgress: number, totalBytes: number, totalBytesSent: number) => any;
type SendingCallback = (file: Dropzone.DropzoneFile, xhr: XMLHttpRequest, formData: FormData) => any;
type SendingMultipleCallback = (files: Dropzone.DropzoneFile[], xhr: XMLHttpRequest, formData: FormData) => any;
type SuccessCallback = (file: Dropzone.DropzoneFile, response: Object | string) => any;
type SuccessMultipleCallback = (files: Dropzone.DropzoneFile[], responseText: string) => any;

/* handlers based on ts definitions for Dropzone.js (@types/dropzone) */
export declare interface DropzoneComponentHandlers {
    init?: InitCallback | InitCallback[];

    // All of these receive the event as first parameter:
    drop?: DragEventCallback | DragEventCallback[];
    dragstart?: DragEventCallback | DragEventCallback[];
    dragend?: DragEventCallback | DragEventCallback[];
    dragenter?: DragEventCallback | DragEventCallback[];
    dragover?: DragEventCallback | DragEventCallback[];
    dragleave?: DragEventCallback | DragEventCallback[];
    paste?: DragEventCallback | DragEventCallback[];

    reset?: VoidCallback | VoidCallback[];

    addedfile?: FileCallback | FileCallback[];
    addedfiles?: FileArrayCallback | FileArrayCallback[];
    removedfile?: FileCallback | FileCallback[];
    thumbnail?: ThumbnailCallback | ThumbnailCallback[];

    error?: ErrorCallback | ErrorCallback[];
    errormultiple?: ErrorMultipleCallback | ErrorMultipleCallback[];

    processing?: FileCallback | FileCallback[];
    processingmultiple?: FileArrayCallback | FileArrayCallback[];

    uploadprogress?: UploadProgressCallback | UploadProgressCallback[];
    totaluploadprogress?: TotalUploadProgressCallback | TotalUploadProgressCallback[];

    sending?: SendingCallback | SendingCallback[];
    sendingmultiple?: SendingMultipleCallback | SendingMultipleCallback[];

    success?: SuccessCallback | SuccessCallback[];
    successmultiple?: SuccessMultipleCallback | SuccessMultipleCallback[];

    canceled?: FileCallback | FileCallback[];
    canceledmultiple?: FileArrayCallback | FileArrayCallback[];

    complete?: FileCallback | FileCallback[];
    completemultiple?: FileArrayCallback | FileArrayCallback[];

    maxfilesexceeded?: FileCallback | FileCallback[];
    maxfilesreached?: FileArrayCallback | FileArrayCallback[];

    queuecomplete?: VoidCallback | VoidCallback[];
}

export declare interface DropzoneComponentConfig {
    showFiletypeIcon?: boolean;
    iconFiletypes?: string[];
    postUrl?: string;
    dropzoneSelector?: string;
}

interface DropzoneComponentProps {
    djsConfig?: Dropzone.DropzoneOptions;
    config?: DropzoneComponentConfig;
    eventHandlers?: DropzoneComponentHandlers;
    className?: string;
    action?: string;
}

export declare class DropzoneComponent extends React.Component<DropzoneComponentProps, {}> {
}
