import {Home, Repeat, Library, Clapperboard} from 'lucide-react'
import {ElementType} from 'react'
import {buttonStyles} from '../components/Button'
import {twMerge} from 'tailwind-merge'

export function Sidebar() {
  return (
    <>
      <aside className="sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 lg:hidden">
        <SmallSideBarItem Icon={Home} title="Home" url="/"></SmallSideBarItem>
        <SmallSideBarItem Icon={Repeat} title="Shorts" url="/shorts"></SmallSideBarItem>
        <SmallSideBarItem Icon={Clapperboard} title="Subscriptions" url="/subscriptions"></SmallSideBarItem>
        <SmallSideBarItem Icon={Library} title="Library" url="/library"></SmallSideBarItem>
      </aside>
			<aside className="w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 flex">
				
			</aside>
    </>
  )
}

type SmallSideBarItemProps = {
  Icon: ElementType
  title: string
  url: string
}

function SmallSideBarItem({Icon, title, url}: SmallSideBarItemProps) {
  return (
    <a href={url} className={twMerge(buttonStyles({variant: 'ghost'}), 'py-4 px-1 flex flex-col items-center rounded-lg gap-1')}>
      <Icon className="w-6 h-6"></Icon>
      <div className="text-sm">{title}</div>
    </a>
  )
}
