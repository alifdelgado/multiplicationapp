import fs from 'fs';
import path from 'path';
import { SaveFile } from './save-file.use-case';

describe('SaveFileUseCase', () => {
  const customOptions = {
    fileContent: 'custom content',
    fileDestination:
      'custom-outputs/file-destination',
    fileName: 'custom-table-name',
  };

  beforeEach(() => {
    fs.rmSync('output', {
      force: true,
      recursive: true,
    });

    fs.rmSync('custom-outputs', {
      force: true,
      recursive: true,
    });
  });

  it('should save file with default values', () => {
    const saveFile = new SaveFile();
    const options = {
      fileContent: 'test content',
    };
    const filePath = 'output/table.txt';
    const result = saveFile.execute(options);
    const fileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(
      filePath,
      { encoding: 'utf-8' },
    );

    expect(result).toBeTruthy();
    expect(fileExists).toBeTruthy();
    expect(fileContent).toBe(options.fileContent);
  });

  it('should save file with custom values', () => {
    const saveFile = new SaveFile();
    const result = saveFile.execute(
      customOptions,
    );
    const fileExists = fs.existsSync(
      customOptions.fileDestination,
    );
    const fileContent = fs.readFileSync(
      path.join(
        customOptions.fileDestination,
        `${customOptions.fileName}.txt`,
      ),
      { encoding: 'utf-8' },
    );

    expect(result).toBeTruthy();
    expect(fileExists).toBeTruthy();
    expect(fileContent).toBe(
      customOptions.fileContent,
    );
  });

  it('should return false if directory could not be created', () => {
    const saveFile = new SaveFile();
    const mkdirSpy = jest
      .spyOn(fs, 'mkdirSync')
      .mockImplementation(() => {
        throw new Error(
          'Error creating directory',
        );
      });
    const result = saveFile.execute(
      customOptions,
    );
    expect(result).toBeFalsy();
    mkdirSpy.mockRestore();
  });

  it('should return false if file could not be created', () => {
    const saveFile = new SaveFile();
    const writeFileSpy = jest
      .spyOn(fs, 'writeFileSync')
      .mockImplementation(() => {
        throw new Error('Error creating file');
      });
    const result = saveFile.execute({
      fileContent: 'hola',
    });
    expect(result).toBeFalsy();
    writeFileSpy.mockRestore();
  });
});
