import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import { ServerApp } from './server-app';

describe('presentation/server-app', () => {
  const options = {
    base: 2,
    limit: 5,
    show: false,
    name: 'test-table',
    destination: 'test-destination',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create ServerApp instance', () => {
    const serverApp = new ServerApp();
    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe('function');
  });

  it('should run server with options', () => {
    const logSpy = jest.spyOn(console, 'log');
    const createTableSpy = jest.spyOn(
      CreateTable.prototype,
      'execute',
    );
    const saveFileSpy = jest.spyOn(
      SaveFile.prototype,
      'execute',
    );

    ServerApp.run(options);
    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith(
      'server running...',
    );
    expect(createTableSpy).toHaveBeenCalledTimes(
      1,
    );
    expect(createTableSpy).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });
    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      fileDestination: options.destination,
      fileName: options.name,
    });
  });

  it('should run with custom mocked values', () => {
    const logMock = jest.fn();
    const errorMock = jest.fn();
    const createMock = jest
      .fn()
      .mockReturnValue('1 x 2 = 2');
    const saveFileMock = jest
      .fn()
      .mockReturnValue(true);

    console.log = logMock;
    console.error = errorMock;
    CreateTable.prototype.execute = createMock;
    SaveFile.prototype.execute = saveFileMock;

    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledWith(
      'server running...',
    );
    expect(createMock).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: '1 x 2 = 2',
      fileDestination: options.destination,
      fileName: options.name,
    });
    expect(logMock).toHaveBeenCalledWith(
      'File created',
    );
    expect(errorMock).not.toHaveBeenCalled();
  });
});
