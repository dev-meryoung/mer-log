interface PostPageProps {
  params: { slug: string };
}

const PostPage: React.FC<PostPageProps> = ({ params }: PostPageProps) => (
  <div>THIS IS POST PAGE ! → {params.slug}</div>
);

export default PostPage;
