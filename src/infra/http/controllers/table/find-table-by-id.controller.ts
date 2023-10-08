// import { Controller, Get, Param } from '@nestjs/common';

// @Controller('table')
// export class FindTableByIdController {
//   constructor(private readonly findTableByIdUseCase: findTableByIdUseCase) {}

//   @Get(':id')
//   async handle(@Param('id') id: string) {
//     const { table } = await this.findTableByIdUseCase.execute({ id });

//     return { data: TablePresenter.toHttp(table) };
//   }
// }
