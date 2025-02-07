import { trpc } from "@/trpc/server";

export default async function Home() {
  const data = await trpc.hello({
    text: "Hello",
  });

  return (
    <div>
      I will load videos in future
      {data?.greeting}
    </div>
  );
}
