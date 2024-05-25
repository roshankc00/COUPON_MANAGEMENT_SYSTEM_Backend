import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AffiliateLinkService } from './affiliate-link.service';
import { CreateAffiliateLinkDto } from './dto/create-affiliate-link.dto';
import { UpdateAffiliateLinkDto } from './dto/update-affiliate-link.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtRoleAuthGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { USER_ROLE_ENUM } from 'src/common/enums/user.role.enum';

@ApiTags('affiliate-link')
@Controller('affiliate-link')
export class AffiliateLinkController {
  constructor(private readonly affiliateLinkService: AffiliateLinkService) {}

  @ApiOperation({
    summary: 'get  the all affilated Link',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return  all the   affilated link',
  })
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  @Get()
  findAll() {
    return this.affiliateLinkService.findAll();
  }

  @ApiOperation({
    summary: 'Get the single affilated Link',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return the  affilated Links',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.affiliateLinkService.findOne(+id);
  }

  @ApiOperation({
    summary: 'update  the affilated link',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return the  affilated link',
  })
  @Patch(':id')
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateAffiliateLinkDto: UpdateAffiliateLinkDto,
  ) {
    return this.affiliateLinkService.update(+id, updateAffiliateLinkDto);
  }

  @ApiOperation({
    summary: 'increase the click on  affilated link',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return the  affilated link',
  })
  @Patch('increase/count/:id')
  updateCount(
    @Param('id') id: string,
    @Body() updateAffiliateLinkDto: UpdateAffiliateLinkDto,
  ) {
    return this.affiliateLinkService.updateClick(+id);
  }

  @ApiOperation({
    summary: 'delete the affilated link',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return the  affilated link',
  })
  @Roles(USER_ROLE_ENUM.ADMIN)
  @UseGuards(JwtRoleAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.affiliateLinkService.remove(+id);
  }
}
