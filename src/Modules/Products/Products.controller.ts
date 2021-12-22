import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';

import { CreateProductDTO, UpdateProductDTO } from './dtos';
import { ProductsService } from './Products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  insertProduct(@Body() body: CreateProductDTO) {
    const product = this.productsService.insertProduct(body);

    return product;
  }

  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id', ParseIntPipe) productId: number) {
    return this.productsService.getProductById(productId);
  }

  @Patch(':id')
  updateProduct(
    @Body() body: UpdateProductDTO,
    @Param('id', ParseIntPipe) productId: number,
  ) {
    return this.productsService.updateProduct(productId, body);
  }

  @Delete(':id')
  deleteProduct(@Param('id') productId: string) {
    return this.productsService.deleteProduct(productId);
  }
}
