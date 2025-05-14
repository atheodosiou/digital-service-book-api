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
import { VehiclesService } from './vehicles.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { UpdateVehicleDto } from './dtos/update-vehicle.dto';

@ApiBearerAuth()
@ApiTags('Vehicles')
@UseGuards(JwtAuthGuard)
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new vehicle' })
  @ApiResponse({ status: 201, description: 'Vehicle created successfully' })
  create(@Body() dto: CreateVehicleDto, @Request() req) {
    return this.vehiclesService.create({ ...dto, userId: req.user.userId });
  }

  @Get()
  @ApiOperation({ summary: 'Get all vehicles for the current user' })
  findAll(@Request() req) {
    return this.vehiclesService.findAllForUser(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single vehicle by ID' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.vehiclesService.findOne(id, req.user.userId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a vehicle' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateVehicleDto,
    @Request() req,
  ) {
    return this.vehiclesService.update(id, req.user.userId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a vehicle' })
  remove(@Param('id') id: string, @Request() req) {
    return this.vehiclesService.remove(id, req.user.userId);
  }
}
