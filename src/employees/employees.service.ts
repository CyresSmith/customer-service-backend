import { Injectable } from '@nestjs/common';
import { EmployeesRepository } from 'src/common/repositories';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeProfileDto } from './dto/update-employee-profile.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(private readonly employeesRepository: EmployeesRepository) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    return 'This action adds a new employee';
  }

  findAll() {
    return `This action returns all employees`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  async updateProfile(id: number, data: UpdateEmployeeProfileDto) {
    return await this.employeesRepository.update(id, data);
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
