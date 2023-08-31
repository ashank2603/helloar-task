import Header from "./components/Header"
import Loader from "./components/Loader"
import { useState, useEffect } from "react"
import MainCard from "./components/MainCard";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
        setIsLoading(false);
    }, 1000 * 5);
  })

  return (
    <div className="dark:bg-black h-screen">
      {
        !isLoading && (
          <Header />
        )
      }
      {
        isLoading ? (
          <div className="flex flex-row justify-center py-64">
            <Loader />
          </div>
        ) : (
          <div>
            <MainCard />
          </div>
        )
      }
    </div>
  )
}

export default App