import fs from 'fs';
import path from 'path';

export interface SaveFileUseCase {
  execute: (options: SaveFileOptions) => boolean;
}

export interface SaveFileOptions {
  fileContent: string;
  fileDestination?: string;
  fileName?: string;
}

export class SaveFile implements SaveFileUseCase {
  constructor() {}

  execute({
    fileContent,
    fileDestination = 'output',
    fileName = 'table',
  }: SaveFileOptions): boolean {
    try {
      fs.mkdirSync(fileDestination, {
        recursive: true,
      });

      fs.writeFileSync(
        path.join(
          fileDestination,
          `${fileName}.txt`,
        ),
        fileContent,
      );
      return true;
    } catch (error) {
      return false;
    }
  }
}
