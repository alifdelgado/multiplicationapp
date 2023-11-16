import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';

interface RunOptions {
  base: number;
  limit: number;
  show: boolean;
  name: string;
  destination: string;
}

export class ServerApp {
  static run({
    base,
    limit,
    show,
    name,
    destination,
  }: RunOptions) {
    console.log('server running...');
    const table = new CreateTable().execute({
      base,
      limit,
    });
    const fileCreated = new SaveFile().execute({
      fileContent: table,
      fileDestination: destination,
      fileName: name,
    });

    !fileCreated
      ? console.log('File not created')
      : console.log('File created');

    if (show) console.log(table);
  }
}
