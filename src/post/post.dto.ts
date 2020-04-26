import { IsString, IsOptional } from 'class-validator';

class CreatePostDto {
  @IsString()
  public author: string;

  @IsString()
  public content: string;

  @IsString()
  public title: string;

  @IsOptional()
  @IsString()
  public tag: string;
}

export default CreatePostDto;
