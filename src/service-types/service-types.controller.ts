import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateServiceTypeDto } from './dtos/create-service-type.dto';
import { UpdateServiceTypeDto } from './dtos/update-service-type.dto';
import { ServiceTypesService } from './service-types.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('service-types')
export class ServiceTypesController {
  constructor(private readonly serviceTypesService: ServiceTypesService) {}

  @Post()
  create(@Body() dto: CreateServiceTypeDto, @Request() req) {
    return this.serviceTypesService.create({ ...dto, userId: req.user.userId });
  }

  @Get()
  findAll(@Request() req) {
    return this.serviceTypesService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.serviceTypesService.findOne(id, req.user.userId);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateServiceTypeDto,
    @Request() req,
  ) {
    return this.serviceTypesService.update(id, req.user.userId, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.serviceTypesService.remove(id, req.user.userId);
  }
}
