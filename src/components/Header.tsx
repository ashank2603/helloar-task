import { ThemeToggle } from "./ThemeToggle"

const Header = () => {
  return (
    <div className="flex flex-row justify-between py-5 px-10">
        <div>
            <h1 className="text-3xl font-bold dark:text-white">Weather Station.</h1>
        </div>
        <div>
            <ThemeToggle />
        </div>
    </div>
  )
}

export default Header