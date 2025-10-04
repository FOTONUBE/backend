// src/lead/lead.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { LeadService } from './lead.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Controller('leads')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post()
  async create(@Body() dto: CreateLeadDto) {
    return this.leadService.create(dto);
  }

  @Get()
  async findAll() {
    return this.leadService.findAll();
  }
}
