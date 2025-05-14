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
  Query,
} from '@nestjs/common';
import { ServiceRecordsService } from './service-records.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateServiceRecordDto } from './dtos/create-service-record.dto';
import { UpdateServiceRecordDto } from './dtos/update-service-record.dto';

@ApiBearerAuth()
@ApiTags('Service Records')
@UseGuards(JwtAuthGuard)
@Controller('service-records')
export class ServiceRecordsController {
  constructor(private readonly serviceRecordsService: ServiceRecordsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new service record' })
  @ApiResponse({
    status: 201,
    description: 'Service record created successfully',
  })
  create(@Body() dto: CreateServiceRecordDto, @Request() req) {
    return this.serviceRecordsService.create({
      ...dto,
      userId: req.user.userId,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all service records for a vehicle' })
  @ApiQuery({ name: 'vehicleId', required: true })
  findAllForVehicle(@Query('vehicleId') vehicleId: string, @Request() req) {
    return this.serviceRecordsService.findAllForVehicle(
      vehicleId,
      req.user.userId,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific service record by ID' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.serviceRecordsService.findOne(id, req.user.userId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a service record' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateServiceRecordDto,
    @Request() req,
  ) {
    return this.serviceRecordsService.update(id, req.user.userId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a service record' })
  remove(@Param('id') id: string, @Request() req) {
    return this.serviceRecordsService.remove(id, req.user.userId);
  }
}
