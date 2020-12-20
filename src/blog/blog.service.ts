import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel('Post') 
    private readonly postModel: Model<Post>
  ) {}
  
  async addPost(createPostDto: CreatePostDto): Promise<Post> {
    const newPost = await this.postModel(createPostDto);
    return newPost.save();
  }

  async getPost(postID): Promise<Post> {
    const post = await (await this.postModel.findById(postID)).exec();
    return post;
  }

  async getPosts(): Promise<Post []> {
    const posts = await this.postModel.find().exec();
    return posts;
  }

  async editPost(postID, createPostDto: CreatePostDto): Promise<Post> {
    const editedPost = await this.postModel.findByIdAndUpdate(postID, createPostDto, { new: true });
    return editedPost;
  }

  async deletePost(postId): Promise<any> {
    const deletedPost = await this.postModel.findByIdAndRemove(postID);
    return deletedPost;
  }
}
