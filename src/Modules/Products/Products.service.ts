import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dtos/CreateProduct.dto';
import { UpdateProductDTO } from './dtos/UpdateProduct.dto';
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

  getProductById(id: number) {
    return this.findProduct(id);
  }

  deleteProduct(id: string) {
    return this.productRepository.delete(id);
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDTO) {
    const product = await this.findProduct(id);
    const updatedProduct = { ...product, ...updateProductDto };

    return this.productRepository.save(updatedProduct);
  }

  private async findProduct(id: number) {
    const product = await this.productRepository.findOne(id);

    if (!product) {
      throw new NotFoundException(`Could not find a product with id ${id}`);
    }

    return product;
  }
}
