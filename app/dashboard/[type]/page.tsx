import Image from "next/image";

type Props = {
  params: { type: "home" | "favorites" };
};

async function Page({ params }: Props) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "20%",
          backgroundColor: "#f0f0f0",
          padding: "20px",
        }}
      >
        Like List
      </div>

      <div style={{ width: "80%", padding: "20px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            {" "}
            <Image src="/dog1.jpeg" alt="Dashboard Image" width={300} height={200} />
            {/* <Image src="/dog2.jpeg" alt="Dashboard Image" width={300} height={200} />
            <Image src="/dog3.jpeg" alt="Dashboard Image" width={300} height={200} /> */}
          </div>
          <button type="submit" className="btn  btn-block" style={{ width: "150px" }}>
            DONATE
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
