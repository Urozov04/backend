export declare class FileService {
    private readonly baseUrl;
    private readonly filePath;
    createFile(file: Express.Multer.File): Promise<string>;
    deleteFile(fileName: string): Promise<undefined>;
    existsFile(fileName: string): Promise<boolean>;
}
