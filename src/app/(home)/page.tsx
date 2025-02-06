import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Image src={"/logo1.jpeg"} height={50} width={50} alt="logo" />
      <p className="text-xl font-semibold tracking-tight">Streamly</p>
    </div>
  );
}
