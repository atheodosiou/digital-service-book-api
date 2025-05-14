import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ServiceTypesService } from './service-types.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateServiceTypeDto } from './dtos/create-service-type.dto';
import { UpdateServiceTypeDto } from './dtos/update-service-type.dto';

@ApiBearerAuth()
@ApiTags('Service Types')
@UseGuards(JwtAuthGuard)
@Controller('service-types')
export class ServiceTypesController {
  constructor(private readonly serviceTypesService: ServiceTypesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new service type' })
  @ApiResponse({
    status: 201,
    description: 'Service type created successfully',
  })
  create(@Body() dto: CreateServiceTypeDto, @Request() req) {
    return this.serviceTypesService.create({ ...dto, userId: req.user.userId });
  }

  @Get()
  @ApiOperation({ summary: 'Get all service types (user + default)' })
  findAll(@Request() req) {
    return this.serviceTypesService.findAll(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific service type by ID' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.serviceTypesService.findOne(id, req.user.userId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a service type' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateServiceTypeDto,
    @Request() req,
  ) {
    return this.serviceTypesService.update(id, req.user.userId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a service type' })
  remove(@Param('id') id: string, @Request() req) {
    return this.serviceTypesService.remove(id, req.user.userId);
  }
}
