import { Controller, Get, Logger, Query, UseGuards } from '@nestjs/common';
import { AppAccessGuard } from 'src/guards/app-access.guard';
import { SearchService } from './search.service';
import { AccessTokenGuard } from 'src/guards/accesstoken.guard';

@Controller('search')
@UseGuards(AppAccessGuard)
export class SearchController {

  private logger = new Logger(SearchController.name)

  constructor(private searchService: SearchService) { }

  @Get()
  search(@Query('query') query: string) {
    if (!query || query === "") return []
    this.logger.debug(`Search Query: ${query}`);
    return this.searchService.query(query);
  }
}
