class IPost {
  user: number;

  type: string;

  content: string;

  likes: number;

  comments: Array<string>;

  constructor(user: number, type: string, content: string, likes: number, comments: Array<string>) {
    this.user = user;
    this.type = type;
    this.content = content;
    this.likes = likes;
    this.comments = comments;
  }
}

export default IPost;
