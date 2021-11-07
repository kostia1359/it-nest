import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import CoreService from '../coreService/coreService';
import { CreateSchemaDto } from './dto/create-schema.dto';
import { SUCCESS_STATUS } from '../helpers/constants';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiBadRequestResponseDto } from './dto/api-bad-request-response.dto';
import { ApiSuccessResponseDto } from './dto/api-success-response.dto';
import { GetSchemaNamesResponseDto } from './dto/get-schema-names-response.dto';
import { CreateTableDto } from './dto/create-table.dto';
import { GetTableNamesResponseDto } from './dto/get-table-names-response.dto';
import { DictionaryDto } from './dto/dictionary.dto';
import { DeleteTableDto } from './dto/delete-table.dto';
import { CreateRowDto } from './dto/create-row.dto';
import { EditRowDto } from './dto/edit-row.dto';

@Controller('schema')
@ApiTags('schema')
export class SchemaController {
  constructor(private coreService: CoreService) {}

  @Post()
  @ApiBadRequestResponse({ type: ApiBadRequestResponseDto })
  @ApiOkResponse({ type: ApiSuccessResponseDto })
  create(@Body() createDBDto: CreateSchemaDto) {
    this.coreService.createDb(createDBDto.dbName);
    return SUCCESS_STATUS;
  }

  @Get()
  @ApiOkResponse({ type: GetSchemaNamesResponseDto })
  @ApiBadRequestResponse({ type: ApiBadRequestResponseDto })
  findAll() {
    return { data: this.coreService.schemaNames };
  }

  @Post('/save')
  @ApiBadRequestResponse({ type: ApiBadRequestResponseDto })
  @ApiOkResponse({ type: ApiSuccessResponseDto })
  async save() {
    await this.coreService.saveSchema();
    return SUCCESS_STATUS;
  }

  @Post(':dbName/table')
  @ApiBadRequestResponse({ type: ApiBadRequestResponseDto })
  @ApiOkResponse({ type: ApiSuccessResponseDto })
  createTable(
    @Body() createTableDto: CreateTableDto,
    @Param('dbName') dbName: string,
  ) {
    this.coreService.selectDb(dbName);

    this.coreService.createTable({
      tableName: createTableDto.tableName,
      schema: createTableDto.schema,
    });
    return SUCCESS_STATUS;
  }

  @Get(':dbName/table/names')
  @ApiOkResponse({ type: GetTableNamesResponseDto })
  @ApiBadRequestResponse({ type: ApiBadRequestResponseDto })
  getTableNames(@Param('dbName') dbName: string) {
    this.coreService.selectDb(dbName);

    return { data: this.coreService.tableNames };
  }

  @Delete(':dbName/table')
  @ApiBadRequestResponse({ type: ApiBadRequestResponseDto })
  @ApiOkResponse({ type: ApiSuccessResponseDto })
  deleteTable(
    @Query() removeTableQuery: DeleteTableDto,
    @Param('dbName') dbName: string,
  ) {
    this.coreService.selectDb(dbName);

    this.coreService.removeTable(removeTableQuery.tableName);
    return SUCCESS_STATUS;
  }

  @Get(':dbName/table/:tableName/merge')
  @ApiOkResponse({ type: DictionaryDto })
  @ApiBadRequestResponse({ type: ApiBadRequestResponseDto })
  mergedTables(
    @Query() mergeTableQuery: DeleteTableDto,
    @Param('dbName') dbName: string,
    @Param('tableName') tableName: string,
  ) {
    this.coreService.selectDb(dbName);
    this.coreService.selectTable(tableName);

    return this.coreService.mergeTables(mergeTableQuery.tableName);
  }

  @Get(':dbName/table/:tableName/data')
  @ApiOkResponse({ type: DictionaryDto })
  @ApiBadRequestResponse({ type: ApiBadRequestResponseDto })
  getTable(
    @Param('dbName') dbName: string,
    @Param('tableName') tableName: string,
  ) {
    this.coreService.selectDb(dbName);
    this.coreService.selectTable(tableName);

    return this.coreService.table;
  }

  @Post(':dbName/table/:tableName/row')
  @ApiOkResponse({ type: DictionaryDto })
  @ApiBadRequestResponse({ type: ApiBadRequestResponseDto })
  createRow(
    @Body() createRowDto: CreateRowDto,
    @Param('dbName') dbName: string,
    @Param('tableName') tableName: string,
  ) {
    this.coreService.selectDb(dbName);
    this.coreService.selectTable(tableName);

    this.coreService.createRow(createRowDto.data);
    return { data: this.coreService.table };
  }

  @Put(':dbName/table/:tableName/row')
  @ApiOkResponse({ type: DictionaryDto })
  @ApiBadRequestResponse({ type: ApiBadRequestResponseDto })
  editRow(
    @Body() editRowDto: EditRowDto,
    @Param('dbName') dbName: string,
    @Param('tableName') tableName: string,
  ) {
    this.coreService.selectDb(dbName);
    this.coreService.selectTable(tableName);

    this.coreService.editRow(editRowDto.rowNumber, editRowDto.data);
    return { data: this.coreService.table };
  }
}
