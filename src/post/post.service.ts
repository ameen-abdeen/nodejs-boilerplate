import { getRepository } from 'typeorm';
import PostNotFoundException from '../exceptions/PostNotFoundException';
import Post from './post.entity';
import CreatePostDto from './post.dto';

class PostService {
  private postRepository = getRepository(Post);

  public getAllPosts = async (): Promise<Post[]> => {
    return this.postRepository.find();
  };

  public getPostById = async (id: number): Promise<Post> => {
    const post = await this.postRepository.findOne(id);
    if (post) {
      return post;
    }
    throw new PostNotFoundException(id);
  };

  public modifyPost = async (id: number, postData: Post): Promise<Post> => {
    await this.postRepository.update(id, postData);
    const updatedPost = await this.postRepository.findOne(id);
    if (updatedPost) {
      return updatedPost;
    }
    throw new PostNotFoundException(id);
  };

  public createPost = async (postData: CreatePostDto): Promise<Post> => {
    const newPost = this.postRepository.create(postData);
    await this.postRepository.save(newPost);
    return newPost;
  };

  public deletePost = async (id: number): Promise<boolean> => {
    const deleteResponse = await this.postRepository.delete(id);
    if (deleteResponse.raw[1]) {
      return true;
    }
    throw new PostNotFoundException(id);
  };
}

export default PostService;
