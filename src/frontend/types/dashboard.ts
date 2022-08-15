class IPost {
  user: number;

  type: string;

  content: string;

  constructor(user: number, type: string, content: string) {
    this.user = user;
    this.type = type;
    this.content = content;
  }
}

export default IPost;
