import { useEffect, useState } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import animalModel, { Animal } from "@/db/models/animal.model";

type Props = {
  params: { type: "home" | "favorites" };
};

const Page = ({ params }: Props): JSX.Element => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session: any = await getServerSession();
        if (session.user.role === "admin") {
          redirect("/admin/home");
          return;
        }

        // Fetch data from animalModel
        const animalData: Animal[] = await animalModel.getAll();

        // Set fetched data to state
        setAnimals(animalData);
      } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const nextAnimal = () => {
    setCurrentIndex((prevIndex) => (prevIndex === animals.length - 1 ? 0 : prevIndex + 1));
  };

  const previousAnimal = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? animals.length - 1 : prevIndex - 1));
  };

  return (
    <div>
      <Navbar menuLinks={[{ link: "/api/auth/signout?callbackUrl=/", label: "Logout" }]}>
        {/* {children} */}
      </Navbar>
      <div style={{ display: "flex", height: "100vh" }}>
        {/* Sidebar */}
        <div
          style={{
            width: "20%",
            backgroundColor: "#f0f0f0",
            padding: "20px",
          }}
        >
          <h2>Animal List</h2>
          {/* Display fetched animals */}
          {animals.length > 0 && (
            <>
              <button onClick={previousAnimal}>Previous</button>
              <div>
                <Image
                  src={animals[currentIndex].photo}
                  alt={`Image of ${animals[currentIndex].name}`}
                  width={300}
                  height={200}
                />
                <p>{animals[currentIndex].name}</p>
                {/* Render other properties as needed */}
              </div>
              <button onClick={nextAnimal}>Next</button>
            </>
          )}
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

            <button
              type="submit"
              className="btn btn-primary btn-block"
              style={{ width: "150px", color: "white" }}
            >
              DONATE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
