import { Controller, Get, Post, Body, Param, Delete, Put, HttpException, HttpStatus } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto).catch((err) => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }).then(res => {
      return res;
    });
  }

  @Get()
  async findAll() {
    let response = await this.postService.findAll();

    if (response.length == 0) {
      throw new HttpException("Nenhum registro encontrado", HttpStatus.NOT_FOUND);
    }

    return response;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postService.findOne(+id).catch(err => {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }).then(res => {
      return res;
    });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto).catch(err => {
      if (err.code == "P2025")
        throw new HttpException(err.meta.cause, HttpStatus.NOT_FOUND);
      else {
        throw new HttpException("", HttpStatus.BAD_REQUEST);
      }

    }).then(res => {
      return res;
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.postService.remove(+id).catch(err => {
      if (err.code == "P2025")
        throw new HttpException(err.meta.cause, HttpStatus.NOT_FOUND);
      else {
        throw new HttpException("", HttpStatus.BAD_REQUEST);
      }

    }).then(res => {
      return res;
    });
  }
}
