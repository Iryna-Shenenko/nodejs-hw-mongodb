import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from "../contacts/index.js";
import { getEnvVar } from "./getEnvVar.js";
import path from 'node:path';
import fs from 'node:fs/promises';

export const saveFileToUploadDir = async (file) => {
    await fs.rename(
        path.join(TEMP_UPLOAD_DIR, file.filename),
        path.join(UPLOAD_DIR, file.filename),
    );

    return `${getEnvVar('APP_DOMAIN')}/uploads/${file.filename}`;
};
