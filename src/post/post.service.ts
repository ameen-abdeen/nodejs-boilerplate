import { getRepository } from 'typeorm';
import logger from '../utils/logger';
import PostNotFoundException from '../exceptions/PostNotFoundException';
import Post from './post.entity';
import CreatePostDto from './post.dto';
import { asyncForEach } from '../utils/helper';

class PostService {
  private postRepository = getRepository(Post);

  public getAllPosts = async (): Promise<Post[]> => {
    const posts = await this.postRepository.find();

    // Foreach manipulation demostration
    await asyncForEach(posts, async (post: Post) => {
      // Do not put info logs inside loops.
      // If required add debug logs
      logger.debug(post.id.toString());
    });
    logger.info('Posts manipulation complete');

    return posts;
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
    if (deleteResponse.affected > 0) {
      return true;
    }
    throw new PostNotFoundException(id);
  };
}

export default PostService;
