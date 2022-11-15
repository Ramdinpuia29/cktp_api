import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto, FilterEventsOptions } from './dtos/event.dto';
import { Event } from './entities/event.entity';
import { parseISO, format, getYear } from 'date-fns';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
  ) {}

  getAllEvents = async (options?: FilterEventsOptions) => {
    const { month, year } = options;
    try {
      const events = await this.eventsRepository.find();

      let filtered = [...events];

      if (month || year) {
        if (month && year) {
          filtered = filtered
            .filter((event) => this.getMonth(event.dateFrom) === month)
            .filter((event) => this.getYear(event.dateFrom) === Number(year));
        }

        if (month && !year) {
          filtered = filtered.filter(
            (event) =>
              this.getMonth(event.dateFrom) === month &&
              this.getYear(event.dateFrom) === getYear(Date.now()),
          );
        }

        if (year && !month) {
          filtered = filtered.filter(
            (event) => this.getYear(event.dateFrom) === Number(year),
          );
        }

        return filtered;
      }

      return events.filter(
        (event) => this.getYear(event.dateFrom) === getYear(Date.now()),
      );
    } catch (error) {
      throw error;
    }
  };

  addEvent = async (eventData: CreateEventDto) => {
    const eventObj = this.eventsRepository.create(eventData);
    try {
      const event = await this.eventsRepository.save(eventObj);
      return event;
    } catch (error) {
      throw error;
    }
  };

  getMonth(date: string): string {
    return format(parseISO(date), 'MMMM');
  }

  getYear(date: string): number {
    return Number(format(parseISO(date), 'Y'));
  }
}
