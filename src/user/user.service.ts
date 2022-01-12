import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities';
import { CreateUserDto, EditUserDto } from './dtos';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }

  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.find()
  }

  async getOne(id: number) {
    const user = await this.userRepository.findOne(id)
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }
  async createOne(dto: CreateUserDto): Promise<UserEntity> {

    const userExist = await this.userRepository.findOne({ email: dto.email });
    if (userExist) throw new BadRequestException('Este email ya se encuentra registrado')

    const newUser = this.userRepository.create(dto);
    const user = await this.userRepository.save(newUser);

    delete user.password;
    return user;

  }

  async editOne(id: number, dto: EditUserDto): Promise<UserEntity> {
    const user = await this.getOne(id)

    const userEdited = Object.assign(user, dto);
    return await this.userRepository.save(userEdited)
  }
  async deleteOne(id: number) {
    const user = await this.getOne(id);
    return await this.userRepository.remove(user)
  }

}
