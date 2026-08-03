import PostFeed from "@/components/posts/PostFeed"
import PageHeader from "@/components/layout/PageHeader"
import Form from "@/components/Form"

export default function Home() {
  return (
    <>
      <PageHeader label="Home" description="Fresh thoughts from the community" />
      <Form placeholder="What's happening?" />
      <PostFeed />
     
    </>
  )
}
