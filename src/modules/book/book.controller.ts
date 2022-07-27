import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookDTO } from './book.dto';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post() // Vai criar o livro no banco, através do insomnia
  async create(@Body() data: BookDTO) {
    return this.bookService.create(data);
  }

  @Get() // Vai listar todos os livros no banco, através do insomnia
  async findAll() {
    return this.bookService.findAll();
  }

  @Put(':id') // Vai atualizar o livro no banco pelo id, através do insomnia
  async update(@Param('id') id: string, @Body() data: BookDTO) {
    return this.bookService.update(id, data);
  }

  @Delete(':id') // Vai deletar o livro no banco pelo id, atráves do insomnia
  async delete(@Param('id') id: string) {
    return this.bookService.delete(id);
  }
}
