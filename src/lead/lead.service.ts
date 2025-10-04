// src/lead/lead.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './entities/lead.entity';
import { CreateLeadDto } from './dto/create-lead.dto';

@Injectable()
export class LeadService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepo: Repository<Lead>,
  ) {}

  async create(dto: CreateLeadDto) {
    const exists = await this.leadRepo.findOne({ where: { email: dto.email } });
    if (exists) {
      throw new ConflictException('Este correo ya está registrado');
    }

    const lead = this.leadRepo.create(dto);
    return this.leadRepo.save(lead);
  }

  async findAll() {
    return this.leadRepo.find({ order: { createdAt: 'DESC' } });
  }
}
