const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];
  const { yarg } = await import('./args.plugin');
  return yarg;
};

describe('Test args.plugin.ts', () => {
  const originalArgv = process.argv;
  afterEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  it('should return default values', async () => {
    const argv = await runCommand(['-b', '5']);
    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: 'table',
        d: 'output',
      }),
    );
  });

  it('should return configuration with custom values', async () => {
    const argv = await runCommand([
      '-b',
      '7',
      '-l',
      '20',
      '-s',
      '-n',
      'custom',
      '-d',
      'table-directory',
    ]);
    expect(argv).toEqual(
      expect.objectContaining({
        b: 7,
        l: 20,
        s: true,
        n: 'custom',
        d: 'table-directory',
      }),
    );
  });
});
