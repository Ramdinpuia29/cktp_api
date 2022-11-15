import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Query } from '@nestjs/common/decorators/http/route-params.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Routes } from 'src/utils/types/routes.type';
import { Services } from 'src/utils/types/services.type';
import { CreateEventDto, FilterEventsOptions } from './dtos/event.dto';
import { EventsService } from './events.service';

@ApiTags('Events')
@Controller(Routes.EVENTS)
@UseInterceptors(ClassSerializerInterceptor)
export class EventsController {
  constructor(
    @Inject(Services.EVENTS)
    private readonly eventsService: EventsService,
  ) {}

  @Get('')
  getAllEvents(@Query() options: FilterEventsOptions) {
    return this.eventsService.getAllEvents(options);
  }

  @Post('/add')
  addNewEvent(@Body() eventData: CreateEventDto) {
    return this.eventsService.addEvent(eventData);
  }
}
