import GlobeCard from "./GlobeCard"
import SideCard from "./SideCard"

const MainCard = () => {
  return (
    <div className="flex flex-row gap-5 justify-between py-5 px-14">
        <SideCard />
        <GlobeCard />
    </div>
  )
}

export default MainCard