import { ServerApp } from './presentation/server-app';

describe('index', () => {
  it('should call Server.run with values', async () => {
    const serverRunMock = jest.fn();
    ServerApp.run = serverRunMock;
    process.argv = [
      'node',
      'src/index.ts',
      '-b',
      '2',
      '-l',
      '5',
      '-s',
      '-n',
      'test-table',
      '-d',
      'test-destination',
    ];
    await import('./index');
    expect(serverRunMock).toHaveBeenCalledWith({
      base: 2,
      limit: 5,
      show: true,
      name: 'test-table',
      destination: 'test-destination',
    });
  });
});
