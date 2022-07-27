import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { BookDTO } from './book.dto';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async create(data: BookDTO) {
    // Método de create para inserir um livro no banco
    const bookExists = await this.prisma.book.findFirst({
      where: {
        bar_code: data.bar_code,
      },
    });

    if (bookExists) {
      // Se o livro existir no banco (compara pelo "bar_code"), vai retornar o erro abaixo
      throw new Error('Book already exists');
    }

    const book = await this.prisma.book.create({
      data,
    });

    return book;
  }

  async findAll() {
    // Método de consulta para listar todos os livros do banco
    return this.prisma.book.findMany();
  }

  async update(id: string, data: BookDTO) {
    // Método de update para alterar um livro pelo id no banco
    const bookExists = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!bookExists) {
      // Se o livro não existir no banco, vai retornar o erro abaixo
      throw new Error('Book does not exists!');
    }

    return await this.prisma.book.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    // Método de delete para apagar um livro pelo id no banco
    const bookExists = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!bookExists) {
      // Se o livro não existir no banco, vai retornar o erro abaixo
      throw new Error('Book does not exists!');
    }

    return await this.prisma.book.delete({
      where: {
        id,
      },
    });
  }
}
