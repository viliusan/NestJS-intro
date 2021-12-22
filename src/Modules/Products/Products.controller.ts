import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateProductDTO } from './dtos/CreateProduct.dto';
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
  getProductById(@Param('id') productId: string) {
    return this.productsService.getProductById(productId);
  }
}
