import {Menu, Upload, Bell, User, Mic, Search, ArrowLeft} from 'lucide-react'
import logo from '../assets/logo.png'
import {Button} from '../components/Button'
import {useState} from 'react'
import {useSidebarContext} from '../context/SidebarContext'
export function PageHeader() {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false)

  return (
    <>
      <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
        <PageHeaderFirstSection hidden={showFullWidthSearch} />
        <form className={`gap-4 flex-grow justify-center ${showFullWidthSearch ? 'flex' : 'hidden md:flex '}`}>
          {showFullWidthSearch && (
            <Button
              size="icon"
              type="button"
              variant="ghost"
              className="flex-shrink-0"
              onClick={() => {
                setShowFullWidthSearch(false)
              }}
            >
              <ArrowLeft />
            </Button>
          )}
          <div className="flex flex-grow max-w-[600px]">
            <input
              type="input"
              placeholder="Search"
              className="rounded-l-full border bordor-secondary-border 
						shadow-inner shadow-secondary py-1 px-4 text-lg w-full 
						focus:border-blue-500 outline-none"
            ></input>
            <Button className="py-2 px-4 rounded-r-full border-secondary-border border-l-0 flex-shrink-0">
              <Search />
            </Button>
          </div>
          <Button size="icon" type="button" className="flex-shrink-0">
            <Mic />
          </Button>
        </form>
        <div className={`flex-shrink-0 md:gap-2 ${showFullWidthSearch ? 'hidden' : 'flex'}`}>
          <Button size="icon" variant="ghost" className="md:hidden" onClick={() => setShowFullWidthSearch(true)}>
            <Search />
          </Button>
          <Button size="icon" variant="ghost" className="md:hidden">
            <Mic />
          </Button>
          <Button size="icon" variant="ghost">
            <Upload />
          </Button>
          <Button size="icon" variant="ghost">
            <Bell />
          </Button>
          <Button size="icon" variant="ghost">
            <User />
          </Button>
        </div>
      </div>
    </>
  )
}

type PageHeaderFirstSectionProps = {
  hidden?: boolean
}

export function PageHeaderFirstSection({hidden = false}: PageHeaderFirstSectionProps) {
  const {toggle} = useSidebarContext()
  return (
    <div className={`gap-4 items-center flex-shrink-0 ${hidden ? 'hidden' : 'flex'}`}>
      <Button onClick={toggle} variant="ghost" size="icon">
        <Menu />
      </Button>
      <a href="">
        <img src={logo} alt="" className="h-6" />
      </a>
    </div>
  )
}
