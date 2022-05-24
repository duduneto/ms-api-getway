import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductInputDTO } from './dtos/product/create-product.dto';

@Controller('v1')
export class AppController {
  private clientAdminBackend: ClientProxy;

  constructor() {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: { urls: ['amqp://localhost:5672'], queue: 'admin-backend' },
    });
  }

  @Get('version')
  getHello(): string {
    return 'Api Version 1.0.0';
  }

  @Post('product')
  async createProduct(@Body() createProductDto: CreateProductInputDTO) {
    return await this.clientAdminBackend.emit(
      'create-product',
      createProductDto,
    );
  }
}
