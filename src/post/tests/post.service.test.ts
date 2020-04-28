/* eslint-disable @typescript-eslint/no-explicit-any */
import * as typeorm from 'typeorm';
import PostNotFoundException from '../../exceptions/PostNotFoundException';
import { PostDummy } from '../../utils/dummies';
import PostService from '../post.service';

(typeorm as any).getRepository = jest.fn().mockReturnValue({
  find: jest.fn().mockResolvedValue([PostDummy]),
  findOne: jest.fn().mockResolvedValue(PostDummy),
});

describe('The PostService', () => {
  const postService = new PostService();

  describe('getAllPosts', () => {
    it('should return an array of posts', async () => {
      const posts = await postService.getAllPosts();
      expect(posts).toEqual([PostDummy]);
    });
  });

  describe('getPostById', () => {
    it('should return a post', async () => {
      (typeorm as any).getRepository = jest.fn().mockReturnValue({
        findOne: jest.fn().mockResolvedValue(PostDummy),
      });
      const post = await postService.getPostById(PostDummy.id);
      expect(post).toEqual(PostDummy);
    });

    it('should throw PostNotFoundException', async () => {
      (typeorm as any).getRepository = jest.fn().mockReturnValue({
        findOne: jest.fn().mockResolvedValue(undefined),
      });
      await expect(new PostService().getPostById(2)).rejects.toEqual(
        new PostNotFoundException(2),
      );
    });
  });
});
