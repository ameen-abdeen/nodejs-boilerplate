/* eslint-disable @typescript-eslint/no-explicit-any */
import * as typeorm from 'typeorm';
import supertest from 'supertest';
import { HTTP_REPONSE_CODES } from '../../utils/constants';
import { PostDummy } from '../../utils/dummies';
import App from '../../app';
import PostController from '../post.controller';

(typeorm as any).getRepository = jest.fn().mockReturnValue({
  find: jest.fn().mockResolvedValue([PostDummy]),
  findOne: jest.fn().mockResolvedValue(PostDummy),
});
const postController = new PostController();
const app = new App([postController]);
const request = supertest(app.getServer());

describe('The PostController', () => {
  describe('GET /post', () => {
    // eslint-disable-next-line jest/expect-expect
    it('[INTEGRATION] should return an array of posts', async () => {
      await request.get(`${postController.path}`).expect(HTTP_REPONSE_CODES.OK);
    });

    it('should return an array of posts', async () => {
      jest
        .spyOn(postController.postService, 'getAllPosts')
        .mockResolvedValue([PostDummy]);

      await request.get(`${postController.path}`).expect(HTTP_REPONSE_CODES.OK);
      expect(postController.postService.getAllPosts).toBeCalled();
    });
  });
});
