import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateServiceRecordDto } from './dtos/create-service-record.dto';
import { UpdateServiceRecordDto } from './dtos/update-service-record.dto';
import { ServiceRecordsService } from './service-records.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('service-records')
export class ServiceRecordsController {
  constructor(private readonly serviceRecordsService: ServiceRecordsService) {}

  @Post()
  create(@Body() dto: CreateServiceRecordDto, @Request() req) {
    return this.serviceRecordsService.create({
      ...dto,
      userId: req.user.userId,
    });
  }

  @Get()
  findAllForVehicle(@Query('vehicleId') vehicleId: string, @Request() req) {
    return this.serviceRecordsService.findAllForVehicle(
      vehicleId,
      req.user.userId,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.serviceRecordsService.findOne(id, req.user.userId);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateServiceRecordDto,
    @Request() req,
  ) {
    return this.serviceRecordsService.update(id, req.user.userId, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.serviceRecordsService.remove(id, req.user.userId);
  }
}
