export interface CreateTableUserCase {
  execute: (
    options: CreateTableOptions,
  ) => string;
}

export interface CreateTableOptions {
  base: number;
  limit?: number;
}

export class CreateTable
  implements CreateTableUserCase
{
  constructor() {}

  execute({
    base,
    limit = 10,
  }: CreateTableOptions) {
    let output = '';
    for (let i = 1; i <= limit; i++) {
      output += `${base} x ${i} = ${base * i}`;
      if (i < limit) output += '\n';
    }
    return output;
  }
}
