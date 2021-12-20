import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dtos/CreateProduct.dto';
import { Product } from './Product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  insertProduct(productDetails: CreateProductDTO) {
    const product = this.productRepository.create(productDetails);

    return this.productRepository.save(product);
  }

  getAllProducts() {
    return this.productRepository.find();
  }

  getProductById(id: string) {
    return this.productRepository.findOne(id);
  }
}
