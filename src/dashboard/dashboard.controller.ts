import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Dashboard')
@ApiBearerAuth()
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get dashboard metrics for the current user' })
  async getDashboard(@Req() req: any) {
    return this.dashboardService.getDashboardData(req.user.userId);
  }
}
