import { Test, TestingModule } from '@nestjs/testing';
import { MenuItemsService } from './menu-items.service';

describe('MenuService', () => {
  let service: MenuItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuItemsService],
    }).compile();

    service = module.get<MenuItemsService>(MenuItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
