import {Home, Repeat, Library, Clapperboard, Divide, ChevronUp, ChevronDown} from 'lucide-react'
import {Children, ElementType, ReactNode, useState} from 'react'
import {buttonStyles} from '../components/Button'
import {twMerge} from 'tailwind-merge'
import {Button} from '../components/Button'

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
        <LargeSidebarSection>
          <LargeSidebarItem isActive Icon={Home} title="Home" url="/"></LargeSidebarItem>
          <LargeSidebarItem Icon={Clapperboard} title="Subscriptions" url="/subscriptions"></LargeSidebarItem>
        </LargeSidebarSection>
      </aside>
    </>
  )
}

type SmallSideBarItemProps = {
  Icon: ElementType
  title: string
  url: string
}

type LargeSideBarItemProps = {
  Icon: ElementType
  title: string
  url: string
  isActive?: boolean
}

type LargeSidebarSectionProps = {
  children: ReactNode
  title?: string
  visibleItemCount?: number
}

function SmallSideBarItem({Icon, title, url}: SmallSideBarItemProps) {
  return (
    <a href={url} className={twMerge(buttonStyles({variant: 'ghost'}), 'py-4 px-1 flex flex-col items-center rounded-lg gap-1')}>
      <Icon className="w-6 h-6"></Icon>
      <div className="text-sm">{title}</div>
    </a>
  )
}

function LargeSidebarSection({children, title, visibleItemCount = Number.POSITIVE_INFINITY}: LargeSidebarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const childrenArray = Children.toArray(children).flat()
  const showExpandButton = childrenArray.length > visibleItemCount
  const visibleChildren = isExpanded ? childrenArray : childrenArray.slice(0, visibleItemCount)
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown
  return (
    <div>
      {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
      {visibleChildren}
      {showExpandButton && (
        <Button variant="ghost" onClick={() => setIsExpanded(e => !e)} className="w-full flex items-center rounded-lg gap-4 p-3">
          <ButtonIcon className="w-6 h-6" />
          <div>{isExpanded ? 'Show Less' : 'Show More'}</div>
        </Button>
      )}
    </div>
  )
}

function LargeSidebarItem({Icon, title, url, isActive = false}: LargeSideBarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(buttonStyles({variant: 'ghost'}), `w-full flex items-center rounded-lg gap-4 p-3 ${isActive ? 'font-bold bg-neutral-100 hover:bg-secondary' : undefined}`)}
    >
      <Icon className="w-6 h-6"></Icon>
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">{title}</div>
    </a>
  )
}
